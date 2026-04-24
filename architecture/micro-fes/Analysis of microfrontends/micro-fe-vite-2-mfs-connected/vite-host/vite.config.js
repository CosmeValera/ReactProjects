// vite.config.js in host-app
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 5173,
  },
  preview: {
    port: 5173,
  },
  plugins: [
    react(),
    federation({
      name: "vite-host",
      remotes: {
        vite_remote_app: "http://localhost:5174/assets/remoteEntry.js",
        // webpack_remote_app: "http://localhost:5175/remoteEntry.js"
      },
      shared: ["react"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",

    minify: false,
    cssCodeSplit: false,
  },
});