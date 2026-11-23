import { SITE_URL } from '~/constants/links';

/** Every crawler is welcome, the sitemap lists what there is. */
export function loader() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
