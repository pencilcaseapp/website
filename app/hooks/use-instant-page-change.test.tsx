import { act, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { useInstantPageChange } from './use-instant-page-change';

function renderRouter() {
  const Page = () => {
    useInstantPageChange();

    return null;
  };
  const router = createMemoryRouter([
    { path: '/', Component: Page },
    { path: '/terms', Component: Page },
  ]);
  render(<RouterProvider router={router} />);

  return router;
}

const scrollBehavior = () => document.documentElement.style.scrollBehavior;

describe('useInstantPageChange', () => {
  it('jumps on the first page', () => {
    renderRouter();

    expect(scrollBehavior()).toBe('auto');
  });

  it('glides to a section', async () => {
    const router = renderRouter();

    await act(() => router.navigate('/#pricing'));

    expect(scrollBehavior()).toBe('');
  });

  it('jumps to a new page', async () => {
    const router = renderRouter();

    await act(() => router.navigate('/#pricing'));
    await act(() => router.navigate('/terms'));

    expect(scrollBehavior()).toBe('auto');
  });

  it('jumps back and forward', async () => {
    const router = renderRouter();

    await act(() => router.navigate('/terms'));
    await act(() => router.navigate('/#pricing'));
    await act(() => router.navigate(-1));

    expect(scrollBehavior()).toBe('auto');
  });
});
