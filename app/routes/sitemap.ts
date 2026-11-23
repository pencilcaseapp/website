import { href } from 'react-router';
import { LEGAL_LINKS, SITE_URL } from '~/constants/links';
import { HELP_ARTICLES } from '~/utils/help.server';

/** Every page there is to find, the help articles included. */
const getSitemapPaths = () => [
  '/',
  '/help',
  ...HELP_ARTICLES.map(({ slug }) => href('/help/:slug', { slug })),
  '/contact',
  ...LEGAL_LINKS.map(link => link.href),
];

export function loader() {
  const urls = getSitemapPaths()
    .map(path => `  <url><loc>${SITE_URL}${path === '/' ? '' : path}</loc></url>`)
    .join('\n');

  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + `${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
