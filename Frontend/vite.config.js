import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap' // 1. Plugin import karo

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    // 2. Sitemap plugin configuration
Sitemap({
      // Yahan hyphen hatao:
      hostname: 'https://karmaveerscienceacademy.in', 
      outDir: 'dist',
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Local dev ke liye
        changeOrigin: true,
        secure: false,
      },
    },
  },
})