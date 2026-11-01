import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCarousel } from './use-carousel';

function createScroller() {
  const scroller = document.createElement('div');
  Object.defineProperty(scroller, 'scrollWidth', { value: 1000 });
  Object.defineProperty(scroller, 'clientWidth', { value: 400 });

  return scroller;
}

function scrollTo(scroller: HTMLElement, left: number) {
  scroller.scrollLeft = left;
  scroller.dispatchEvent(new Event('scroll'));
}

describe('useCarousel', () => {
  it('starts at the start', () => {
    const ref = { current: createScroller() };
    const { result } = renderHook(() => useCarousel(ref, 'li'));

    expect(result.current).toMatchObject({ atStart: true, atEnd: false });
  });

  it('knows when it reached the end', () => {
    const ref = { current: createScroller() };
    const { result } = renderHook(() => useCarousel(ref, 'li'));

    act(() => scrollTo(ref.current, 600));

    expect(result.current).toMatchObject({ atStart: false, atEnd: true });
  });
});
