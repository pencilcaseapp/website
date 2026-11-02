import type { Nodes, Root } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { parse } from 'yaml';
import {
  HELP_SECTIONS,
  type HelpArticle,
  type HelpArticleLink,
  type HelpSection,
} from '~/constants/help';

const FILES = import.meta.glob<string>('../content/help/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const MAX_RELATED_ARTICLES = 6;

function parseArticle(path: string, file: string): HelpArticle {
  const slug = path.slice(path.lastIndexOf('/') + 1, -'.md'.length);
  const [frontmatter, yaml = ''] = FRONTMATTER.exec(file) ?? [];
  const { question, section, order, related, draft } = parse(yaml) ?? {};

  if (
    typeof question !== 'string'
    || !HELP_SECTIONS.some(({ id }) => id === section)
    || typeof order !== 'number'
  ) {
    throw new Error(
      `${path} needs a question, a known section and an order`,
    );
  }

  const [summary, ...body] = file
    .slice(frontmatter?.length ?? 0)
    .trim()
    .split(/\n{2,}/);

  return {
    slug,
    question,
    section,
    order,
    ...related && { related },
    ...draft && { draft: true },
    summary,
    body: body.join('\n\n'),
  };
}

export const HELP_ARTICLES = Object.entries(FILES)
  .map(([path, file]) => parseArticle(path, file))
  .sort((a, b) => a.order - b.order);

const toLink = ({ slug, question, draft }: HelpArticle): HelpArticleLink => ({
  slug,
  question,
  ...draft && { draft },
});

/** Every section with the questions of its articles, in order. */
export const getHelpSections = (): HelpSection[] =>
  HELP_SECTIONS.map(section => ({
    ...section,
    articles: HELP_ARTICLES
      .filter(article => article.section === section.id)
      .map(toLink),
  }));

export function findHelpArticle(slug: string) {
  const article = HELP_ARTICLES.find(item => item.slug === slug);
  const section = HELP_SECTIONS.find(({ id }) => id === article?.section);

  return article && section ? { article, section } : undefined;
}

/**
 * The articles to read next: the ones the article names first, then the
 * rest of its section. A draft is only suggested from another draft.
 */
export function relatedHelpArticles(article: HelpArticle): HelpArticleLink[] {
  const named = (article.related ?? []).flatMap((slug) => {
    const found = findHelpArticle(slug);

    return found ? [found.article] : [];
  });
  const sameSection = HELP_ARTICLES
    .filter(item => item.section === article.section);

  return [...new Set([...named, ...sameSection])]
    .filter(item => item !== article)
    .filter(item => article.draft || !item.draft)
    .slice(0, MAX_RELATED_ARTICLES)
    .map(toLink);
}

/** The article as one Markdown document, its question as the heading. */
export const getHelpArticleMarkdown = (article: HelpArticle) =>
  [`# ${article.question}`, article.summary, article.body]
    .filter(Boolean)
    .join('\n\n') + '\n';

function withoutPositions<T extends Nodes>(node: T): T {
  delete node.position;

  if ('children' in node) {
    node.children.forEach(withoutPositions);
  }

  return node;
}

/**
 * Markdown as the tree the page draws, parsed here so the parser stays
 * on the server.
 */
export const parseHelpMarkdown = (text: string): Root =>
  withoutPositions(fromMarkdown(text));

/** What the article page draws, or nothing for an unknown slug. */
export function getHelpArticlePage(slug: string) {
  const found = findHelpArticle(slug);

  if (!found) {
    return undefined;
  }

  const { article, section } = found;

  return {
    article: {
      slug: article.slug,
      question: article.question,
      ...article.draft && { draft: true },
    },
    summary: parseHelpMarkdown(article.summary),
    body: parseHelpMarkdown(article.body),
    section,
    related: relatedHelpArticles(article),
  };
}

/** The text of some Markdown without its marks, for a description. */
export const stripMarkdown = (text: string) =>
  text.replace(
    /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\([^)]+\)/g,
    '$1$2$3',
  );
