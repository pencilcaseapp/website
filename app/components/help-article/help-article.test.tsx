import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { findHelpArticle } from '~/utils/help';
import { HelpArticle } from './help-article';

function renderArticle(slug: string) {
  const found = findHelpArticle(slug)!;

  return render(
    <HelpArticle article={found.article} section={found.section} />,
    { wrapper: MemoryRouter },
  );
}

describe('HelpArticle', () => {
  it('answers the question', () => {
    renderArticle('share-with-a-link');

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('How do I share a document with a link?');
    expect(screen.getAllByText('Share')[0].tagName).toBe('STRONG');
    expect(within(screen.getByRole('article')).getAllByRole('listitem'))
      .toHaveLength(4);
  });

  it('leads back to its section', () => {
    renderArticle('share-with-a-link');

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });

    expect(within(breadcrumb).getByRole('link', { name: 'Help' }))
      .toHaveAttribute('href', '/help');
    expect(within(breadcrumb)
      .getByRole('link', { name: 'Sharing and collaboration' }))
      .toHaveAttribute('href', '/help#sharing');
  });

  it('suggests more questions and the form', () => {
    renderArticle('share-with-a-link');

    expect(screen.getByRole('link', {
      name: 'Do the people I share with need an account?',
    })).toHaveAttribute('href', '/help/do-others-need-an-account');
    expect(screen.getByRole('link', { name: 'Still stuck? Write to us' }))
      .toHaveAttribute('href', '/help#write-to-us');
    expect(screen.getByRole('link', { name: 'This page as Markdown' }))
      .toHaveAttribute('href', '/help/share-with-a-link.md');
  });

  it('says when it is a draft', () => {
    renderArticle('what-are-spaces');

    expect(screen.getByText(/^Draft: the app does not do this yet/))
      .toBeInTheDocument();
  });
});
