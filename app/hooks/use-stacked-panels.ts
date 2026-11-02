import { useEffect, useRef } from 'react';

const PANEL = '.stack-panel';

function hasViewTimeline() {
  return typeof CSS !== 'undefined'
    && CSS.supports('animation-timeline', 'view()');
}

/**
 * Drives the sticky panels of a `.stack`. Every panel learns its own height
 * (`--panel-height`), so one taller than the screen sticks by its bottom
 * edge instead of hiding it. Browsers with scroll-driven animations tip each
 * panel back in CSS as the next one covers it; elsewhere this hands the
 * panel how far it is covered (`--leave`, 0 to 1) and marks it
 * `data-leave-fallback`.
 */
export function useStackedPanels<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const panels = [
      ...ref.current?.querySelectorAll<HTMLElement>(PANEL) ?? [],
    ];
    const observer = new ResizeObserver(() => {
      panels.forEach(panel => panel.style.setProperty(
        '--panel-height',
        `${panel.offsetHeight}px`,
      ));
    });

    panels.forEach(panel => observer.observe(panel));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const panels = [
      ...ref.current?.querySelectorAll<HTMLElement>(PANEL) ?? [],
    ];

    if (
      panels.length < 2
      || hasViewTimeline()
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const leaving = panels.slice(0, -1);
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      leaving.forEach((panel, index) => {
        const next = panels[index + 1].getBoundingClientRect().top;
        const leave = Math.min(1, Math.max(0, (height - next) / height));
        panel.style.setProperty('--leave', leave.toFixed(3));
      });
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    leaving.forEach(panel => panel.dataset.leaveFallback = '');
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
