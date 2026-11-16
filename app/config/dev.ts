import type { Config } from '.';

export function getConfigDev(): Config {
  return {
    environment: 'development',
    contactUrl: 'http://localhost:3000/contact',
    analytics: false,
  };
}
