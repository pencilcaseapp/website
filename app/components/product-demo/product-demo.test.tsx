import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProductDemo } from './product-demo';

afterEach(() => {
  vi.restoreAllMocks();
});

function mockReducedMotion() {
  vi.spyOn(window, 'matchMedia').mockReturnValue(
    { matches: true } as MediaQueryList,
  );
}

function getWindowState() {
  return screen.getByRole('slider').parentElement!.getAttribute('data-window');
}

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

  it('closes the window and brings it back from the dock', async () => {
    render(<ProductDemo />);

    await userEvent.click(screen.getByRole('button', { name: 'Close window' }));

    expect(getWindowState()).toBe('closed');
    expect(screen.getByRole('button', { name: 'Open pencil case' }))
      .toHaveFocus();

    await userEvent.click(
      screen.getByRole('button', { name: 'Open pencil case' }),
    );

    expect(getWindowState()).toBe('open');
  });

  it('minimises the window into the dock', async () => {
    mockReducedMotion();
    render(<ProductDemo />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Minimise window' }),
    );

    expect(getWindowState()).toBe('minimised');
  });

  it('zooms the narrowed window back to the full width', async () => {
    render(<ProductDemo />);

    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{Home}');
    await userEvent.click(screen.getByRole('button', { name: 'Zoom window' }));

    expect(slider).toHaveAttribute('aria-valuenow', '850');

    await userEvent.click(screen.getByRole('button', { name: 'Zoom window' }));

    expect(slider).toHaveAttribute('aria-valuenow', '300');
  });
});
