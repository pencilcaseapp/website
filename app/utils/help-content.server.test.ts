import { describe, expect, it } from 'vitest';
import { HELP_SECTIONS } from '~/constants/help';
import { CONTACT_EMAIL } from '~/constants/links';
import { PLANS } from '~/constants/plans';
import { findHelpArticle } from './help';
import {
  getHelpAnswer,
  getHelpArticleMarkdown,
  HELP_CONTENT_SLUGS,
  stripMarkdown,
} from './help-content.server';

const ARTICLES = HELP_SECTIONS.flatMap(section => section.articles);
const PRO_PRICE = PLANS.find(plan => plan.id === 'pro')!.price;

function getArticle(slug: string) {
  return findHelpArticle(slug)!.article;
}

describe('help content', () => {
  it('has one Markdown file per article', () => {
    expect([...HELP_CONTENT_SLUGS].sort())
      .toEqual(ARTICLES.map(article => article.slug).sort());
  });

  it('only links to help articles that exist', () => {
    for (const article of ARTICLES) {
      const { summary, body } = getHelpAnswer(article);

      for (const [, slug] of `${summary}\n${body}`
        .matchAll(/\]\(\/help\/([^)#]+)\)/g)) {
        expect(findHelpArticle(slug), `${article.slug} → ${slug}`)
          .toBeDefined();
      }
    }
  });

  it('names the current price and address', () => {
    for (const article of ARTICLES) {
      const text = getHelpArticleMarkdown(article);

      for (const [price] of text.matchAll(/\d+ €/g)) {
        expect(price, article.slug).toBe(PRO_PRICE);
      }

      for (const [address] of text.matchAll(/[\w.-]+@[\w.-]+\.\w+/g)) {
        expect(address, article.slug).toBe(CONTACT_EMAIL);
      }
    }
  });

  it('splits the answer into its summary and the rest', () => {
    const { summary, body } = getHelpAnswer(getArticle('create-an-account'));

    expect(summary).toMatch(/^Enter your e-mail address on the \[sign in/);
    expect(body).toMatch(/^1\. Go to \[Sign in\]/);
    expect(body).toMatch(/16 years old to create an account\.$/);
    expect(getHelpAnswer(getArticle('saving')).body).toBe('');
  });

  it('writes the article as Markdown with its question', () => {
    expect(getHelpArticleMarkdown(getArticle('sign-in')))
      .toMatch(/^# How do I sign in\?\n\nEnter your e-mail address/);
  });

  it('strips the marks for a description', () => {
    expect(stripMarkdown('Select **Share**, type `#`, see [this](/x).'))
      .toBe('Select Share, type #, see this.');
  });
});
