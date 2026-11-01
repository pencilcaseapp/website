import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScrollDrift } from './use-scroll-drift';

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue(
    { matches } as MediaQueryList,
  );
}

function renderDrift() {
  const element = document.createElement('div');

  renderHook(() => {
    const ref = useScrollDrift<HTMLDivElement>();
    ref.current = element;
    return ref;
  });

  return element;
}

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  window.dispatchEvent(new Event('scroll'));
}

afterEach(() => {
  vi.restoreAllMocks();
  scrollTo(0);
});

describe('useScrollDrift', () => {
  it('drifts with the scroll position', () => {
    mockReducedMotion(false);
    const element = renderDrift();

    scrollTo(300);

    expect(element.style.translate).toBe('0 2.000rem');
  });

  it('stops drifting after 600px', () => {
    mockReducedMotion(false);
    const element = renderDrift();

    scrollTo(1200);

    expect(element.style.translate).toBe('0 4.000rem');
  });

  it('stays put for reduced motion', () => {
    mockReducedMotion(true);
    const element = renderDrift();

    scrollTo(300);

    expect(element.style.translate).toBe('');
  });
});
