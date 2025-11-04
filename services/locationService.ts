import api from "@/config/api";
import { ServiceResult } from "@/types/models";
import { State, LGA } from "@/types/location";

export const listStates = async (): Promise<ServiceResult<State[]>> => {
  try {
    const res = await api.get("/location/states");
    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as State[],
      };
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
};

export const listLgas = async (
  state_id: string
): Promise<ServiceResult<LGA[]>> => {
  try {
    const res = await api.get(`/location/lgas/${state_id}`);
    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as LGA[],
      };
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
};

export const getState = async (id: string): Promise<ServiceResult<State>> => {
  try {
    const res = await api.get(`/location/states/${id}`);
    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as State,
      };
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
};

export const getLga = async (id: string): Promise<ServiceResult<LGA>> => {
  try {
    const res = await api.get(`/location/lgas/lga/${id}`);
    if (res.status === 200) {
      return { success: true, status: res.status, data: res.data.data as LGA };
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
};

export const searchLocations = async (
  query: string
): Promise<ServiceResult<(State | LGA)[]>> => {
  try {
    const res = await api.get(`/location/search?q=${query}`);
    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as (State | LGA)[],
      };
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
};

export const listAllLgas = async (): Promise<ServiceResult<LGA[]>> => {
  try {
    const res = await api.get("/location/lgas");
    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as LGA[],
      };
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
};

export const listStatesWithLgas = async (): Promise<ServiceResult<State[]>> => {
  try {
    const res = await api.get("/location/states-with-lgas");
    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as State[],
      };
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
};
