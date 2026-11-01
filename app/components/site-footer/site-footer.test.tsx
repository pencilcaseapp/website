import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('links to the blog, the code and the social accounts', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: 'Blog' }))
      .toHaveAttribute('href', '/blog');
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
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: 'GitHub' }))
      .toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'Blog' }))
      .not.toHaveAttribute('target');
  });

  it('leads to the app', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('lists the legal texts', () => {
    render(<SiteFooter />);

    expect(within(screen.getByRole('navigation', { name: 'Legal' }))
      .getAllByRole('link')
      .map(link => link.textContent))
      .toEqual([
        'Legal notice',
        'Privacy policy',
        'Terms of use',
        'Cancel contract',
        'Withdraw contract',
      ]);
  });

  it('shows the e-mail address', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: 'inbox@pencilcase.app' }))
      .toHaveAttribute('href', 'mailto:inbox@pencilcase.app');
  });
});
