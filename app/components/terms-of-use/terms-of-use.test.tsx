import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { TermsOfUse } from './terms-of-use';

describe('TermsOfUse', () => {
  it('shows the version', () => {
    render(<TermsOfUse />, { wrapper: MemoryRouter });

    expect(screen.getByText('2 November 2026'))
      .toHaveAttribute('datetime', '2026-11-02');
  });

  it('has nine sections', () => {
    render(<TermsOfUse />, { wrapper: MemoryRouter });

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(9);
  });

  it('links to the legal notice and the pricing', () => {
    render(<TermsOfUse />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'legal notice' }))
      .toHaveAttribute('href', '/legal-notice');
    expect(screen.getByRole('link', { name: 'pricing page' }))
      .toHaveAttribute('href', '/#pricing');
  });

  it('lists what is not allowed', () => {
    render(<TermsOfUse />, { wrapper: MemoryRouter });

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
