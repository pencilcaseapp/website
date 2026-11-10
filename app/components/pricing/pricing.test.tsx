import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { FREE_DOCUMENT_LIMIT } from '~/constants/plans';
import { Pricing } from './pricing';

function getPlan(name: string) {
  return screen.getByRole('heading', { level: 3, name }).closest('article')!;
}

describe('Pricing', () => {
  it('shows the free and the pro plan', () => {
    render(<Pricing />, { wrapper: MemoryRouter });

    expect(within(getPlan('Free')).getByText('0 €')).toBeInTheDocument();
    expect(within(getPlan('Pro')).getByText('25 €')).toBeInTheDocument();
  });

  it('tells how many docs are free', () => {
    render(<Pricing />, { wrapper: MemoryRouter });

    expect(within(getPlan('Free'))
      .getByText(`${FREE_DOCUMENT_LIMIT} documents, everything else included.`))
      .toBeInTheDocument();
  });

  it('tells screen readers what the free plan leaves out', () => {
    render(<Pricing />, { wrapper: MemoryRouter });

    expect(within(getPlan('Free')).getAllByText('(not included)'))
      .toHaveLength(2);
    expect(within(getPlan('Pro')).queryByText('(not included)'))
      .not.toBeInTheDocument();
  });

  it('sends the free plan to the app and pro to the checkout', () => {
    render(<Pricing />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'Don’t buy' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
    expect(screen.getByRole('link', { name: 'Buy' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app/checkout');
  });

  it('answers the questions', () => {
    render(<Pricing />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { name: 'Questions? Answers.' }))
      .toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(6);
  });

  it('leads to the help section after the questions', () => {
    render(<Pricing />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'See all questions' }))
      .toHaveAttribute('href', '/help');
  });
});
