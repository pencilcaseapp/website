import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScrolledOut } from './use-scrolled-out';

let report: IntersectionObserverCallback;

function renderScrolledOut() {
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) {
      report = callback;
    }

    observe() {}
    disconnect() {}
  });

  return renderHook(() => {
    const [ref, isOut] = useScrolledOut<HTMLDivElement>();
    ref.current ??= document.createElement('div');
    return isOut;
  });
}

function reportBottom(bottom: number) {
  const entry = { isIntersecting: bottom > 0, boundingClientRect: { bottom } };

  act(() => report(
    [entry as IntersectionObserverEntry],
    {} as IntersectionObserver,
  ));
}

afterEach(() => vi.unstubAllGlobals());

describe('useScrolledOut', () => {
  it('is false while the element is in the viewport', () => {
    const { result } = renderScrolledOut();

    reportBottom(120);

    expect(result.current).toBe(false);
  });

  it('stays false for an element below the viewport', () => {
    const { result } = renderScrolledOut();

    act(() => report(
      [{
        isIntersecting: false,
        boundingClientRect: { bottom: 2000 },
      } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ));

    expect(result.current).toBe(false);
  });

  it('turns true once the element left past the top', () => {
    const { result } = renderScrolledOut();

    reportBottom(-1);

    expect(result.current).toBe(true);
  });
});
