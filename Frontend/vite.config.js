import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // 🚀 Ye part missing tha:
      // Jab bhi frontend '/api' hit karega, Vite use localhost:3000 par redirect kar dega
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})