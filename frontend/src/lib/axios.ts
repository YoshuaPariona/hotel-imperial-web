// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  // In development, use relative URLs (Vite proxy handles routing)
  // In production, use the full API URL from environment variable
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : "",
  timeout: 10000,
  withCredentials: true,
});

// Interceptor opcional de request (token, etc.)
api.interceptors.request.use(
  (config) => {
    // Ejemplo: agregar token
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta (logs, manejo global de errores)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
