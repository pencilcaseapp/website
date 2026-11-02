import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LegalPage, LegalSection } from './legal-page';

describe('LegalPage', () => {
  it('titles the page', () => {
    render(<LegalPage title="Terms of Use" />);

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Terms of Use.');
  });

  it('shows the date of the current version', () => {
    render(<LegalPage title="Privacy Policy" updatedAt="2026-10-27" />);

    expect(screen.getByText('27 October 2026'))
      .toHaveAttribute('datetime', '2026-10-27');
  });

  it('names a section by its heading', () => {
    render(
      <LegalSection id="terms-1" title="Scope">
        <p>These terms apply.</p>
      </LegalSection>,
    );

    expect(screen.getByRole('region', { name: 'Scope' }))
      .toHaveTextContent('These terms apply.');
  });

  it('reads the number out with the heading', () => {
    render(<LegalSection id="terms-1" number={1} title="Scope" />);

    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent('1. Scope');
  });
});
