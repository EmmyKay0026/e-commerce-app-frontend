import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HTTPMethod;
  body?: any;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

function buildUrl(base: string, path: string, params?: Record<string, any>) {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  const url = new URL(`${cleanBase}/${cleanPath}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

async function parseResponse(res: Response) {
  const text = await res.text().catch(() => "");
  const contentType = res.headers.get("content-type") || "";
  let payload: any = null;
  if (contentType.includes("application/json") && text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  } else {
    payload = text || null;
  }
  if (!res.ok) {
    const errMsg =
      (payload && (payload.error || payload.message || payload?.errors)) ||
      `Request failed: ${res.status}`;
    const err = new Error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
    (err as any).status = res.status;
    (err as any).payload = payload;
    throw err;
  }
  return payload;
}

export function useApi(baseUrl?: string) {
  const API_BASE = (baseUrl ?? process.env.NEXT_PUBLIC_API_BASE ?? "https://e-commerce-app-backend-khxb.onrender.com/api").replace(/\/+$/, "");

  const getToken = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  const request = useCallback(
    async <T = any>(path: string, opts: RequestOptions = {}): Promise<T> => {
      const controller = new AbortController();
      const signal = opts.signal ?? controller.signal;
      const url = buildUrl(API_BASE, path, opts.params);
      const token = getToken();

      const headers: Record<string, string> = {
        Accept: "application/json",
        ...(opts.headers || {}),
      };

      if (opts.method && opts.method !== "GET" && opts.body !== undefined) {
        if (!(opts.body instanceof FormData)) {
          headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
        }
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const body =
        opts.body === undefined || opts.body === null
          ? undefined
          : opts.body instanceof FormData
          ? opts.body
          : JSON.stringify(opts.body);

      const res = await fetch(url, {
        method: opts.method ?? "GET",
        headers,
        body,
        signal,
      });

      return (await parseResponse(res)) as T;
    },
    [API_BASE, getToken]
  );

  const get = useCallback(<T = any>(path: string, params?: Record<string, any>, headers?: Record<string, string>) =>
    request<T>(path, { method: "GET", params, headers }), [request]);

  const post = useCallback(<T = any>(path: string, body?: any, params?: Record<string, any>, headers?: Record<string, string>) =>
    request<T>(path, { method: "POST", body, params, headers }), [request]);

  const put = useCallback(<T = any>(path: string, body?: any, params?: Record<string, any>, headers?: Record<string, string>) =>
    request<T>(path, { method: "PUT", body, params, headers }), [request]);

  const patch = useCallback(<T = any>(path: string, body?: any, params?: Record<string, any>, headers?: Record<string, string>) =>
    request<T>(path, { method: "PATCH", body, params, headers }), [request]);

  const del = useCallback(<T = any>(path: string, body?: any, params?: Record<string, any>, headers?: Record<string, string>) =>
    request<T>(path, { method: "DELETE", body, params, headers }), [request]);

  // Supabase helpers
  const auth = {
    signUp: async (email: string, password: string, metadata?: Record<string, any>) => {
      // signUp returns different shapes depending on supabase-js version; keep tolerant
      const res = await (supabase.auth as any).signUp
        ? (supabase.auth as any).signUp({ email, password, options: { data: metadata } })
        : (supabase.auth as any).signUp({ email, password, data: metadata });
      return res;
    },
    signInWithPassword: async (email: string, password: string) => {
      // v2: signInWithPassword, v1: signIn
      if ((supabase.auth as any).signInWithPassword) {
        return (supabase.auth as any).signInWithPassword({ email, password });
      }
      return (supabase.auth as any).signIn({ email, password });
    },
    signInWithOAuth: async (provider: string, options?: any) => {
      return (supabase.auth as any).signInWithOAuth
        ? (supabase.auth as any).signInWithOAuth({ provider, options })
        : (supabase.auth as any).signIn({ provider });
    },
    signOut: async () => (supabase.auth as any).signOut(),
    getUser: async () => {
      // First, get the user from Supabase to ensure there's an active session
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return null;

      // Then, fetch the full user profile from your backend API
      const backendUser = await request<any>('users/me');
      // The backend might return { user: ... } or the user object directly
      return backendUser?.user ?? backendUser;
    },
    getSession: async () => (supabase.auth as any).getSession ? (await (supabase.auth as any).getSession()).data.session : null,
  };

  const db = {
    select: async (table: string, columns = "*", filter?: Record<string, any>) => {
      let q = supabase.from(table).select(columns);
      if (filter) {
        Object.entries(filter).forEach(([k, v]) => {
          q = (q as any).eq(k, v);
        });
      }
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    insert: async (table: string, payload: any) => {
      const { data, error } = await supabase.from(table).insert(payload);
      if (error) throw error;
      return data;
    },
    update: async (table: string, payload: any, match: Record<string, any>) => {
      const { data, error } = await supabase.from(table).update(payload).match(match);
      if (error) throw error;
      return data;
    },
    delete: async (table: string, match: Record<string, any>) => {
      const { data, error } = await supabase.from(table).delete().match(match);
      if (error) throw error;
      return data;
    },
    rpc: async (fnName: string, params?: any) => {
      const { data, error } = await supabase.rpc(fnName, params);
      if (error) throw error;
      return data;
    },
  };

  // useQuery hook for components that want state + auto-fetch
  function useQuery<T = any>(
    path: string,
    opts?: {
      params?: Record<string, any>;
      deps?: any[]; // extra deps to re-run
      immediate?: boolean; // fetch on mount
      transform?: (data: any) => T;
    }
  ) {
    const { params, deps = [], immediate = true, transform } = opts ?? {};
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<any>(null);
    const abortRef = useRef<AbortController | null>(null);

    const fetcher = useCallback(
      async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);
        try {
          const payload = await request<T>(path, { method: "GET", params, signal });
          setData(transform ? transform(payload) : (payload as any));
        } catch (err) {
          if ((err as any)?.name === "AbortError") return;
          setError(err);
        } finally {
          setLoading(false);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [path, JSON.stringify(params), request, ...(deps || [])]
    );

    useEffect(() => {
      if (!immediate) return;
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      fetcher(abortRef.current.signal);
      return () => {
        abortRef.current?.abort();
      };
    }, [fetcher, immediate]);

    return {
      data,
      loading,
      error,
      refresh: () => {
        abortRef.current?.abort();
        abortRef.current = new AbortController();
        return fetcher(abortRef.current.signal);
      },
    };
  }

  return {
    request,
    get,
    post,
    put,
    patch,
    del,
    useQuery,
    // supabase exports
    supabase,
    auth,
    db,
  };
}

export default useApi;