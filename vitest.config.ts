import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',        // or 'jsdom'
    globals: true,                   // enable global describe/expect
    setupFiles: ['./src/test-setup.ts'], // your global setup
  },
});