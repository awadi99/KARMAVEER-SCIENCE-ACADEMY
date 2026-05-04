import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          // Agar mode 'development' hai toh localhost use hoga, warna Render ka URL
          target: mode === 'development' 
            ? 'http://localhost:3000'
            : 'https://karmaveer-science-academy.onrender.com', 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})