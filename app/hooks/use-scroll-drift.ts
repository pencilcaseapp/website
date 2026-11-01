import { useEffect, useRef } from 'react';

const DRIFT_DISTANCE = 600;
const MAX_DRIFT_REM = 4;

function hasScrollTimeline() {
  return typeof CSS !== 'undefined'
    && CSS.supports('animation-timeline', 'scroll()');
}

/**
 * Moves the element down as the page scrolls, up to 4rem over the first
 * 600px, so it trails behind the content scrolling past it. Browsers with
 * scroll-driven animations do this in CSS (`.scroll-drift`), which keeps it
 * in step with the page; the scroll listener is only the fallback.
 */
export function useScrollDrift<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (
      !element
      || hasScrollTimeline()
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, window.scrollY / DRIFT_DISTANCE);
      element.style.translate = `0 ${(progress * MAX_DRIFT_REM).toFixed(3)}rem`;
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
