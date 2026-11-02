import type { HelpArticle } from '~/constants/help';

const FILES = import.meta.glob<string>('../content/help/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const CONTENT = new Map(Object.entries(FILES).map(([path, text]) => [
  path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
  text.trim(),
]));

export const HELP_CONTENT_SLUGS = [...CONTENT.keys()];

/** The answer of an article: its first paragraph and the rest. */
export function getHelpAnswer(article: HelpArticle) {
  const text = CONTENT.get(article.slug) ?? '';
  const [summary, ...body] = text.split(/\n{2,}/);

  return { summary, body: body.join('\n\n') };
}

/** The article as one Markdown document, its question as the heading. */
export const getHelpArticleMarkdown = (article: HelpArticle) =>
  `# ${article.question}\n\n${CONTENT.get(article.slug) ?? ''}\n`;

/** The text of some Markdown without its marks, for a description. */
export const stripMarkdown = (text: string) =>
  text.replace(
    /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\([^)]+\)/g,
    '$1$2$3',
  );
