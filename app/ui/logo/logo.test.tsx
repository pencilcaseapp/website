import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from './logo';

describe('Logo', () => {
  it('names the product', () => {
    render(<Logo />);

    expect(screen.getByText('pencil case')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Logo tone="light" />);

    expect(container).toMatchSnapshot();
  });
});
