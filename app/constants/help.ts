export interface HelpArticle {
  slug: string;
  question: string;
  /** Slugs of the articles to suggest first under the article. */
  related?: string[];
  /** Describes something the app does not do yet, kept out of search. */
  draft?: boolean;
}

export interface HelpSection {
  id: string;
  title: string;
  articles: HelpArticle[];
}

/**
 * The help articles by section. The answer to each question is the
 * Markdown file of its slug in `app/content/help/`: the first paragraph
 * is the summary, the rest the body.
 */
export const HELP_SECTIONS: HelpSection[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    articles: [
      {
        slug: 'what-is-pencil-case',
        question: 'What is pencil case?',
        related: ['formatting-options', 'share-with-a-link', 'hosted-in-the-eu'],
      },
      {
        slug: 'create-an-account',
        question: 'How do I create an account?',
        related: ['sign-in', 'do-others-need-an-account'],
      },
      {
        slug: 'is-it-free',
        question: 'Is pencil case free?',
        related: ['what-does-pro-include', 'document-limit'],
      },
      {
        slug: 'contact-support',
        question: 'How do I reach you?',
      },
    ],
  },
  {
    id: 'writing',
    title: 'Writing',
    articles: [
      {
        slug: 'formatting-options',
        question: 'What can I format in a document?',
      },
      {
        slug: 'markdown-shortcuts',
        question: 'Can I write in Markdown?',
      },
      {
        slug: 'slash-menu',
        question: 'What does the slash menu do?',
      },
      {
        slug: 'add-images',
        question: 'How do I add images?',
      },
      {
        slug: 'document-title',
        question: 'How do I give a document a title?',
      },
      {
        slug: 'saving',
        question: 'Do I need to save?',
        related: ['lost-connection', 'simultaneous-editing'],
      },
      {
        slug: 'lost-connection',
        question: 'What happens if I lose my connection?',
      },
      {
        slug: 'version-history',
        question: 'Is there a version history?',
      },
      {
        slug: 'export-a-document',
        question: 'Can I export a document?',
      },
    ],
  },
  {
    id: 'documents',
    title: 'Documents',
    articles: [
      {
        slug: 'create-a-document',
        question: 'How do I create a document?',
        related: ['document-limit', 'document-title'],
      },
      {
        slug: 'document-limit',
        question: 'How many documents can I have?',
        related: ['what-does-pro-include', 'when-pro-ends'],
      },
      {
        slug: 'finding-documents',
        question: 'Where do I find my documents?',
        related: ['what-are-spaces', 'search-documents'],
      },
      {
        slug: 'search-documents',
        question: 'Can I search my documents?',
      },
      {
        slug: 'delete-a-document',
        question: 'How do I delete a document?',
        related: ['leave-a-shared-document'],
      },
      {
        slug: 'restore-a-document',
        question: 'How do I restore a deleted document?',
      },
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing and collaboration',
    articles: [
      {
        slug: 'share-with-a-link',
        question: 'How do I share a document with a link?',
        related: ['do-others-need-an-account'],
      },
      {
        slug: 'view-or-edit',
        question: 'Can I decide who can edit and who can only read?',
        related: ['invite-by-email'],
      },
      {
        slug: 'stop-sharing',
        question: 'How do I stop sharing a document?',
        related: ['change-or-remove-access'],
      },
      {
        slug: 'invite-by-email',
        question: 'How do I invite someone by e-mail?',
        related: ['what-does-pro-include', 'change-or-remove-access'],
      },
      {
        slug: 'change-or-remove-access',
        question: 'How do I change or remove someone’s access?',
        related: ['stop-sharing'],
      },
      {
        slug: 'do-others-need-an-account',
        question: 'Do the people I share with need an account?',
      },
      {
        slug: 'who-is-in-a-document',
        question: 'How do I see who else is in a document?',
        related: ['change-name'],
      },
      {
        slug: 'simultaneous-editing',
        question: 'What happens when two people edit the same line?',
      },
      {
        slug: 'leave-a-shared-document',
        question: 'How do I remove a shared document from my list?',
      },
      {
        slug: 'report-a-document',
        question: 'How do I report a shared document?',
      },
      {
        slug: 'comments',
        question: 'Can I comment on a document?',
      },
    ],
  },
  {
    id: 'spaces',
    title: 'Spaces',
    articles: [
      {
        slug: 'what-are-spaces',
        question: 'What are spaces?',
        draft: true,
      },
      {
        slug: 'share-a-space',
        question: 'Can I share a whole space?',
        draft: true,
      },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    articles: [
      {
        slug: 'sign-in',
        question: 'How do I sign in?',
        related: ['no-sign-in-code'],
      },
      {
        slug: 'no-sign-in-code',
        question: 'I did not get my sign-in code. What now?',
      },
      {
        slug: 'sign-out',
        question: 'How do I sign out?',
      },
      {
        slug: 'change-email',
        question: 'How do I change my e-mail address?',
      },
      {
        slug: 'change-name',
        question: 'How do I change my name?',
      },
      {
        slug: 'newsletter',
        question: 'How do I turn the newsletter on or off?',
      },
      {
        slug: 'delete-account',
        question: 'How do I delete my account?',
        draft: true,
      },
    ],
  },
  {
    id: 'subscription',
    title: 'Subscription',
    articles: [
      {
        slug: 'what-does-pro-include',
        question: 'What does Pro include?',
        related: ['is-it-free', 'invite-by-email'],
      },
      {
        slug: 'upgrade-to-pro',
        question: 'How do I upgrade to Pro?',
        related: ['who-handles-payment'],
      },
      {
        slug: 'who-handles-payment',
        question: 'Who handles my payment?',
      },
      {
        slug: 'invoices',
        question: 'Where do I find my invoices?',
      },
      {
        slug: 'cancel-subscription',
        question: 'How do I cancel my subscription?',
        related: ['when-pro-ends'],
      },
      {
        slug: 'when-pro-ends',
        question: 'What happens to my documents when Pro ends?',
        related: ['document-limit'],
      },
      {
        slug: 'failed-payment',
        question: 'What happens if a payment fails?',
      },
      {
        slug: 'refunds',
        question: 'Can I get a refund?',
      },
    ],
  },
  {
    id: 'devices',
    title: 'Apps and devices',
    articles: [
      {
        slug: 'phone-browser',
        question: 'Does pencil case work on my phone?',
        related: ['ios-and-android-apps'],
      },
      {
        slug: 'ios-and-android-apps',
        question: 'Is there an app for iOS and Android?',
        draft: true,
      },
      {
        slug: 'buy-pro-in-the-app',
        question: 'Can I buy Pro in the App Store or Google Play?',
        draft: true,
      },
      {
        slug: 'dark-mode',
        question: 'Is there a dark mode?',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy and data',
    articles: [
      {
        slug: 'hosted-in-the-eu',
        question: 'Where is my data stored?',
      },
      {
        slug: 'can-you-read-my-documents',
        question: 'Can you read my documents?',
        related: ['report-a-document'],
      },
      {
        slug: 'ai-training',
        question: 'Is my writing used to train AI?',
      },
      {
        slug: 'tracking',
        question: 'Do you track me or sell my data?',
      },
      {
        slug: 'open-source',
        question: 'Is pencil case open source?',
      },
      {
        slug: 'deleted-data',
        question: 'How long do you keep what I delete?',
        related: ['restore-a-document'],
      },
    ],
  },
];
