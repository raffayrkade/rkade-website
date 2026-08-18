import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { slugs } from './src/data/work.js'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    includedRoutes: async () => [
      '/',
      '/work',
      ...slugs.map((slug) => `/work/${slug}`),
      '/services',
      '/about',
      '/contact',
    ],
  },
})
