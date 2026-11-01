import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Accordion } from './accordion';

const ITEMS = [
  { id: 'one', title: 'First question', content: 'First answer' },
  { id: 'two', title: 'Second question', content: 'Second answer' },
];

describe('Accordion', () => {
  it('starts with every answer closed', () => {
    render(<Accordion items={ITEMS} />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('opens several answers at once', async () => {
    render(<Accordion items={ITEMS} />);

    const first = screen.getByRole('button', { name: 'First question' });
    const second = screen.getByRole('button', { name: 'Second question' });
    await userEvent.click(first);
    await userEvent.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First answer')).toBeVisible();
  });

  it('puts the titles in headings of the given level', () => {
    render(<Accordion items={ITEMS} headingLevel="h4" />);

    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { container } = render(<Accordion items={ITEMS} />);

    expect(container).toMatchSnapshot();
  });
});
