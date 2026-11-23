export const APP_URL = 'https://docs.pencilcase.app';

/** Signs the visitor in if needed and opens the checkout of pro. */
export const CHECKOUT_URL = `${APP_URL}/checkout`;

export const GITHUB_HREF = 'https://github.com/pencilcaseapp/';

export const NAV_ITEMS = [
  { href: '/#features', label: 'Features' },
  { href: '/#small-tech', label: 'Small tech' },
  { href: '/#pricing', label: 'Pricing' },
] as const;

/** The pills of the footer. */
export const FOOTER_LINKS = [
  { href: '/help', label: 'Help', isExternal: false },
  { href: '/contact', label: 'Contact', isExternal: false },
  {
    href: 'https://plausible.io/pencilcase.app',
    label: 'Stats',
    isExternal: true,
  },
  {
    href: GITHUB_HREF,
    label: 'GitHub',
    isExternal: true,
  },
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

export const LEGAL_LINKS = [
  { href: '/legal-notice', label: 'legal notice' },
  { href: '/privacy', label: 'privacy policy' },
  { href: '/terms', label: 'terms of use' },
  { href: '/cancel-contract', label: 'cancel contract' },
  { href: '/withdraw-contract', label: 'withdraw contract' },
] as const;

export const CONTACT_EMAIL = 'inbox@pencilcase.app';

/** The contact form the legal texts point to. */
export const CONTACT_FORM_HREF = '/contact';

/** The help section, with its form at the end. */
export const HELP_HREF = '/help';

/** The website's own address, the one canonical URLs and the sitemap use. */
export const SITE_URL = 'https://pencilcase.app';
