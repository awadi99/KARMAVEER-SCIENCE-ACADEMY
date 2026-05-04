import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        // 🛠️ Dynamic Target: Environment variable use karein ya local condition
        target: "https://karmaveer-science-academy.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})