import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BarTint } from './bar-tint';

describe('BarTint', () => {
  it('matches snapshot', () => {
    const { container } = render(<BarTint className="bg-pca-yellow-500" />);

    expect(container).toMatchSnapshot();
  });
});
