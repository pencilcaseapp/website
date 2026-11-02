import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { getHelpArticlePage } from '~/utils/help.server';
import { HelpArticle } from './help-article';

function renderArticle(slug: string) {
  return render(
    <HelpArticle {...getHelpArticlePage(slug)!} />,
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

  it('links to the pages the text names', () => {
    renderArticle('create-an-account');

    expect(screen.getByRole('link', { name: 'sign in page' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app/signin');

    renderArticle('deleted-data');

    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
  });

  it('keeps a link written as code as code', () => {
    renderArticle('markdown-shortcuts');

    expect(screen.getByText('[text](address)').tagName).toBe('CODE');
  });
});
