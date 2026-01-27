import type { Config } from '@react-router/dev/config';

export default {
  routeDiscovery: {
    mode: 'lazy',
    manifestPath: '/__website-manifest',
  },
} satisfies Config;
