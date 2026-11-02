import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { LegalNotice } from './legal-notice';

describe('LegalNotice', () => {
  it('names the provider and the address', () => {
    render(<LegalNotice />, { wrapper: MemoryRouter });

    expect(screen.getByRole('region', { name: 'Provider' }))
      .toHaveTextContent(
        'Henrik FrickeBoxhagener Str. 3610245 BerlinGermany',
      );
  });

  it('gives the ways to get in touch', () => {
    render(<LegalNotice />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'inbox@pencilcase.app' }))
      .toHaveAttribute('href', 'mailto:inbox@pencilcase.app');
    expect(screen.getByRole('link', { name: 'pencilcase.app/contact' }))
      .toHaveAttribute('href', '/contact');
  });

  it('links to the privacy policy', () => {
    render(<LegalNotice />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
  });
});
