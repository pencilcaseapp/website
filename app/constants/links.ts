export const APP_URL = 'https://docs.pencilcase.app';

export const NAV_ITEMS = [
  { href: '/#features', label: 'Features' },
  { href: '/#small-tech', label: 'Small tech' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
] as const;

/** The pills of the footer. Contact has no page yet. */
export const FOOTER_LINKS = [
  { href: '/blog', label: 'Blog', isExternal: false },
  {
    href: 'https://github.com/pencilcaseapp/',
    label: 'GitHub',
    isExternal: true,
  },
  { href: '#', label: 'Contact', isExternal: false },
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
  { href: '/imprint', label: 'Legal Notice' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '#', label: 'Cancel contract' },
  { href: '#', label: 'Withdraw contract' },
] as const;

export const CONTACT_EMAIL = 'inbox@pencilcase.app';

/** The contact form the legal texts point to. It has no page yet. */
export const CONTACT_FORM_HREF = '/contact';
