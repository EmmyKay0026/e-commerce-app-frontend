"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImageToCloudflare } from "@/lib/cloudflareImageUpload";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { constructImageUrl } from "@/lib/utils";

interface ImageUploadProps {
  onUploadComplete: (fileKey: string) => void;
  entityId?: string;
  currentImage: string | null | undefined;
  entityType: "user" | "business";
  children?: React.ReactNode;
}

export function ImageUpload({
  onUploadComplete,

  currentImage,
  entityType,
  children,
}: ImageUploadProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const fileKey = await uploadImageToCloudflare(file);
      onUploadComplete(fileKey);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" size="icon" className="rounded-full">
            <EditIcon className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update {entityType === "user" ? "Profile" : "Business"} Photo
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image-upload">Select Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {preview && (
            <div className="flex justify-center">
              <Image
                src={constructImageUrl(preview)}
                alt="Image preview"
                width={200}
                height={200}
                className="rounded-full object-cover w-40 h-40"
              />
            </div>
          )}
          {currentImage && !preview && (
            <div className="flex justify-center">
              <Image
                src={constructImageUrl(currentImage)}
                alt="Current image"
                width={200}
                height={200}
                className="rounded-full object-cover w-40 h-40"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
