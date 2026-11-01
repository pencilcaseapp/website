import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './container';

describe('Container', () => {
  it('matches snapshot', () => {
    const { container } = render(<Container className="pt-12">Hi</Container>);

    expect(container).toMatchSnapshot();
  });
});
