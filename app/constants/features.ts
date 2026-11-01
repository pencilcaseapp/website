export interface Feature {
  id: string;
  title: string;
  lead: string;
  points: string[];
  soon?: boolean;
}

export const FEATURES: Feature[] = [
  {
    id: 'write',
    title: 'Write',
    lead: 'No distractions, just a simple editor with everything you need.',
    points: [
      'Headings, lists, checklists, quotes',
      'Images',
      'Markdown support',
      'Works in your mobile browser',
    ],
  },
  {
    id: 'share',
    title: 'Share',
    lead: 'Send a link and let anyone read what you’ve written.',
    points: [
      'Create a public link',
      'Control link access (view or edit)',
      'Invite friends via email',
    ],
  },
  {
    id: 'collaborate',
    title: 'Collaborate',
    lead: 'Edit the same doc together, in real time.',
    points: ['Live cursors with avatars', 'No account needed to join a doc'],
  },
  {
    id: 'organize',
    title: 'Organize',
    lead: 'Group your docs into your own spaces, the way you like.',
    points: [
      'Your own spaces to structure your docs',
      'Share spaces with others',
    ],
  },
  {
    id: 'comment',
    title: 'Comment',
    lead: 'Sharpen your ideas with feedback from others.',
    points: ['Create comments', 'Reply in threads', 'Resolve comments'],
    soon: true,
  },
];
