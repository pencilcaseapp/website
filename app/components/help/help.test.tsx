import { render, screen, within } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { getHelpSections } from '~/utils/help.server';
import { Help } from './help';

/** Renders in a data router, which the contact form's fetcher needs. */
function renderInRouter(ui: React.ReactElement) {
  const Stub = createRoutesStub([{ path: '/', Component: () => ui }]);

  return render(<Stub />);
}

describe('Help', () => {
  it('lists every section with its questions', () => {
    renderInRouter(<Help sections={getHelpSections()} />);

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Help.');

    for (const section of getHelpSections()) {
      const region = screen.getByRole('region', { name: section.title });

      expect(within(region).getAllByRole('link'))
        .toHaveLength(section.articles.length);
    }

    expect(screen.getByRole('link', { name: 'How do I sign in?' }))
      .toHaveAttribute('href', '/help/sign-in');
  });

  it('jumps to a section from the pills', () => {
    renderInRouter(<Help sections={getHelpSections()} />);

    const nav = screen.getByRole('navigation', { name: 'Help sections' });

    expect(within(nav).getByRole('link', { name: 'Account' }))
      .toHaveAttribute('href', '/#account');
    expect(within(nav).getByRole('link', { name: 'Write to us' }))
      .toHaveAttribute('href', '/#write-to-us');
  });

  it('marks the drafts', () => {
    renderInRouter(<Help sections={getHelpSections()} />);

    expect(screen.getByRole('link', { name: 'What are spaces? Draft' }))
      .toBeInTheDocument();
  });

  it('ends with the contact form', () => {
    renderInRouter(<Help sections={getHelpSections()} />);

    const form = screen.getByRole('region', {
      name: 'Didn’t find your answer?',
    });

    expect(within(form).getByLabelText('Your e-mail address'))
      .toHaveAttribute('type', 'email');
    expect(within(form).getByRole('button', { name: 'Send message' }))
      .toHaveAttribute('type', 'submit');
  });
});
