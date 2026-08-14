/// <reference types="vitest/config" />

import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Build-output tests read ./dist, so they must not run before `astro build`.
    // `npm run test` in CI runs after the build step (Task 16).
  },
});
