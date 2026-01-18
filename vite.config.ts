import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  base: process.env.REACT_ROUTER_BASE_PATH,
  plugins: [tailwindcss(), !isStorybook && reactRouter(), tsconfigPaths()],
});
