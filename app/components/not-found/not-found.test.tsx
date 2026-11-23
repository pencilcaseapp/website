import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getConfigTest } from '~/config/test';
import { ConfigContext } from '~/hooks/use-config';
import { NotFound } from './not-found';
import { trackEvent } from '~/utils/analytics';

vi.mock('~/utils/analytics', async importOriginal => ({
  ...await importOriginal(),
  trackEvent: vi.fn(),
}));

describe('NotFound', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('says the page is missing and links back home', () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Page not found.');
    expect(screen.getByRole('link', { name: 'Back to home' }))
      .toHaveAttribute('href', '/');
  });

  it('reports a 404 event to Plausible', () => {
    render(
      <ConfigContext value={{ ...getConfigTest(), analytics: true }}>
        <MemoryRouter><NotFound /></MemoryRouter>
      </ConfigContext>,
    );

    expect(trackEvent).toHaveBeenCalledWith('404');
  });

  it('reports nothing without analytics', () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    expect(trackEvent).not.toHaveBeenCalled();
  });
});
