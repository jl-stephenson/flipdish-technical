import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom", // or 'jsdom'
    globals: true, // enable global describe/expect
    setupFiles: ["./src/test-setup.ts"], // your global setup
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
