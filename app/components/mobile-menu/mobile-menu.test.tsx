import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MobileMenu } from './mobile-menu';

afterEach(() => window.history.replaceState(null, '', '/'));

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

  it('tints Safari\'s bars dark while open', async () => {
    render(<MobileMenu />);

    expect(document.querySelector('.bar-tint')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

    await screen.findByRole('dialog', { name: 'Menu' });
    expect(document.querySelectorAll('.bar-tint.bg-pca-grey-900'))
      .toHaveLength(2);
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

  it('scrolls to the picked section once closed', async () => {
    const section = document.createElement('section');
    section.id = 'pricing';
    section.scrollIntoView = vi.fn();
    document.body.append(section);
    render(<MobileMenu />);

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await userEvent.click(
      await screen.findByRole('link', { name: 'Pricing' }),
    );

    await waitFor(() => expect(section.scrollIntoView).toHaveBeenCalled());
    expect(window.location.hash).toBe('#pricing');
    section.remove();
  });
});
