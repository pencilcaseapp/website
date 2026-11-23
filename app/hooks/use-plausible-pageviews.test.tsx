import { act, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getConfigTest } from '~/config/test';
import { ConfigContext } from '~/hooks/use-config';
import { usePlausiblePageviews } from './use-plausible-pageviews';
import { trackEvent } from '~/utils/analytics';

vi.mock('~/utils/analytics', async importOriginal => ({
  ...await importOriginal(),
  trackEvent: vi.fn(),
}));

function renderRouter(analytics = true) {
  const Page = () => {
    usePlausiblePageviews();

    return null;
  };
  const router = createMemoryRouter([
    { path: '/', Component: Page },
    { path: '/help', Component: Page },
  ]);
  render(
    <ConfigContext value={{ ...getConfigTest(), analytics }}>
      <RouterProvider router={router} />
    </ConfigContext>,
  );

  return router;
}

describe('usePlausiblePageviews', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('counts the first page', () => {
    renderRouter();

    expect(trackEvent).toHaveBeenCalledExactlyOnceWith('pageview');
  });

  it('counts every page and section navigated to', async () => {
    const router = renderRouter();

    await act(() => router.navigate('/help'));
    await act(() => router.navigate('/#pricing'));

    expect(trackEvent).toHaveBeenCalledTimes(3);
  });

  it('counts nothing without analytics', async () => {
    const router = renderRouter(false);

    await act(() => router.navigate('/help'));

    expect(trackEvent).not.toHaveBeenCalled();
  });
});
