import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TermsOfUse } from './terms-of-use';

describe('TermsOfUse', () => {
  it('has nine sections', () => {
    render(<TermsOfUse />);

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(9);
  });

  it('links to the legal notice and the pricing', () => {
    render(<TermsOfUse />);

    expect(screen.getByRole('link', { name: 'legal notice' }))
      .toHaveAttribute('href', '/imprint');
    expect(screen.getByRole('link', { name: 'pricing page' }))
      .toHaveAttribute('href', '/#pricing');
  });

  it('lists what is not allowed', () => {
    render(<TermsOfUse />);

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
