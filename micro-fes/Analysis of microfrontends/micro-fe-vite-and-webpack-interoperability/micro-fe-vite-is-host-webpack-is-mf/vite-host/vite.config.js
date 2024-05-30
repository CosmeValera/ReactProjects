import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "vite-host",
      filename: "remoteEntry.js",
      exposes: { },
      remotes: {
        webpack_remote: {
          external: 'http://localhost:4002/remoteEntry.js',
          format: 'var',
          from: 'webpack'
        }
      },
      shared: ["react", "react-dom"],
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
