import { describe, expect, it } from 'vitest';
import { loader as markdownLoader } from './help-article-markdown';
import { loader as articleLoader, meta } from './help-article';

type ArticleArgs = Parameters<typeof articleLoader>[0];
type MarkdownArgs = Parameters<typeof markdownLoader>[0];

const articleArgs = (slug: string) => ({ params: { slug } }) as ArticleArgs;
const markdownArgs = (slug: string) => ({ params: { slug } }) as MarkdownArgs;

describe('help routes', () => {
  it('loads an article and 404s an unknown one', () => {
    expect(articleLoader(articleArgs('sign-in')).article.slug)
      .toBe('sign-in');
    expect(() => articleLoader(articleArgs('nope'))).toThrow();
  });

  it('keeps drafts out of search engines', () => {
    const tags = (slug: string) => meta({
      loaderData: articleLoader(articleArgs(slug)),
    } as Parameters<typeof meta>[0]);

    expect(tags('sign-in')).toContainEqual({
      title: 'How do I sign in? – pencil case',
    });
    expect(tags('sign-in'))
      .not.toContainEqual({ name: 'robots', content: 'noindex' });
    expect(tags('what-are-spaces'))
      .toContainEqual({ name: 'robots', content: 'noindex' });
  });

  it('serves an article as Markdown', async () => {
    const response = markdownLoader(markdownArgs('sign-in'));

    expect(response.headers.get('Content-Type'))
      .toBe('text/markdown; charset=utf-8');
    expect(await response.text()).toMatch(/^# How do I sign in\?\n\n/);
  });

  it('404s the Markdown of an unknown article', () => {
    expect(() => markdownLoader(markdownArgs('nope')))
      .toThrow(expect.objectContaining({ status: 404 }));
  });
});
