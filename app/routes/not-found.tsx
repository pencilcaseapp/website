import { data } from 'react-router';
import { NotFound } from '~/components/not-found/not-found';

/**
 * Every address no other route has. A route of its own rather than the
 * root's error boundary, which React Router would draw without running
 * the root loader, so the page would miss the config and the analytics.
 */
export function loader() {
  return data(null, { status: 404 });
}

export default function NotFoundPage() {
  return <NotFound />;
}
