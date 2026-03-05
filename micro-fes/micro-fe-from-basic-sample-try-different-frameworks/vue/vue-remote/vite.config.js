import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/MainRemote.js',
      name: 'VueRemote',        // ✅ exposes window.VueRemote
      fileName: 'remoteEntry',
      formats: ['iife'],         // ✅ classic script, no import.meta
    },
    rollupOptions: {
      external: [],              // ✅ bundle everything in
    },
    target: 'es2015',
    minify: false,
  },
  server: {
    port: 3001,
    cors: true,
  }
})