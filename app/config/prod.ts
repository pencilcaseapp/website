import type { Config } from '.';
import { APP_URL } from '~/constants/links';

export function getConfigProd(): Config {
  return {
    environment: 'prod',
    contactUrl: `${APP_URL}/contact`,
    analytics: true,
  };
}
