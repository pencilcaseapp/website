import { act, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getConfigTest } from '~/config/test';
import { ConfigContext } from '~/hooks/use-config';
import { usePlausiblePageviews } from './use-plausible-pageviews';

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
    delete window.plausible;
  });

  it('counts the first page', () => {
    window.plausible = vi.fn();
    renderRouter();

    expect(window.plausible).toHaveBeenCalledExactlyOnceWith('pageview');
  });

  it('counts every page and section navigated to', async () => {
    window.plausible = vi.fn();
    const router = renderRouter();

    await act(() => router.navigate('/help'));
    await act(() => router.navigate('/#pricing'));

    expect(window.plausible).toHaveBeenCalledTimes(3);
  });

  it('counts nothing without analytics', async () => {
    window.plausible = vi.fn();
    const router = renderRouter(false);

    await act(() => router.navigate('/help'));

    expect(window.plausible).not.toHaveBeenCalled();
  });
});
