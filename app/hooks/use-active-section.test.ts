import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useActiveSection } from './use-active-section';

function addSection(id: string, top: number) {
  const section = document.createElement('section');
  section.id = id;
  section.getBoundingClientRect = () => ({ top }) as DOMRect;
  document.body.append(section);
  return section;
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('useActiveSection', () => {
  it('is null while no section has reached the top third', () => {
    addSection('features', 2000);

    const { result } = renderHook(() =>
      useActiveSection(['#features', '/blog']));

    expect(result.current).toBeNull();
  });

  it('picks the last section that reached the top third', () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      frames.push(callback));
    addSection('features', -400);
    const pricing = addSection('pricing', 2000);

    const { result } = renderHook(() =>
      useActiveSection(['#features', '#pricing', '/blog']));

    expect(result.current).toBe('#features');

    pricing.getBoundingClientRect = () => ({ top: 100 }) as DOMRect;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('#features');
    expect(frames).toHaveLength(1);

    act(() => frames[0](0));

    expect(result.current).toBe('#pricing');
  });

  it('finds the section of a link from another page', () => {
    addSection('pricing', -400);

    const { result } = renderHook(() =>
      useActiveSection(['/#pricing', '/blog']));

    expect(result.current).toBe('/#pricing');
  });
});
