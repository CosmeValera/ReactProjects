import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    solid(),
    federation({
      name: 'solidjs_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './MainRemote': './src/mount.jsx',
      },
      shared: ['solid-js']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 3002,
    cors: true,
  },
  preview: {
    port: 3002,
    cors: true,
  }
})

