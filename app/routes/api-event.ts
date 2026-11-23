import type { Route } from './+types/api-event';

const PLAUSIBLE_EVENT_URL = 'https://plausible.io/api/event';

/**
 * Passes the tracker's events on to Plausible (`ANALYTICS_ENDPOINT`). The
 * visitor's address and browser go along, as Plausible needs them for its
 * daily identifier and the country.
 */
export async function action({ request }: Route.ActionArgs) {
  const headers = new Headers({ 'Content-Type': 'text/plain' });

  for (const name of ['User-Agent', 'X-Forwarded-For']) {
    const value = request.headers.get(name);

    if (value) {
      headers.set(name, value);
    }
  }

  const response = await fetch(PLAUSIBLE_EVENT_URL, {
    method: 'POST',
    headers,
    body: await request.text(),
  });

  return new Response(response.body, {
    status: response.status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export function loader() {
  return new Response(null, { status: 405, headers: { Allow: 'POST' } });
}
