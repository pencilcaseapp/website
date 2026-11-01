import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useScrolledPast } from './use-scrolled-past';

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  window.dispatchEvent(new Event('scroll'));
}

afterEach(() => scrollTo(0));

describe('useScrolledPast', () => {
  it('is false at the top of the page', () => {
    const { result } = renderHook(() => useScrolledPast(140));

    expect(result.current).toBe(false);
  });

  it('turns true once the page scrolled past the offset', () => {
    const { result } = renderHook(() => useScrolledPast(140));

    act(() => scrollTo(141));

    expect(result.current).toBe(true);
  });
});
