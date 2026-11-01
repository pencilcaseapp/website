import { useEffect, useState, type RefObject } from 'react';

/**
 * Whether a horizontal scroller sits at its start or its end, and `step`,
 * which scrolls the next (1) or previous (-1) `item` to where the first
 * one starts, the padding of the scroller's list.
 */
export function useCarousel(
  ref: RefObject<HTMLElement | null>,
  item: string,
) {
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scroller;
      const atStart = scrollLeft <= 1;
      const atEnd = scrollLeft >= scrollWidth - clientWidth - 1;

      setEdges(edges => edges.atStart === atStart && edges.atEnd === atEnd
        ? edges
        : { atStart, atEnd });
    };

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);

    return () => {
      scroller.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [ref]);

  const step = (direction: 1 | -1) => {
    const scroller = ref.current;
    if (!scroller) return;

    const list = scroller.firstElementChild;
    const inset = list ? parseFloat(getComputedStyle(list).paddingLeft) : 0;
    const start = scroller.getBoundingClientRect().left + (inset || 0);
    const offsets = [...scroller.querySelectorAll(item)]
      .map(element => element.getBoundingClientRect().left - start);
    const offset = direction > 0
      ? offsets.find(offset => offset > 2)
      : offsets.reverse().find(offset => offset < -2);
    if (offset === undefined) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    scroller.scrollBy({
      left: offset,
      behavior: reduce.matches ? 'auto' : 'smooth',
    });
  };

  return { ...edges, step };
}
