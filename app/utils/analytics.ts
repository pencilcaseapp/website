import { init, track } from '@plausible-analytics/tracker';

/**
 * Where the tracker posts its events: a route of our own, which passes
 * them on to Plausible, so ad blockers that block plausible.io let them
 * through.
 */
export const ANALYTICS_ENDPOINT = '/api/event';

let started = false;
let queue: string[] = [];

/**
 * Starts Plausible. Events tracked before, by a page whose effects ran
 * first, are sent now.
 */
export function startAnalytics() {
  if (started) {
    return;
  }

  init({
    domain: 'pencilcase.app',
    endpoint: ANALYTICS_ENDPOINT,
    hashBasedRouting: true,
    autoCapturePageviews: false,
    outboundLinks: true,
    fileDownloads: true,
    formSubmissions: true,
  });
  started = true;
  queue.forEach(name => track(name, {}));
  queue = [];
}

export function trackEvent(name: string) {
  if (started) {
    track(name, {});
  }
  else {
    queue.push(name);
  }
}

/**
 * The classes that have Plausible send the custom event `name`, with
 * `props`, when the element is clicked (its tagged events). Plausible
 * sends it with `keepalive`, so a link may leave the page right away.
 */
export function plausibleEvent(
  name: string,
  props: Record<string, string> = {},
) {
  return Object.entries({ name, ...props })
    .map(([key, value]) =>
      `plausible-event-${key}=${value.replaceAll(' ', '+')}`)
    .join(' ');
}
