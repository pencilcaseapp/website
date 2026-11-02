import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { HELP_SECTIONS } from '~/constants/help';
import { Help } from './help';

describe('Help', () => {
  it('lists every section with its questions', () => {
    render(<Help />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Help.');

    for (const section of HELP_SECTIONS) {
      const region = screen.getByRole('region', { name: section.title });

      expect(within(region).getAllByRole('link'))
        .toHaveLength(section.articles.length);
    }

    expect(screen.getByRole('link', { name: 'How do I sign in?' }))
      .toHaveAttribute('href', '/help/sign-in');
  });

  it('jumps to a section from the pills', () => {
    render(<Help />, { wrapper: MemoryRouter });

    const nav = screen.getByRole('navigation', { name: 'Help sections' });

    expect(within(nav).getByRole('link', { name: 'Account' }))
      .toHaveAttribute('href', '/#account');
    expect(within(nav).getByRole('link', { name: 'Write to us' }))
      .toHaveAttribute('href', '/#write-to-us');
  });

  it('marks the drafts', () => {
    render(<Help />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'What are spaces? Draft' }))
      .toBeInTheDocument();
  });

  it('ends with the contact form', () => {
    render(<Help />, { wrapper: MemoryRouter });

    const form = screen.getByRole('region', {
      name: 'Didn’t find your answer?',
    });

    expect(within(form).getByLabelText('Your e-mail address'))
      .toHaveAttribute('type', 'email');
    expect(within(form).getByRole('button', { name: 'Send message' }))
      .toHaveAttribute('type', 'submit');
  });
});
