import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getConfigTest } from '~/config/test';
import { ConfigContext } from '~/hooks/use-config';
import { NotFound } from './not-found';

describe('NotFound', () => {
  afterEach(() => {
    delete window.plausible;
  });

  it('says the page is missing and links back home', () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Page not found.');
    expect(screen.getByRole('link', { name: 'Back to home' }))
      .toHaveAttribute('href', '/');
  });

  it('reports a 404 event to Plausible', () => {
    window.plausible = vi.fn();

    render(
      <ConfigContext value={{ ...getConfigTest(), analytics: true }}>
        <MemoryRouter><NotFound /></MemoryRouter>
      </ConfigContext>,
    );

    expect(window.plausible).toHaveBeenCalledWith('404');
  });

  it('reports nothing without analytics', () => {
    window.plausible = vi.fn();

    render(<NotFound />, { wrapper: MemoryRouter });

    expect(window.plausible).not.toHaveBeenCalled();
  });
});
