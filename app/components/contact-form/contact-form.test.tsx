import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm } from './contact-form';

function renderForm(sent: boolean) {
  const action = vi.fn(async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    return { sent, fields: Object.fromEntries(formData) };
  });
  const Stub = createRoutesStub([
    { path: '/', Component: ContactForm },
    { path: '/contact', action },
  ]);

  render(<Stub />);

  return action;
}

async function fillIn() {
  const user = userEvent.setup();

  await user.type(
    screen.getByLabelText('Your e-mail address'),
    'ada@example.com',
  );
  await user.type(screen.getByLabelText('Your message'), 'Hello there');
  await user.click(screen.getByRole('button', { name: 'Send message' }));
}

describe('ContactForm', () => {
  it('posts to the contact route and thanks the sender', async () => {
    const action = renderForm(true);

    await fillIn();

    expect(await screen.findByRole('status'))
      .toHaveTextContent('Thanks, your message is on its way.');
    expect(await action.mock.results[0].value).toMatchObject({
      fields: { email: 'ada@example.com', message: 'Hello there' },
    });
    expect(screen.queryByLabelText('Your message')).not.toBeInTheDocument();
  });

  it('keeps the message when it did not go through', async () => {
    renderForm(false);

    await fillIn();

    expect(await screen.findByRole('alert'))
      .toHaveTextContent('Your message didn’t go through.');
    expect(screen.getByLabelText('Your message')).toHaveValue('Hello there');
  });
});
