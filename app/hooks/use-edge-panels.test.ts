import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useEdgePanels } from './use-edge-panels';

function addStack(...tops: number[]) {
  const section = document.createElement('section');
  const panels = tops.map((top) => {
    const panel = document.createElement('article');
    panel.className = 'stack-panel';
    panel.getBoundingClientRect = () =>
      ({ top, bottom: top + window.innerHeight }) as DOMRect;
    section.append(panel);
    return panel;
  });
  document.body.append(section);
  return { ref: { current: section }, panels };
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('useEdgePanels', () => {
  it('is empty while no panel reaches an edge', () => {
    const { ref } = addStack(2000, 3000);

    const { result } = renderHook(() => useEdgePanels(ref));

    expect(result.current).toEqual({ top: null, bottom: null });
  });

  it('picks the panel on top at each edge', () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      frames.push(callback));
    const { ref, panels } = addStack(0, 2000);

    const { result } = renderHook(() => useEdgePanels(ref));

    expect(result.current).toEqual({ top: 0, bottom: 0 });

    panels[1].getBoundingClientRect = () =>
      ({ top: 300, bottom: 300 + window.innerHeight }) as DOMRect;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      frames[0](0);
    });

    expect(result.current).toEqual({ top: 0, bottom: 1 });
  });
});
