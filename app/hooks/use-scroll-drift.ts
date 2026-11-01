import { useEffect, useRef } from 'react';

const DRIFT_DISTANCE = 600;
const MAX_DRIFT_REM = 4;

/**
 * Moves the element down as the page scrolls, up to 4rem over the first
 * 600px, so it trails behind the content scrolling past it.
 */
export function useScrollDrift<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (
      !element
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let translate = '';
    const update = () => {
      const progress = Math.min(1, window.scrollY / DRIFT_DISTANCE);
      const next = `0 ${(progress * MAX_DRIFT_REM).toFixed(3)}rem`;

      if (next !== translate) {
        translate = next;
        element.style.translate = next;
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, []);

  return ref;
}
