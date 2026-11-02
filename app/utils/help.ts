import {
  HELP_SECTIONS,
  type HelpArticle,
  type HelpSection,
} from '~/constants/help';
import { HELP_HREF } from '~/constants/links';

const MAX_RELATED_ARTICLES = 6;

export const helpArticleHref = (article: HelpArticle) =>
  `${HELP_HREF}/${article.slug}`;

export const helpArticleMarkdownHref = (article: HelpArticle) =>
  `${helpArticleHref(article)}.md`;

export function findHelpArticle(
  slug: string,
): { article: HelpArticle; section: HelpSection } | undefined {
  for (const section of HELP_SECTIONS) {
    const article = section.articles.find(item => item.slug === slug);

    if (article) {
      return { article, section };
    }
  }
}

/**
 * The articles to read next: the ones the article names first, then the
 * rest of its section. A draft is only suggested from another draft.
 */
export function relatedHelpArticles(
  article: HelpArticle,
  section: HelpSection,
): HelpArticle[] {
  const named = (article.related ?? []).flatMap((slug) => {
    const found = findHelpArticle(slug);

    return found ? [found.article] : [];
  });

  return [...named, ...section.articles]
    .filter((item, index, all) =>
      all.findIndex(other => other.slug === item.slug) === index)
    .filter(item => item.slug !== article.slug)
    .filter(item => article.draft || !item.draft)
    .slice(0, MAX_RELATED_ARTICLES);
}
