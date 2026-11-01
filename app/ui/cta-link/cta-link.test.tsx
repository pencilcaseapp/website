import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CtaLink } from './cta-link';

describe('CtaLink', () => {
  it('renders a link with its label', () => {
    render(<CtaLink href="https://example.com">Get started</CtaLink>);

    expect(screen.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', 'https://example.com');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <CtaLink href="/" colorLight="red-600" size="small">Sign in</CtaLink>,
    );

    expect(container).toMatchSnapshot();
  });
});
