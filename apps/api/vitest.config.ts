import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.{e2e-spec,spec}.{ts,js}'],
    setupFiles: ['./test/setup-e2e.ts'],
    deps: {
      optimizer: {
        ssr: {
          include: ['supertest'],
        },
      },
    },
  },
});
