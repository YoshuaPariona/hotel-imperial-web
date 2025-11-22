import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@api": path.resolve(__dirname, "src/api"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to the backend
      '/rooms': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/reservations': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/guests': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // Add other API endpoints as needed
    },
  },
})
