import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HandNote } from './hand-note';

describe('HandNote', () => {
  it('hides the scribble from screen readers', () => {
    render(<HandNote>drag me</HandNote>);

    expect(screen.getByText('drag me').parentElement)
      .toHaveAttribute('aria-hidden', 'true');
  });

  it('matches snapshot', () => {
    const { container } = render(<HandNote side="left">drag me</HandNote>);

    expect(container).toMatchSnapshot();
  });
});
