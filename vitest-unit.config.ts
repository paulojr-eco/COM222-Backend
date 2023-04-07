import { defineConfig } from 'vitest/config';
import defaultConfig from './vitest.config';

export default defineConfig({
  ...defaultConfig,
  test: {
    include: ['**/*.spec.ts'],
  },
});
