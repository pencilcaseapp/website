import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a button by default', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Get started</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Get started' }));

    expect(onClick).toHaveBeenCalled();
  });

  it('renders as a link', () => {
    render(<Button as="a" href="https://example.com">Get started</Button>);

    expect(screen.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', 'https://example.com');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Button as="a" href="/" colorLight="red-600" size="small">
        Sign in
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });
});
