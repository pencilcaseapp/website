import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { APP_UPGRADE_HINT, APPS } from '~/constants/apps';
import { Apps } from './apps';

describe('Apps', () => {
  it('is the section the page can link to', () => {
    const { container } = render(<Apps />);

    expect(container.querySelector('section')).toHaveAttribute('id', 'apps');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Download the app, and write your docs anywhere.',
    );
  });

  it('links to both stores in a new tab', () => {
    render(<Apps />);

    for (const app of Object.values(APPS)) {
      const link = screen.getByRole('link', { name: app.label });

      expect(link).toHaveAttribute('href', app.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveTextContent(app.store);
    }
  });

  it('says where Pro is sold', () => {
    render(<Apps />);

    expect(screen.getByText(APP_UPGRADE_HINT)).toBeInTheDocument();
  });

  it('shows the editor and the menu of the app', () => {
    render(<Apps />);

    expect(screen.getByRole('img', { name: /a shared list/ }))
      .toHaveAttribute('src', '/apps/editor.webp');
    expect(screen.getByRole('img', { name: /the menu/ }))
      .toHaveAttribute('src', '/apps/menu.webp');
  });
});
