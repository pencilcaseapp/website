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

  it('spreads every card out when one is opened', async () => {
    render(<Features />);

    await userEvent.click(
      screen.getByRole('button', { name: /^Open Write/ }),
    );

    expect(screen.getAllByRole('button', { name: /^Close /, expanded: true }))
      .toHaveLength(5);
    expect(screen.getAllByRole('button', { name: 'Turn the card over' }))
      .toHaveLength(5);
  });

  it('only lifts a card under the pointer while they are in the fan', async () => {
    render(<Features />);

    const card = getCard('Write');

    expect(card).toHaveClass('lg:hover:-translate-y-2');

    await userEvent.click(
      screen.getByRole('button', { name: /^Open Write/ }),
    );

    expect(card).not.toHaveClass('lg:hover:-translate-y-2');
  });

  it('turns the cards over one by one', async () => {
    render(<Features />);

    await userEvent.click(
      screen.getByRole('button', { name: /^Open Write/ }),
    );
    const [write, share] = screen
      .getAllByRole('button', { name: 'Turn the card over' });
    await userEvent.click(write);
    await userEvent.click(share);

    expect(screen.getAllByRole('button', { name: 'Turn the card back' }))
      .toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Turn the card over' }))
      .toHaveLength(3);
  });

  it('gathers the cards on their fronts again', async () => {
    render(<Features />);

    await userEvent.click(
      screen.getByRole('button', { name: /^Open Write/ }),
    );
    await userEvent.click(
      screen.getAllByRole('button', { name: 'Turn the card over' })[0],
    );
    await userEvent.click(
      screen.getByRole('button', { name: /^Close Share/, expanded: true }),
    );

    expect(screen.getAllByRole('button', { name: /^Open /, expanded: false }))
      .toHaveLength(5);
    expect(screen.queryByRole('button', { name: 'Turn the card back' }))
      .not.toBeInTheDocument();
  });

  it('never lets the card row scroll vertically', () => {
    render(<Features />);

    expect(screen.getByRole('region', {
      name: 'The five features, side by side',
    })).toHaveClass('overflow-x-auto', 'overflow-y-hidden');
  });
});
