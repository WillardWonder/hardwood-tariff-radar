import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hardwood-tariff-radar/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
