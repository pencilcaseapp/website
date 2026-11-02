export interface HelpSectionInfo {
  id: string;
  title: string;
}

/** The sections of the help, in order. An article names its own. */
export const HELP_SECTIONS: HelpSectionInfo[] = [
  { id: 'getting-started', title: 'Getting started' },
  { id: 'writing', title: 'Writing' },
  { id: 'documents', title: 'Documents' },
  { id: 'sharing', title: 'Sharing and collaboration' },
  { id: 'spaces', title: 'Spaces' },
  { id: 'account', title: 'Account' },
  { id: 'subscription', title: 'Subscription' },
  { id: 'devices', title: 'Apps and devices' },
  { id: 'privacy', title: 'Privacy and data' },
];

/** What a list of articles shows of one. */
export interface HelpArticleLink {
  slug: string;
  question: string;
  /** Describes something the app does not do yet, kept out of search. */
  draft?: boolean;
}

/**
 * An article: the frontmatter of its file in `app/content/help/`, and the
 * answer below it, split into its first paragraph and the rest.
 */
export interface HelpArticle extends HelpArticleLink {
  /** The id of its section. */
  section: string;
  /** The place of the article in its section. */
  order: number;
  /** Slugs of the articles to suggest first under the article. */
  related?: string[];
  summary: string;
  body: string;
}

export interface HelpSection extends HelpSectionInfo {
  articles: HelpArticleLink[];
}
