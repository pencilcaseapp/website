import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CancelContractForm,
  WithdrawContractForm,
} from './contract-form';

function stubFetch() {
  const fetch = vi.fn().mockResolvedValue(new Response('{"sent":true}'));
  vi.stubGlobal('fetch', fetch);

  return fetch;
}

async function fillInCustomer(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Your name'), 'Ada Lovelace');
  await user.type(
    screen.getByLabelText('E-mail address of your account'),
    'ada@example.com',
  );
}

describe('CancelContractForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('asks only for what § 312k BGB lists', () => {
    render(<CancelContractForm />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText('Your name')).toBeRequired();
    expect(screen.getByLabelText('E-mail address of your account'))
      .toBeRequired();
    expect(screen.getByLabelText('Ordinary, with notice')).toBeChecked();
    expect(screen.getByLabelText('End the contract on')).not.toBeRequired();
    expect(screen.queryByLabelText(/Reason/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel now' }))
      .toHaveAttribute('type', 'submit');
  });

  it('posts an ordinary cancellation and confirms it', async () => {
    const fetch = stubFetch();
    const user = userEvent.setup();

    render(<CancelContractForm />, { wrapper: MemoryRouter });
    await fillInCustomer(user);
    await user.click(screen.getByRole('button', { name: 'Cancel now' }));

    expect(await screen.findByRole('status'))
      .toHaveTextContent('Your cancellation is on its way.');

    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:3000/contact');
    expect(Object.fromEntries(init.body)).toEqual({
      form: 'cancellation',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      cancellationType: 'ordinary',
      endsOn: '',
    });
  });

  it('asks for a reason when cancelling for good cause', async () => {
    const fetch = stubFetch();
    const user = userEvent.setup();

    render(<CancelContractForm />, { wrapper: MemoryRouter });
    await fillInCustomer(user);
    await user.click(screen.getByLabelText('Extraordinary, for good cause'));
    await user.type(
      screen.getByLabelText('Reason for the extraordinary cancellation'),
      'Down for weeks',
    );
    await user.click(screen.getByRole('button', { name: 'Cancel now' }));
    await screen.findByRole('status');

    expect(Object.fromEntries(fetch.mock.calls[0][1].body)).toMatchObject({
      cancellationType: 'extraordinary',
      reason: 'Down for weeks',
    });
  });

  it('keeps the details when the app refuses them', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response('', { status: 429 }),
    ));
    const user = userEvent.setup();

    render(<CancelContractForm />, { wrapper: MemoryRouter });
    await fillInCustomer(user);
    await user.click(screen.getByRole('button', { name: 'Cancel now' }));

    expect(await screen.findByRole('alert'))
      .toHaveTextContent('Your cancellation didn’t go through.');
    expect(screen.getByLabelText('Your name')).toHaveValue('Ada Lovelace');
  });
});

describe('WithdrawContractForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the withdrawal without a reason and confirms it', async () => {
    const fetch = stubFetch();
    const user = userEvent.setup();

    render(<WithdrawContractForm />, { wrapper: MemoryRouter });
    await fillInCustomer(user);
    await user.click(
      screen.getByRole('button', { name: 'Confirm withdrawal' }),
    );

    expect(await screen.findByRole('status'))
      .toHaveTextContent('Your withdrawal is on its way.');
    expect(Object.fromEntries(fetch.mock.calls[0][1].body)).toEqual({
      form: 'withdrawal',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
  });
});
