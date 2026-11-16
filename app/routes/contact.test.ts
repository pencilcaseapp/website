import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendContactMessage } from '~/utils/contact.server';
import { action } from './contact';

vi.mock('~/utils/contact.server', async importOriginal => ({
  ...await importOriginal<typeof import('~/utils/contact.server')>(),
  sendContactMessage: vi.fn(),
}));

type ActionArgs = Parameters<typeof action>[0];

function post(fields: Record<string, string>) {
  const request = new Request('https://pencilcase.app/contact', {
    method: 'POST',
    body: new URLSearchParams(fields),
  });

  return action({ request } as ActionArgs);
}

describe('contact action', () => {
  afterEach(() => {
    vi.mocked(sendContactMessage).mockReset();
  });

  it('sends the message', async () => {
    expect(await post({ email: 'ada@example.com', message: 'Hello' }))
      .toEqual({ sent: true });
    expect(sendContactMessage).toHaveBeenCalledWith({
      email: 'ada@example.com',
      message: 'Hello',
    });
  });

  it('refuses a malformed message without sending it', async () => {
    expect(await post({ email: 'ada', message: 'Hello' })).toMatchObject({
      data: { sent: false },
      init: { status: 400 },
    });
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it('reports a failed send', async () => {
    vi.mocked(sendContactMessage).mockRejectedValue(new Error('down'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(await post({ email: 'ada@example.com', message: 'Hello' }))
      .toMatchObject({ data: { sent: false }, init: { status: 502 } });
  });
});
