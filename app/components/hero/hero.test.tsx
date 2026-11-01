import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  it('says what pencil case is', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Docs,dead simple.');
  });

  it('gets started on the app', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('tints Safari\'s top bar while at the top', () => {
    const { container } = render(<Hero />);

    expect(container.querySelector('.top-bar-tint')).toBeInTheDocument();
  });

  it('tells how many docs are free', () => {
    render(<Hero />);

    expect(screen.getByText('Free for your first 5 docs.'))
      .toBeInTheDocument();
  });
});
