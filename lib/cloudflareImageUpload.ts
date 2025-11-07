import api from "@/config/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
interface PreSignedUrlResponse {
  urls: Array<{
    presignedUrl: string;
    fileKey: string;
    originalFileName: string;
  }>;
}

/**
 * Uploads an array of files to Cloudflare R2 by first fetching pre-signed URLs.
 * @param files - An array of File objects to upload.
 * @returns A promise that resolves to an array of file keys for the uploaded images.
 * @throws An error if the upload process fails at any step.
 */
export async function uploadImagesToCloudflare(files: File[]): Promise<any> {
  if (!files || files.length === 0) {
    return [];
  }

  try {
    // Prepare file details for the backend request
    const fileDetails = Array.from(files).map((f) => ({
      fileName: f.name,
      contentType: f.type,
    }));

    // --- Step 1: Request Multiple Pre-Signed URLs from the backend ---
    const urlResponse = await api.post(`/uploads/r2-upload-urls`, {
      files: fileDetails,
    });

    if (!urlResponse.status || urlResponse.status !== 200) {
      const errorData = urlResponse;
      throw new Error(`Backend Error: ${errorData || "Failed to get URLs."}`);
    }

    const { urls }: PreSignedUrlResponse = await urlResponse.data;
    console.log(urls);

    // --- Step 2: Parallel Direct Upload to R2 ---
    const uploadPromises = Array.from(files).map((file) => {
      const link = urls.find((u) => u.originalFileName === file.name);
      if (!link) {
        return Promise.reject(new Error(`Link not found for ${file.name}`));
      }

      return fetch(link.presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject(
            new Error(
              `Upload failed for ${file.name} (Status: ${response.status})`
            )
          );
        }
        return { success: true, fileKey: link.fileKey };
      });
    });

    // Wait for all uploads to resolve
    const results = await Promise.allSettled(uploadPromises);

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const errorMessage = failed.map((f: any) => f.reason.message).join(", ");
      throw new Error(`Image upload failed for: ${errorMessage}`);
    }

    const imageKeys = results
      .filter(
        (
          r
        ): r is PromiseFulfilledResult<{ success: boolean; fileKey: string }> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value.fileKey);

    return imageKeys;
  } catch (error: any) {
    console.error("Image upload process failed:", error);
    // Re-throw to be caught by the caller
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

/**
 * Uploads a single file to Cloudflare R2 by wrapping the multi-upload function.
 * @param file - The File object to upload.
 * @returns A promise that resolves to the file key of the uploaded image.
 * @throws An error if the upload process fails.
 */
export async function uploadImageToCloudflare(file: File): Promise<string> {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  try {
    const imageKeys = await uploadImagesToCloudflare([file]);
    if (imageKeys && imageKeys.length > 0) {
      return imageKeys[0];
    }
    throw new Error("Image upload failed to return a file key.");
  } catch (error: any) {
    console.error("Single image upload failed:", error);
    throw new Error(`Single image upload failed: ${error.message}`);
  }
}
