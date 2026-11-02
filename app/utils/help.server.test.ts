import { describe, expect, it } from 'vitest';
import { HELP_SECTIONS } from '~/constants/help';
import { CONTACT_EMAIL } from '~/constants/links';
import { PLANS } from '~/constants/plans';
import { helpArticleHref, helpArticleMarkdownHref } from './help';
import {
  findHelpArticle,
  getHelpArticleMarkdown,
  getHelpSections,
  HELP_ARTICLES,
  relatedHelpArticles,
  stripMarkdown,
} from './help.server';

const PRO_PRICE = PLANS.find(plan => plan.id === 'pro')!.price;

function getArticle(slug: string) {
  const found = findHelpArticle(slug);

  if (!found) {
    throw new Error(`No help article ${slug}`);
  }

  return found.article;
}

const slugsOf = (articles: { slug: string }[]) =>
  articles.map(article => article.slug);

describe('help articles', () => {
  it('reads the frontmatter and splits the answer', () => {
    const article = getArticle('create-an-account');

    expect(article).toMatchObject({
      question: 'How do I create an account?',
      section: 'getting-started',
      order: 2,
      related: ['sign-in', 'do-others-need-an-account'],
    });
    expect(article.summary)
      .toMatch(/^Enter your e-mail address on the \[sign in/);
    expect(article.body).toMatch(/^1\. Go to \[Sign in\]/);
    expect(article.body).toMatch(/16 years old to create an account\.$/);
    expect(getArticle('saving').body).toBe('');
    expect(getArticle('what-are-spaces').draft).toBe(true);
  });

  it('gives each article of a section its own place', () => {
    for (const section of HELP_SECTIONS) {
      const orders = HELP_ARTICLES
        .filter(article => article.section === section.id)
        .map(article => article.order);

      expect(new Set(orders).size, section.id).toBe(orders.length);
    }
  });

  it('lists the sections with their questions in order', () => {
    const sections = getHelpSections();

    expect(sections.map(section => section.id))
      .toEqual(HELP_SECTIONS.map(section => section.id));
    expect(slugsOf(sections[0].articles)).toEqual([
      'what-is-pencil-case',
      'create-an-account',
      'is-it-free',
      'contact-support',
    ]);
    expect(sections.flatMap(section => section.articles))
      .toHaveLength(HELP_ARTICLES.length);
  });

  it('only points to articles that exist', () => {
    for (const article of HELP_ARTICLES) {
      const linked = [
        ...`${article.summary}\n${article.body}`
          .matchAll(/\]\(\/help\/([^)#]+)\)/g),
      ].map(([, slug]) => slug);

      for (const slug of [...article.related ?? [], ...linked]) {
        expect(findHelpArticle(slug), `${article.slug} → ${slug}`)
          .toBeDefined();
      }
    }
  });

  it('names the current price and address', () => {
    for (const article of HELP_ARTICLES) {
      const text = getHelpArticleMarkdown(article);

      for (const [price] of text.matchAll(/\d+ €/g)) {
        expect(price, article.slug).toBe(PRO_PRICE);
      }

      for (const [address] of text.matchAll(/[\w.-]+@[\w.-]+\.\w+/g)) {
        expect(address, article.slug).toBe(CONTACT_EMAIL);
      }
    }
  });

  it('suggests the named articles first, then the rest of the section', () => {
    expect(slugsOf(relatedHelpArticles(getArticle('share-with-a-link'))))
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
    expect(slugsOf(relatedHelpArticles(getArticle('finding-documents'))))
      .not.toContain('what-are-spaces');
    expect(slugsOf(relatedHelpArticles(getArticle('what-are-spaces'))))
      .toEqual(['share-a-space']);
  });

  it('links to the article and its Markdown', () => {
    const article = getArticle('sign-in');

    expect(helpArticleHref(article)).toBe('/help/sign-in');
    expect(helpArticleMarkdownHref(article)).toBe('/help/sign-in.md');
  });

  it('writes the article as Markdown with its question', () => {
    expect(getHelpArticleMarkdown(getArticle('sign-in')))
      .toMatch(/^# How do I sign in\?\n\nEnter your e-mail address/);
    expect(getHelpArticleMarkdown(getArticle('saving')))
      .toMatch(/every change is saved by itself, a moment after you make it\.\n$/);
  });

  it('strips the marks for a description', () => {
    expect(stripMarkdown('Select **Share**, type `#`, see [this](/x).'))
      .toBe('Select Share, type #, see this.');
  });
});
