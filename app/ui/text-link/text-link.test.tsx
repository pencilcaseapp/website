import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { TextLink } from './text-link';

describe('TextLink', () => {
  it('renders a link', () => {
    render(<TextLink to="/privacy">privacy policy</TextLink>, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <TextLink to="/privacy">privacy policy</TextLink>,
      { wrapper: MemoryRouter },
    );

    expect(container).toMatchSnapshot();
  });
});
