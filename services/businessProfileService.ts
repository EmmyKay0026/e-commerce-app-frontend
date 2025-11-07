import api from "@/config/api";
import { ServiceResult, User, BusinessProfile } from "@/types/models";

// Placeholder BusinessProfile type — replace with your concrete type when available
// export type BusinessProfile = any;

/**
 * Create Business Profile
 * POST /businessProfile
 */
export async function createBusinessProfile(
  payload: Partial<BusinessProfile>
): Promise<ServiceResult<BusinessProfile>> {
  try {
    const res = await api.post("/businessProfile", payload);
    if (res.status === 201) {
      return {
        success: true,
        status: res.status,
        data: res.data.businessProfile as BusinessProfile,
      };
    }
    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
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

/**
 * Get Business Profile by ID
 * GET /vendors/:id
 */
export async function getBusinessProfileById(
  id: string
): Promise<ServiceResult<{ data: BusinessProfile }>> {
  try {
    const res = await api.get(`/vendors/${encodeURIComponent(id)}`);
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data };
    }
    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
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

/**
 * Get Business Profile by slug
 * Note: your backend docs show GET /vendors/:slug — if your API uses the same route as ID
 * (i.e., /vendors/:idOrSlug) then call `getBusinessProfileById` instead.
 * If your backend exposes a dedicated slug route change the path below.
 */
export async function getBusinessProfileBySlug(
  slug: string
): Promise<ServiceResult<{ data: BusinessProfile & { user: User } }>> {
  console.log("Got here");

  try {
    // If your backend expects /vendors/:slug (same pattern as id) you can call /vendors/${slug}
    // If it expects /vendors/slug/:slug or /vendors/by-slug/:slug, update this path.
    const res = await api.get(`/businessProfile/${slug}`);
    console.log("Service Res:", res);

    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data.data };
    }
    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
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

/**
 * Update Business Profile (owner only)
 * PATCH /vendors/:id
 */
export async function updateBusinessProfile(
  payload: Partial<
    Pick<
      BusinessProfile,
      | "business_email"
      | "business_phone"
      | "address"
      | "description"
      | "business_whatsapp_number"
      | "business_name"
      | "featured_product"
      | "slug"
      | "cover_image"
    >
  >
): Promise<ServiceResult<{ vendor: User }>> {
  try {
    const res = await api.patch(`/businessProfile/me`, payload);
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data.data };
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

/**
 * Deactivate Business Profile (owner or admin)
 * POST /vendors/:id/deactivate
 */
export async function deactivateBusinessProfile(
  id: string
): Promise<
  ServiceResult<{ businessProfile: BusinessProfile; message?: string }>
> {
  try {
    const res = await api.delete(
      `/vendors/${encodeURIComponent(id)}/deactivate`
    );
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

export default {
  createBusinessProfile,
  getBusinessProfileById,
  getBusinessProfileBySlug,
  updateBusinessProfile,
  deactivateBusinessProfile,
};
