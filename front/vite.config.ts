import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import autoprefixer from 'autoprefixer'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), basicSsl()],
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
})
