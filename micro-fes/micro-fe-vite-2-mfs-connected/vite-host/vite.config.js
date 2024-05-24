// vite.config.js in host-app
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "vite-host",
      remotes: {
        vite_remote_app: "http://localhost:4173/assets/remoteEntry.js",
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