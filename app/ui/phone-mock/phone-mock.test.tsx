import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PhoneMock } from './phone-mock';

describe('PhoneMock', () => {
  it('shows the editor', () => {
    render(<PhoneMock />);

    expect(screen.getByRole('img', { name: /Lisbon in May/ }))
      .toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<PhoneMock className="w-60" />);

    expect(container).toMatchSnapshot();
  });
});
