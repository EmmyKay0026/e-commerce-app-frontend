import axios, { AxiosInstance } from "axios";
import { supabase } from "./supabase";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).toString()
  : "https://e-commerce-app-backend-khxb.onrender.com/api";


let userBearer: string | null = null;

// // Helper to build auth headers when a token is provided
// export const authHeaders = async () => {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   const token = session?.access_token ? session?.access_token : null;
//   console.log(token);

//   token ? (userBearer = token) : (userBearer = null);

//   return token;
// };

const api = axios.create({
  baseURL,
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Set up the Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token; // Get the current Supabase token

    if (token) {
      // 3. Attach the token if available
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
