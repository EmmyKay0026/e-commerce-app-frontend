import api from "@/config/api";
import { supabase } from "@/config/supabase";
import { BusinessProfile, Product, ServiceResult, User } from "@/types/models";
import { redirect } from "next/navigation";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts.length ? parts[0] : "";
  const last_name = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return { first_name, last_name };
}

/**
 * Pattern the repo asked for — keep for compatibility with older code.
 * Placeholder: this endpoint was shown in your prompt but is not in the main doc.
 */

/**
 * GET /users/me — authenticated
 */
export async function getMyProfile(): Promise<ServiceResult<User>> {
  try {
    const res = await api.get("/users/me");
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data.data as User };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error:
        (res.data && (res.data.error || res.data.message)) ||
        `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    const status = err?.response?.status;
    return { success: false, status, data: null, error: msg };
  }
}

/**
 * GET /users/:id — public profile (authenticated optional)
 * returns vendor/public friendly shape — using User type as placeholder
 */
export async function getPublicProfile(
  id: string
): Promise<ServiceResult<User>> {
  try {
    const res = await api.get(`/users/${encodeURIComponent(id)}`);

    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as User,
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    const status = err?.response?.status;
    return { success: false, status, data: null, error: msg };
  }
}

/**
 * PATCH /users/me — update profile (authenticated)
 * payload example: { first_name, last_name, phone_number }
 */
export async function updateProfile(
  payload: Partial<
    Pick<
      User,
      | "first_name"
      | "last_name"
      | "profile_picture"
      | "phone_number"
      | "whatsapp_number"
      | "email"
    >
  >
): Promise<ServiceResult<User>> {
  try {
    const res = await api.patch("/users/me", payload);
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data.data as User };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.error || `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const msg =
      // backend might return { success:false, error: '...' }
      err?.response?.data?.error ||
      (Array.isArray(err?.response?.data?.errors)
        ? err.response.data.errors.join(", ")
        : null) ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    return { success: false, status, data: null, error: msg };
  }
}
export async function updateSavedItems(
  product_id: string
): Promise<ServiceResult<User>> {
  try {
    const res = await api.patch("/users/me/saved", { productId: product_id });
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data.data as User };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.error || `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const msg =
      // backend might return { success:false, error: '...' }
      err?.response?.data?.error ||
      (Array.isArray(err?.response?.data?.errors)
        ? err.response.data.errors.join(", ")
        : null) ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    return { success: false, status, data: null, error: msg };
  }
}

/**
 * DELETE /users/me — deactivate profile (authenticated)
 */
export async function deactivateProfile(): Promise<
  ServiceResult<{ message: string }>
> {
  try {
    const res = await api.delete("/users/me");
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data };
    }
    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.error || `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    return { success: false, status, data: null, error: msg };
  }
}

// type Product = { id: string; [key: string]: any };

export async function fetchProductsByIds(
  ids: string[]
): Promise<ServiceResult<Product[]>> {
  if (!Array.isArray(ids) || ids.length === 0) {
    return { success: true, status: 200, data: [] };
  }

  try {
    const { data, error, status } = await supabase
      .from("products")
      .select("*")
      .in("id", ids);

    if (error) {
      return {
        success: false,
        status: status ?? 500,
        data: null,
        error: error.message,
      };
    }

    return {
      success: true,
      status: status ?? 200,
      data: data ?? [],
    };
  } catch (err: any) {
    return {
      success: false,
      status: 500,
      data: null,
      error: err?.message || "Unexpected error fetching products from Supabase",
    };
  }
}

// export default api;
