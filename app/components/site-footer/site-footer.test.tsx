import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('links to the help, the stats, the code and the social accounts', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'Help' }))
      .toHaveAttribute('href', '/help');
    expect(screen.getByRole('link', { name: 'Contact' }))
      .toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'Stats' }))
      .toHaveAttribute('href', 'https://plausible.io/pencilcase.app');
    expect(screen.getByRole('link', { name: 'GitHub' }))
      .toHaveAttribute('href', 'https://github.com/pencilcaseapp/');
    expect(screen.getByRole('link', { name: 'Mastodon' }))
      .toHaveAttribute('href', 'https://mastodon.social/@pencilcaseapp');
    expect(screen.getByRole('link', { name: 'Bluesky' }))
      .toHaveAttribute(
        'href',
        'https://bsky.app/profile/pencilcaseapp.bsky.social',
      );
  });

  it('opens the other sites in a new tab', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'Stats' }))
      .toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'GitHub' }))
      .toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'Help' }))
      .not.toHaveAttribute('target');
  });

  it('lists the help, contact, stats and code links first', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(screen.getAllByRole('link')
      .slice(0, 4)
      .map(link => link.textContent))
      .toEqual(['Help', 'Contact', 'Stats', 'GitHub']);
  });

  it('leads to the app', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('lists the legal texts', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(within(screen.getByRole('navigation', { name: 'Legal' }))
      .getAllByRole('link')
      .map(link => link.textContent))
      .toEqual([
        'legal notice',
        'privacy policy',
        'terms of use',
        'cancel contract',
        'withdraw contract',
      ]);
  });

  it('leads to the legal texts', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'legal notice' }))
      .toHaveAttribute('href', '/legal-notice');
    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'terms of use' }))
      .toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'cancel contract' }))
      .toHaveAttribute('href', '/cancel-contract');
    expect(screen.getByRole('link', { name: 'withdraw contract' }))
      .toHaveAttribute('href', '/withdraw-contract');
  });

  it('shows the e-mail address', () => {
    render(<SiteFooter />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'inbox@pencilcase.app' }))
      .toHaveAttribute('href', 'mailto:inbox@pencilcase.app');
  });
});
