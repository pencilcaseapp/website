import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FloatingNav } from './floating-nav';

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  window.dispatchEvent(new Event('scroll'));
}

afterEach(() => scrollTo(0));

describe('FloatingNav', () => {
  it('stays hidden at the top of the page', () => {
    const { container } = render(<FloatingNav />);

    const bar = container.firstElementChild;
    expect(bar).not.toHaveAttribute('data-shown');
    expect(bar).toHaveAttribute('inert');
  });

  it('drops in once the header has scrolled away', () => {
    const { container } = render(<FloatingNav />);

    act(() => scrollTo(200));

    const bar = container.firstElementChild;
    expect(bar).toHaveAttribute('data-shown');
    expect(bar).not.toHaveAttribute('inert');
    expect(screen.getByRole('link', { name: 'Sign in' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('marks the section on screen', () => {
    const section = document.createElement('section');
    section.id = 'pricing';
    section.getBoundingClientRect = () => ({ top: 0 }) as DOMRect;
    document.body.append(section);

    render(<FloatingNav />);
    act(() => scrollTo(200));

    expect(screen.getByRole('link', { name: 'Pricing' }))
      .toHaveAttribute('aria-current', 'true');

    section.remove();
  });
});
