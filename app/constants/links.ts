export const APP_URL = 'https://docs.pencilcase.app';

/** Signs the visitor in if needed and opens the checkout of pro. */
export const CHECKOUT_URL = `${APP_URL}/checkout`;

export const GITHUB_HREF = 'https://github.com/pencilcaseapp/';

export const NAV_ITEMS = [
  { href: '/#features', label: 'Features' },
  { href: '/#small-tech', label: 'Small tech' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
] as const;

/** The pills of the footer. */
export const FOOTER_LINKS = [
  { href: '/blog', label: 'Blog', isExternal: false },
  { href: '/help', label: 'Help', isExternal: false },
  {
    href: GITHUB_HREF,
    label: 'GitHub',
    isExternal: true,
  },
  { href: '/contact', label: 'Contact', isExternal: false },
  {
    href: 'https://mastodon.social/@pencilcaseapp',
    label: 'Mastodon',
    isExternal: true,
  },
  {
    href: 'https://bsky.app/profile/pencilcaseapp.bsky.social',
    label: 'Bluesky',
    isExternal: true,
  },
] as const;

/** Cancelling and withdrawing have no page yet. */
export const LEGAL_LINKS = [
  { href: '/legal-notice', label: 'legal notice' },
  { href: '/privacy', label: 'privacy policy' },
  { href: '/terms', label: 'terms of use' },
  { href: '#', label: 'cancel contract' },
  { href: '#', label: 'withdraw contract' },
] as const;

export const CONTACT_EMAIL = 'inbox@pencilcase.app';

/**
 * Where the contact form posts: the app, whose Bunny Shield rate limits
 * it. The local app in dev, so trying the form never mails our inbox.
 */
export const CONTACT_ENDPOINT = import.meta.env.DEV
  ? 'http://localhost:3000/contact'
  : `${APP_URL}/contact`;

/** The contact form the legal texts point to. */
export const CONTACT_FORM_HREF = '/contact';

/** The help section, with its form at the end. */
export const HELP_HREF = '/help';
