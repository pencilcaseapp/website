import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import Home, { meta } from './home';

function renderHome() {
  const Stub = createRoutesStub([{ path: '/', Component: Home }]);

  return render(<Stub />);
}

describe('Home', () => {
  it('titles the page', () => {
    expect(meta()).toContainEqual({
      title: 'pencil case – Docs, dead simple.',
    });
  });

  it('shows the header, the menu and the hero', async () => {
    renderHome();

    expect(await screen.findByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Docs,dead simple.');
  });

  it('lets the skip link land on the content', async () => {
    renderHome();

    expect(await screen.findByRole('main')).toHaveAttribute('id', 'main');
  });
});
