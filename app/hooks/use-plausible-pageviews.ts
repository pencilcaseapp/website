import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useConfig } from '~/hooks/use-config';

declare global {
  interface Window {
    plausible?: (event: string) => void;
  }
}

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
      window.plausible?.('pageview');
    }
  }, [analytics, pathname, hash]);
}
