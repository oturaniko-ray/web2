// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx', 'tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    setupFiles: ['./tests/setupTests.ts'],
    coverage: {
      provider: "v8", // o "istanbul",
      reporter: ['text', 'lcov'],
      all: true,
      include: ['components/**/*', 'hooks/**/*'],
      exclude: ['**/node_modules/**', 'tests/**'],
      lines: 80,
      functions: 75,
      branches: 70,
      statements: 80
    }
  },
  esbuild: {}
});