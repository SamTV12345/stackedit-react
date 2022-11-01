import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude:'**/*.md',
  base:'/stackedit-react',
  build:{
    target:'esnext'
  }
})
