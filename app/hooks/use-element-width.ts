import { useEffect, useState, type RefObject } from 'react';

/**
 * The element's `clientWidth`, kept up to date by a ResizeObserver.
 * Until it has been measured (and on the server) it is `fallback`.
 */
export function useElementWidth(
  ref: RefObject<HTMLElement | null>,
  fallback: number,
) {
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => setWidth(element.clientWidth));
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return width;
}
