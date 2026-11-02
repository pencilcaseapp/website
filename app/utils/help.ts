import type { HelpArticleLink } from '~/constants/help';
import { HELP_HREF } from '~/constants/links';

export const helpArticleHref = (article: HelpArticleLink) =>
  `${HELP_HREF}/${article.slug}`;

export const helpArticleMarkdownHref = (article: HelpArticleLink) =>
  `${helpArticleHref(article)}.md`;
