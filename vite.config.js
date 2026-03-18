import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rag': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  define: {
    // Allows overriding API base at build time via VITE_API_BASE env var.
    // In dev, the proxy handles /rag so empty string is fine.
    // In production (Cloudflare Pages), set VITE_API_BASE to your backend URL
    // e.g. https://your-backend.com in the CF Pages env vars dashboard.
    'import.meta.env.VITE_API_BASE': JSON.stringify(process.env.VITE_API_BASE || '')
  }
})
