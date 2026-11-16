import { afterEach, describe, expect, it, vi } from 'vitest';
import { getConfig } from '.';

describe('getConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('picks the config by ENV', () => {
    vi.stubEnv('ENV', 'prod');
    expect(getConfig()).toEqual({
      environment: 'prod',
      contactUrl: 'https://docs.pencilcase.app/contact',
      analytics: true,
    });

    vi.stubEnv('ENV', 'development');
    expect(getConfig()).toMatchObject({
      environment: 'development',
      contactUrl: 'http://localhost:3000/contact',
      analytics: false,
    });
  });

  it('falls back to the test config', () => {
    vi.stubEnv('ENV', '');
    expect(getConfig().environment).toBe('test');
  });
});
