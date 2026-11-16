import { createContext, useContext } from 'react';
import type { Config } from '~/config';
import { getConfigTest } from '~/config/test';

/**
 * The root hands the config its loader read on the server down to every
 * component. Without a provider (tests, Storybook) it is the test config.
 */
export const ConfigContext = createContext<Config>(getConfigTest());

export function useConfig() {
  return useContext(ConfigContext);
}
