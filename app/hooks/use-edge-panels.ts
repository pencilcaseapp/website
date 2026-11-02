import { useEffect, useState, type RefObject } from 'react';

export interface EdgePanels {
  top: number | null;
  bottom: number | null;
}

/**
 * Which of the `.stack-panel`s inside `ref` covers the top and the bottom
 * edge of the screen, as an index, or `null` where none does. A later panel
 * lies on top of an earlier one, so it wins.
 */
export function useEdgePanels(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState<EdgePanels>({ top: null, bottom: null });

  useEffect(() => {
    const panels = [
      ...ref.current?.querySelectorAll<HTMLElement>('.stack-panel') ?? [],
    ];

    const update = () => {
      const height = window.innerHeight;
      let top: number | null = null;
      let bottom: number | null = null;

      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();

        if (rect.top <= 0 && rect.bottom > 0) {
          top = index;
        }

        if (rect.top < height && rect.bottom >= height) {
          bottom = index;
        }
      });

      setEdges(current => current.top === top && current.bottom === bottom
        ? current
        : { top, bottom });
    };

    let frame = 0;
    const onScroll = () => {
      frame ||= requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);

  return edges;
}
