/** The store listings don't exist yet: the links are placeholders. */
export const APPS = {
  ios: {
    store: 'App Store',
    label: 'Download on the App Store',
    href: 'https://apps.apple.com/app/pencil-case/id0000000000',
  },
  android: {
    store: 'Google Play',
    label: 'Get it on Google Play',
    href: 'https://play.google.com/store/apps/details?id=app.pencilcase',
  },
} as const;

/** Pro is sold on the website only, never through the stores. */
export const APP_UPGRADE_HINT
  = 'Upgrading to Pro only works on the web, not in the apps.';
