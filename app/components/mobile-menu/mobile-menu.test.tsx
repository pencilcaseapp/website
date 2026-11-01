import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MobileMenu } from './mobile-menu';

describe('MobileMenu', () => {
  it('keeps the navigation closed at first', () => {
    render(<MobileMenu />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('opens the navigation', async () => {
    render(<MobileMenu />);

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

    const dialog = await screen.findByRole('dialog', { name: 'Menu' });
    expect(dialog).toHaveTextContent('FeaturesSmall techPricingBlog');
  });

  it('closes the navigation', async () => {
    render(<MobileMenu />);

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await userEvent.click(
      await screen.findByRole('button', { name: 'Close' }),
    );

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes once a section is picked', async () => {
    render(<MobileMenu />);

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await userEvent.click(
      await screen.findByRole('link', { name: 'Pricing' }),
    );

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
