import axios from "axios";
import { getToken, clearToken } from "../utils/auth";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export const axiosClient = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: false,
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      clearToken();
      // Don't hard redirect in case user is on login page
    }
    return Promise.reject(err);
  }
);
