import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vue_remote',
      filename: 'remoteEntry.js',
      exposes: {
        // Exposes the mount() function and HelloWorld default export
        './MainRemote': './src/MainRemote.js',
      },
      shared: ['vue'],
    }),
  ],
  build: {
    // Module Federation requires a module target (not iife)
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 3001,
    cors: true,
  },
  preview: {
    port: 3001,
    cors: true,
  },
})