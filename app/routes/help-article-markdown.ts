import {
  findHelpArticle,
  getHelpArticleMarkdown,
} from '~/utils/help.server';
import type { Route } from './+types/help-article-markdown';

/** An article as Markdown, for reading it outside the page. */
export function loader({ params }: Route.LoaderArgs) {
  const found = findHelpArticle(params.slug);

  if (!found) {
    throw new Response('Not Found', { status: 404 });
  }

  return new Response(getHelpArticleMarkdown(found.article), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
