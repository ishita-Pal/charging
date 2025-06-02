import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    // For local dev only — fallback for SPA routes on dev server
    historyApiFallback: true,
  }
})
