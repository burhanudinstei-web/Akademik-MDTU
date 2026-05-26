import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Perbaikan di baris ini

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Akademik-MDTU/', 
})
