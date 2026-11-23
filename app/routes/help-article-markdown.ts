import { href } from 'react-router';
import { SITE_URL } from '~/constants/links';
import {
  findHelpArticle,
  getHelpArticleMarkdown,
} from '~/utils/help.server';
import type { Route } from './+types/help-article-markdown';

/**
 * An article as Markdown, for reading it outside the page. Search engines
 * are pointed to the page instead.
 */
export function loader({ params }: Route.LoaderArgs) {
  const found = findHelpArticle(params.slug);

  if (!found) {
    throw new Response('Not Found', { status: 404 });
  }

  return new Response(getHelpArticleMarkdown(found.article), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Link': `<${SITE_URL}${href('/help/:slug', { slug: params.slug })}>; rel="canonical"`,
    },
  });
}
