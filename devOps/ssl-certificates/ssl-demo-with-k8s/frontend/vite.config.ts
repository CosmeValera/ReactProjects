import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const certsDir = path.join(__dirname, '..', 'certs')

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key:  fs.readFileSync(path.join(certsDir, 'server.key')),
      cert: fs.readFileSync(path.join(certsDir, 'server.crt')),
    },
    port: 5173,
  },
})