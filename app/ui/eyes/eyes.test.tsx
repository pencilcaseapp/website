import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Eyes } from './eyes';

describe('Eyes', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Eyes />);

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('clips each eye with its own path', () => {
    const { container } = render(<Eyes />);
    const ids = [...container.querySelectorAll('clipPath')].map(path => path.id);

    expect(new Set(ids).size).toBe(2);
    container.querySelectorAll('g').forEach((group, index) => {
      expect(group).toHaveAttribute('clip-path', `url(#${ids[index]})`);
    });
  });
});
