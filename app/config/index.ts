import { getConfigDev } from './dev';
import { getConfigProd } from './prod';
import { getConfigTest } from './test';

/**
 * Everything that differs between environments. None of it is secret: the
 * root loader hands it to the browser, where `useConfig` reads it.
 */
export interface Config {
  environment: 'development' | 'test' | 'prod';

  /** Where the contact form posts: the app's `/contact`. */
  contactUrl: string;

  /** Whether Plausible counts the visit. Never on localhost. */
  analytics: boolean;
}

export function getConfig(): Config {
  switch (process.env.ENV) {
    case 'development': {
      return getConfigDev();
    }

    case 'test': {
      return getConfigTest();
    }

    case 'prod': {
      return getConfigProd();
    }

    default: {
      return getConfigTest();
    }
  }
}
