// vite.config.js in todo-components
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 5174,
  },
  preview: {
    port: 5174,
  },
  plugins: [
    react(),
    federation({
      name: "vite-remote",
      filename: "remoteEntry.js",
      exposes: {
        "./RemoteApp": "./src/App.jsx",
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