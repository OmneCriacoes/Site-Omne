import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@domain': fromRoot('./src/domain'),
      '@application': fromRoot('./src/application'),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
