import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./test/setup.ts"],
    exclude: ["e2e-playwright/**", "node_modules/**"],
    globals: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  }
})
