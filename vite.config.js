import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Change this to your repository name.
  // This is the base path the app will be served from on GitHub Pages.
  base: '/mercado-laboral-mexicano/', 
  plugins: [react()],
})
