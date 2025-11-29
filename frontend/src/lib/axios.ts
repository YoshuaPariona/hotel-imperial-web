// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080", // URL del backend
  timeout: 10000,
  withCredentials: true,
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Redirigir al login si el token es inválido o ha expirado
        localStorage.removeItem("token");
        window.location.href = "/auth";
      }
      console.error("API Error:", error);
      return Promise.reject(error);
    }
);
