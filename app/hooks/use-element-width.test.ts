import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useElementWidth } from './use-element-width';

let notify: () => void = () => {};
const disconnect = vi.fn();

vi.stubGlobal('ResizeObserver', class {
  constructor(callback: () => void) {
    notify = callback;
  }

  observe() {}
  disconnect = disconnect;
});

afterEach(() => {
  vi.clearAllMocks();
});

function elementOfWidth(width: number) {
  const element = document.createElement('div');
  Object.defineProperty(element, 'clientWidth', { value: width });
  return { current: element };
}

describe('useElementWidth', () => {
  it('returns the fallback until the element is measured', () => {
    const ref = elementOfWidth(500);
    const { result } = renderHook(() => useElementWidth(ref, 850));

    expect(result.current).toBe(850);
  });

  it('returns the measured width', () => {
    const ref = elementOfWidth(500);
    const { result } = renderHook(() => useElementWidth(ref, 850));

    act(() => notify());

    expect(result.current).toBe(500);
  });

  it('stops observing on unmount', () => {
    const ref = elementOfWidth(500);
    const { unmount } = renderHook(() => useElementWidth(ref, 850));

    unmount();

    expect(disconnect).toHaveBeenCalled();
  });
});
