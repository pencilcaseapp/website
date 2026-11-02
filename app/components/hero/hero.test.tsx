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

  it('tints Safari\'s bars yellow while at the top', () => {
    const { container } = render(<Hero />);

    expect(container.querySelectorAll('.bar-tint-at-top.bg-pca-yellow-500'))
      .toHaveLength(2);
  });

  it('tells how many docs are free', () => {
    render(<Hero />);

    expect(screen.getByText('Free for your first 5 docs.'))
      .toBeInTheDocument();
  });
});
