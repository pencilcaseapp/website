import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
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
});

describe('useActiveSection', () => {
  it('is null while no section has reached the top third', () => {
    addSection('features', 2000);

    const { result } = renderHook(() =>
      useActiveSection(['#features', '/blog']));

    expect(result.current).toBeNull();
  });

  it('picks the last section that reached the top third', () => {
    addSection('features', -400);
    const pricing = addSection('pricing', 2000);

    const { result } = renderHook(() =>
      useActiveSection(['#features', '#pricing', '/blog']));

    expect(result.current).toBe('#features');

    pricing.getBoundingClientRect = () => ({ top: 100 }) as DOMRect;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('#pricing');
  });
});
