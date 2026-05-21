import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://karmaveerscienceacademy.in', 
      outDir: 'dist',
      routes: [
        '/',
        '/about',
        '/contact',
        '/Faq',
        '/login',
        '/register'
      ]
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})