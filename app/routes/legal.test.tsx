import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import Imprint, { meta as imprintMeta } from './imprint';
import Privacy, { meta as privacyMeta } from './privacy';
import Terms, { meta as termsMeta } from './terms';

const PAGES = [
  {
    path: '/imprint',
    Component: Imprint,
    meta: imprintMeta,
    title: 'Legal notice',
  },
  {
    path: '/privacy',
    Component: Privacy,
    meta: privacyMeta,
    title: 'Privacy policy',
  },
  { path: '/terms', Component: Terms, meta: termsMeta, title: 'Terms of use' },
];

describe.each(PAGES)('$path', ({ path, Component, meta, title }) => {
  function renderPage() {
    const Stub = createRoutesStub([{ path, Component }]);

    return render(<Stub initialEntries={[path]} />);
  }

  it('titles the page', () => {
    expect(meta()).toContainEqual({ title: `${title} – pencil case` });
  });

  it('shows the text between the header and the footer', async () => {
    renderPage();

    expect(await screen.findByRole('link', { name: 'pencil case' }))
      .toHaveAttribute('href', '/');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent(`${title}.`);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('leads back to the sections of the start page', async () => {
    renderPage();

    const links = await screen.findAllByRole('link', { name: 'Features' });

    for (const link of links) {
      expect(link).toHaveAttribute('href', '/#features');
    }
  });
});
