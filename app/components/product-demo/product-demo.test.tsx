import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductDemo } from './product-demo';

describe('ProductDemo', () => {
  it('starts at the full width', () => {
    render(<ProductDemo />);

    const slider = screen.getByRole('slider', { name: 'Width of the preview' });

    expect(slider).toHaveAttribute('aria-valuenow', '850');
    expect(slider).toHaveAttribute('aria-valuetext', 'Desktop');
  });

  it('narrows the window with the arrow keys', async () => {
    render(<ProductDemo />);

    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowLeft}{Shift>}{ArrowLeft}{/Shift}');

    expect(slider).toHaveAttribute('aria-valuenow', '730');
    expect(slider).toHaveAttribute('aria-valuetext', 'Tablet');
    expect(screen.getByText('edit on tablet')).toBeInTheDocument();
  });

  it('jumps between a phone and the full width', async () => {
    render(<ProductDemo />);

    const slider = screen.getByRole('slider');
    slider.focus();

    await userEvent.keyboard('{Home}');
    expect(slider).toHaveAttribute('aria-valuenow', '300');
    expect(slider).toHaveAttribute('aria-valuetext', 'Phone');
    expect(screen.getByText('collab on phone')).toBeInTheDocument();

    await userEvent.keyboard('{End}');
    expect(slider).toHaveAttribute('aria-valuenow', '850');
  });

  it('never grows past the full width', async () => {
    render(<ProductDemo />);

    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(slider).toHaveAttribute('aria-valuenow', '850');
  });
});
