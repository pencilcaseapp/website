import { describe, expect, it } from 'vitest';
import { HELP_SECTIONS } from '~/constants/help';
import {
  findHelpArticle,
  helpArticleHref,
  helpArticleMarkdownHref,
  helpArticleToMarkdown,
  relatedHelpArticles,
  stripHelpMarks,
} from './help';

const ARTICLES = HELP_SECTIONS.flatMap(section => section.articles);

function getArticle(slug: string) {
  const found = findHelpArticle(slug);

  if (!found) {
    throw new Error(`No help article ${slug}`);
  }

  return found;
}

describe('help', () => {
  it('gives every article its own slug', () => {
    const slugs = ARTICLES.map(article => article.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only names related articles that exist', () => {
    for (const article of ARTICLES) {
      for (const slug of article.related ?? []) {
        expect(findHelpArticle(slug), `${article.slug} → ${slug}`)
          .toBeDefined();
      }
    }
  });

  it('finds an article with its section', () => {
    const { article, section } = getArticle('sign-in');

    expect(article.question).toBe('How do I sign in?');
    expect(section.title).toBe('Account');
    expect(findHelpArticle('nope')).toBeUndefined();
  });

  it('links to the article and its Markdown', () => {
    const { article } = getArticle('sign-in');

    expect(helpArticleHref(article)).toBe('/help/sign-in');
    expect(helpArticleMarkdownHref(article)).toBe('/help/sign-in.md');
  });

  it('suggests the named articles first, then the rest of the section', () => {
    const { article, section } = getArticle('share-with-a-link');

    expect(relatedHelpArticles(article, section).map(item => item.slug))
      .toEqual([
        'do-others-need-an-account',
        'view-or-edit',
        'stop-sharing',
        'invite-by-email',
        'change-or-remove-access',
        'who-is-in-a-document',
      ]);
  });

  it('suggests a draft only from another draft', () => {
    const finding = getArticle('finding-documents');
    const spaces = getArticle('what-are-spaces');

    expect(relatedHelpArticles(finding.article, finding.section)
      .map(item => item.slug)).not.toContain('what-are-spaces');
    expect(relatedHelpArticles(spaces.article, spaces.section)
      .map(item => item.slug)).toEqual(['share-a-space']);
  });

  it('writes an article as Markdown', () => {
    const { article } = getArticle('create-an-account');

    expect(helpArticleToMarkdown(article)).toBe([
      '# How do I create an account?',
      '',
      'Enter your e-mail address on the sign in page and type the code we send you. There is no password and no separate sign-up.',
      '',
      '1. Go to **Sign in** and enter your e-mail address.',
      '2. Type the code from the e-mail we send you.',
      '3. Add your name if you like. It is what other people see in a shared document.',
      '',
      'You need to be at least 16 years old to create an account.',
      '',
    ].join('\n'));
  });

  it('strips the marks for plain text', () => {
    expect(stripHelpMarks('Select **Share** and type `#`.'))
      .toBe('Select Share and type #.');
  });
});
