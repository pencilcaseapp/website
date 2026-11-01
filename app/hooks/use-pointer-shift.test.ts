import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePointerShift } from './use-pointer-shift';

function mockPointer(matches: boolean) {
  vi.spyOn(window, 'matchMedia')
    .mockReturnValue({ matches } as MediaQueryList);
}

function movePointerTo(clientX: number) {
  window.dispatchEvent(new PointerEvent('pointermove', { clientX }));
}

afterEach(() => vi.restoreAllMocks());

describe('usePointerShift', () => {
  it('follows the pointer, up to the maximum shift', () => {
    mockPointer(true);
    const element = document.createElement('div');
    renderHook(() => usePointerShift({ current: element }, 52));

    movePointerTo(window.innerWidth / 4);

    expect(element.style.getPropertyValue('--pointer-shift')).toBe('26px');

    movePointerTo(window.innerWidth * 2);

    expect(element.style.getPropertyValue('--pointer-shift')).toBe('52px');
  });

  it('stays put without a mouse or with reduced motion', () => {
    mockPointer(false);
    const element = document.createElement('div');
    renderHook(() => usePointerShift({ current: element }, 52));

    movePointerTo(100);

    expect(element.style.getPropertyValue('--pointer-shift')).toBe('');
  });
});
