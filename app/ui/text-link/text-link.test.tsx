import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextLink } from './text-link';

describe('TextLink', () => {
  it('renders a link', () => {
    render(<TextLink href="/privacy">privacy policy</TextLink>);

    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <TextLink href="/privacy">privacy policy</TextLink>,
    );

    expect(container).toMatchSnapshot();
  });
});
