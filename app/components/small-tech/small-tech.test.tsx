import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SmallTech } from './small-tech';

describe('SmallTech', () => {
  it('introduces the section', () => {
    render(<SmallTech />);

    expect(screen.getByRole('heading', { level: 2, name: 'Small Tech' }))
      .toBeInTheDocument();
    expect(screen.getByText('We build a product for people, not machines.'))
      .toBeInTheDocument();
  });

  it('gives every principle a panel of its own', () => {
    render(<SmallTech />);

    expect(screen.getAllByRole('article').map(panel =>
      panel.querySelector('h3')!.textContent))
      .toEqual(['Hosted in the EU', 'Privacy', 'Small on purpose', 'AI?']);
  });

  it('links every call to action to the app', () => {
    render(<SmallTech />);

    const links = screen.getAllByRole('link', { name: 'Get started' });

    expect(links).toHaveLength(5);
    links.forEach(link => expect(link)
      .toHaveAttribute('href', 'https://docs.pencilcase.app'));
  });
});
