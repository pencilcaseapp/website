import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useStackedPanels } from './use-stacked-panels';

function mockViewTimeline(supported: boolean) {
  vi.stubGlobal('CSS', { supports: () => supported });
}

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue(
    { matches } as MediaQueryList,
  );
}

function renderStack(tops: number[]) {
  const section = document.createElement('section');
  const panels = tops.map((top) => {
    const panel = document.createElement('article');
    panel.className = 'stack-panel';
    panel.getBoundingClientRect = () => ({ top }) as DOMRect;
    section.append(panel);
    return panel;
  });

  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0);
    return 0;
  });
  Object.defineProperty(window, 'innerHeight', {
    value: 800,
    configurable: true,
  });

  renderHook(() => {
    const ref = useStackedPanels<HTMLElement>();
    ref.current = section;
    return ref;
  });

  return panels;
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('useStackedPanels', () => {
  it('tells each panel how far the next one covers it', () => {
    mockViewTimeline(false);
    mockReducedMotion(false);

    const [first, second, last] = renderStack([-800, 200, 900]);

    expect(first.style.getPropertyValue('--leave')).toBe('0.750');
    expect(second.style.getPropertyValue('--leave')).toBe('0.000');
    expect(last.style.getPropertyValue('--leave')).toBe('');
    expect(first).toHaveAttribute('data-leave-fallback');
    expect(last).not.toHaveAttribute('data-leave-fallback');
  });

  it('leaves the panels alone for reduced motion', () => {
    mockViewTimeline(false);
    mockReducedMotion(true);

    const [first] = renderStack([0, 200]);

    expect(first.style.getPropertyValue('--leave')).toBe('');
    expect(first).not.toHaveAttribute('data-leave-fallback');
  });

  it('leaves the motion to CSS where view timelines exist', () => {
    mockViewTimeline(true);
    mockReducedMotion(false);

    const [first] = renderStack([0, 200]);

    expect(first.style.getPropertyValue('--leave')).toBe('');
    expect(first).not.toHaveAttribute('data-leave-fallback');
  });
});
