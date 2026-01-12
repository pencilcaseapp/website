import type { Config } from '@react-router/dev/config';

export default {
  ssr: false,
  prerender: true,
  basename: process.env.REACT_ROUTER_BASENAME || '/',
} satisfies Config;
