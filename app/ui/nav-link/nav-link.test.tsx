import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavLink } from './nav-link';

describe('NavLink', () => {
  it('renders a link', () => {
    render(<NavLink href="#pricing">Pricing</NavLink>);

    expect(screen.getByRole('link', { name: 'Pricing' }))
      .toHaveAttribute('href', '#pricing');
  });

  it('matches snapshot', () => {
    const { container } = render(<NavLink href="#pricing">Pricing</NavLink>);

    expect(container).toMatchSnapshot();
  });
});
