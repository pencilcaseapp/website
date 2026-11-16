import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './contact-form';

async function fillIn() {
  const user = userEvent.setup();

  render(<ContactForm />, { wrapper: MemoryRouter });
  await user.type(
    screen.getByLabelText('Your e-mail address'),
    'ada@example.com',
  );
  await user.type(screen.getByLabelText('Your message'), 'Hello there');
  await user.click(screen.getByRole('button', { name: 'Send message' }));
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts to the app and thanks the sender', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('{"sent":true}'));
    vi.stubGlobal('fetch', fetch);

    await fillIn();

    expect(await screen.findByRole('status'))
      .toHaveTextContent('Thanks, your message is on its way.');

    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:3000/contact');
    expect(Object.fromEntries(init.body)).toEqual({
      email: 'ada@example.com',
      message: 'Hello there',
    });
    expect(screen.getByLabelText('Your message').closest('form'))
      .toHaveAttribute('inert');
  });

  it.each([
    ['refuses it', () => Promise.resolve(new Response('', { status: 429 }))],
    ['cannot be reached', () => Promise.reject(new TypeError('offline'))],
  ])('keeps the message when the app %s', async (_, answer) => {
    vi.stubGlobal('fetch', vi.fn(answer));

    await fillIn();

    expect(await screen.findByRole('alert'))
      .toHaveTextContent('Your message didn’t go through.');
    expect(screen.getByLabelText('Your message')).toHaveValue('Hello there');
  });
});
