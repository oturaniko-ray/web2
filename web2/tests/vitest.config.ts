// tests/vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: "v8", // o "istanbul"
    },
    setupFiles: ['./tests/setupTests.ts']
    // ...
  }
});