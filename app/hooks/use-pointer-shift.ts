import { type RefObject, useEffect } from 'react';

const FOLLOWS_POINTER
  = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * Sets `--pointer-shift` on the element to how far the pointer is to its
 * left or right, from `-maxShift` to `maxShift` pixels across half the
 * window. Only with a mouse, and not when motion is reduced.
 */
export function usePointerShift(
  ref: RefObject<HTMLElement | SVGElement | null>,
  maxShift: number,
) {
  useEffect(() => {
    if (!window.matchMedia(FOLLOWS_POINTER).matches) {
      return;
    }

    const follow = (event: PointerEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const { left, width } = element.getBoundingClientRect();
      const offset
        = (event.clientX - (left + width / 2)) / (window.innerWidth / 2);
      const shift = Math.max(-1, Math.min(1, offset)) * maxShift;

      element.style.setProperty('--pointer-shift', `${shift}px`);
    };

    window.addEventListener('pointermove', follow);

    return () => window.removeEventListener('pointermove', follow);
  }, [ref, maxShift]);
}
