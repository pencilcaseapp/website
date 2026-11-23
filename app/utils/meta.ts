import type { MetaDescriptor } from 'react-router';
import { SITE_URL } from '~/constants/links';
import { PLANS } from '~/constants/plans';
import { QUESTIONS } from '~/constants/questions';

export const SITE_NAME = 'pencil case';

/** The picture messengers and social networks show for a shared link. */
export const SHARE_IMAGE = {
  url: `${SITE_URL}/share-image.png`,
  width: 1200,
  height: 630,
  alt: 'pencil case. Docs, dead simple.',
};

export interface PageMetaOptions {
  title: string;
  description: string;
  /** The page's path, `/` for the startpage. */
  path: string;
}

/**
 * The title, description, canonical URL and the tags a shared link is
 * previewed with, the same for every page.
 */
export function pageMeta({
  title,
  description,
  path,
}: PageMetaOptions): MetaDescriptor[] {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: SHARE_IMAGE.url },
    { property: 'og:image:width', content: String(SHARE_IMAGE.width) },
    { property: 'og:image:height', content: String(SHARE_IMAGE.height) },
    { property: 'og:image:alt', content: SHARE_IMAGE.alt },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}

/**
 * What search engines can show beyond the link: the app with its plans,
 * and the questions the pricing section answers.
 */
export const homeStructuredData = (): MetaDescriptor[] => [
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': SITE_NAME,
      'url': SITE_URL,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Web',
      'offers': PLANS.map(plan => ({
        '@type': 'Offer',
        'name': plan.name,
        'price': Number.parseFloat(plan.price),
        'priceCurrency': 'EUR',
      })),
    },
  },
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': QUESTIONS.map(({ question, answer }) => ({
        '@type': 'Question',
        'name': question,
        'acceptedAnswer': { '@type': 'Answer', 'text': answer },
      })),
    },
  },
];
