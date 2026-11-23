import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useConfig } from '~/hooks/use-config';
import { trackEvent } from '~/utils/analytics';

/**
 * With hash-based routing Plausible only listens to `hashchange`, which a
 * client side navigation never fires, so the pageviews are sent from here:
 * one per path and section, `/#pricing` counting apart from `/`.
 */
export function usePlausiblePageviews() {
  const { analytics } = useConfig();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (analytics) {
      trackEvent('pageview');
    }
  }, [analytics, pathname, hash]);
}
