import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { CancelContract, WithdrawContract } from './contract-page';

describe('CancelContract', () => {
  it('titles the page and shows the form', () => {
    render(<CancelContract />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Cancel contract.');
    expect(screen.getByRole('button', { name: 'Cancel now' }))
      .toBeInTheDocument();
  });
});

describe('WithdrawContract', () => {
  it('titles the page and shows the form', () => {
    render(<WithdrawContract />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Withdraw contract.');
    expect(screen.getByRole('button', { name: 'Confirm withdrawal' }))
      .toBeInTheDocument();
  });
});
