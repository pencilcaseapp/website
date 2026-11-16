import type { Config } from '.';

export function getConfigTest(): Config {
  return {
    environment: 'test',
    contactUrl: 'http://localhost:3000/contact',
    analytics: false,
  };
}
