import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  test: {
    setupFiles: ['./test/setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [
        {
          browser: 'chromium',
          viewport: {
            width: 1280,
            height: 720,
          },
        },
      ],
    },
  },
});
