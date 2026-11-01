import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EditorMock } from './editor-mock';

describe('EditorMock', () => {
  it('describes the picture for screen readers', () => {
    render(<EditorMock />);

    expect(screen.getByRole('img', { name: /Lisbon in May/ }))
      .toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<EditorMock />);

    expect(container).toMatchSnapshot();
  });
});
