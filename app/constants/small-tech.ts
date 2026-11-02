export interface Principle {
  id: 'eu' | 'privacy' | 'independent' | 'ai';
  /** One entry per line of the headline. */
  headline: string[];
  body: string;
  /** The panel's background and the tilt of its top edge. */
  background: string;
  tilt: string;
  /** Text and button are dark, for the light panels. */
  dark: boolean;
  /** A second, coloured layer under the drawing. */
  fill?: { art: string; color: string };
}

export const PRINCIPLES: Principle[] = [
  {
    id: 'eu',
    headline: ['Hosted', 'in the EU'],
    body: 'Your documents live on European servers, run by a European '
      + 'provider with no US company behind it. Every service we rely on, '
      + 'like payments and emails, comes from a European company too. We '
      + 'want to support European businesses and keep the money in Europe.',
    background: 'bg-pca-blue-700',
    tilt: '-rotate-[0.6deg]',
    dark: false,
    fill: { art: '/small-tech/eu-fill.webp', color: 'bg-pca-yellow-500' },
  },
  {
    id: 'privacy',
    headline: ['Privacy'],
    body: 'No tracking, no ads, no selling your data, and your writing is '
      + 'never used to train AI. Our website stats are anonymous and open '
      + 'for anyone to see. No secrets!',
    background: 'bg-pca-grey-900',
    tilt: 'rotate-[0.5deg]',
    dark: false,
  },
  {
    id: 'independent',
    headline: ['Small on', 'purpose'],
    body: 'No investors, nobody to answer to but you. Your subscription pays '
      + 'for a small team and the servers, not for growing a profit margin. '
      + 'Our code is open source, so you can see exactly what we build.',
    background: 'bg-pca-pop-pink',
    tilt: 'rotate-[0.4deg]',
    dark: true,
  },
  {
    id: 'ai',
    headline: ['AI?'],
    body: 'Our goal is to build the best editor for people who write with '
      + 'other people. No AI agents, and no AI added just to look modern. '
      + 'Nobody knows where AI is heading, but if we ever add an AI feature, '
      + 'it will be off until you turn it on.',
    background: 'bg-pca-pop-yellow',
    tilt: '-rotate-[0.4deg]',
    dark: true,
  },
];
