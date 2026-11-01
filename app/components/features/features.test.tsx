import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Features } from './features';

function getCard(name: string) {
  return screen.getByRole('button', { name: new RegExp(`^Open ${name}`) })
    .closest('li')!;
}

describe('Features', () => {
  it('lists the five features', () => {
    render(<Features />);

    expect(screen.getAllByRole('button', { name: /^Open / })
      .map(button => button.getAttribute('aria-label')))
      .toEqual([
        'Open Write, feature 1 of 5',
        'Open Share, feature 2 of 5',
        'Open Collaborate, feature 3 of 5',
        'Open Organize, feature 4 of 5',
        'Open Comment, feature 5 of 5',
      ]);
  });

  it('marks the feature that is not built yet', () => {
    render(<Features />);

    expect(within(getCard('Comment')).getAllByText('Coming soon'))
      .not.toHaveLength(0);
  });

  it('opens a card and turns it over to what it does', async () => {
    render(<Features />);

    const card = getCard('Share');
    const open = within(card)
      .getByRole('button', { name: 'Open Share, feature 2 of 5' });
    await userEvent.click(open);

    const back = within(card).getByText('Invite friends via email')
      .closest('.fan-face')!;

    expect(open).toHaveAttribute('aria-expanded', 'true');
    expect(back).toHaveAttribute('inert');

    await userEvent.click(
      within(card).getByRole('button', { name: 'Turn the card over' }),
    );

    expect(back).not.toHaveAttribute('inert');
    // Safari draws the turned away face's button through the card.
    expect(card.querySelector('[aria-label="Turn the card over"]'))
      .toHaveClass('opacity-0');
    expect(within(card).getByRole('button', { name: 'Turn the card back' }))
      .not.toHaveClass('opacity-0');
    expect(open.closest('.fan-face')).toHaveAttribute('inert');
    expect(within(card).getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('closes the open card when another one opens', async () => {
    render(<Features />);

    await userEvent.click(
      screen.getByRole('button', { name: /^Open Write/ }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: /^Open Share/ }),
    );

    expect(screen.getByRole('button', { name: /^Open Write/ }))
      .toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: /^Close Share/, expanded: true }))
      .toBeInTheDocument();
  });

  it('never lets the card row scroll vertically', () => {
    render(<Features />);

    expect(screen.getByRole('region', {
      name: 'The five features, side by side',
    })).toHaveClass('overflow-x-auto', 'overflow-y-hidden');
  });
});
