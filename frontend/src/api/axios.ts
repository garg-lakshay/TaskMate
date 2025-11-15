import axios from "axios";
import { useAuthStore } from "../store/auth";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3001/api", // your backend base URL
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
