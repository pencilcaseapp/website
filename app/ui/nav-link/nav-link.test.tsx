import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { NavLink } from './nav-link';

describe('NavLink', () => {
  it('renders a link', () => {
    render(<NavLink to="/#pricing">Pricing</NavLink>, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByRole('link', { name: 'Pricing' }))
      .toHaveAttribute('href', '/#pricing');
  });

  it('matches snapshot', () => {
    const { container } = render(<NavLink to="/#pricing">Pricing</NavLink>, {
      wrapper: MemoryRouter,
    });

    expect(container).toMatchSnapshot();
  });
});
