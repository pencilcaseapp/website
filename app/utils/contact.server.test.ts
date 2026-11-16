import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendLettermintEmail } from '~/clients/lettermint.server';
import { parseContactMessage, sendContactMessage } from './contact.server';

vi.mock('~/clients/lettermint.server', () => ({
  sendLettermintEmail: vi.fn(),
}));

function formData(fields: Record<string, string>) {
  const data = new FormData();

  for (const [name, value] of Object.entries(fields)) {
    data.set(name, value);
  }

  return data;
}

describe('parseContactMessage', () => {
  it('trims the fields', () => {
    expect(parseContactMessage(formData({
      email: ' ada@example.com ',
      message: ' Hello \n',
    }))).toEqual({ email: 'ada@example.com', message: 'Hello' });
  });

  it.each([
    { email: 'ada', message: 'Hello' },
    { email: 'ada@example.com\nBcc: eve@example.com', message: 'Hello' },
    { email: 'ada@example.com', message: '   ' },
    { email: 'ada@example.com', message: 'a'.repeat(5001) },
    { email: `${'a'.repeat(250)}@example.com`, message: 'Hello' },
  ])('refuses $email / $message.length characters', (fields) => {
    expect(parseContactMessage(formData(fields))).toBeUndefined();
  });
});

describe('sendContactMessage', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.mocked(sendLettermintEmail).mockReset();
  });

  it('mails the message to our inbox, answerable to the sender', async () => {
    vi.stubEnv('EMAIL_API_TOKEN', 'token');

    await sendContactMessage({ email: 'ada@example.com', message: 'Hello' });

    expect(sendLettermintEmail).toHaveBeenCalledWith({
      apiToken: 'token',
      from: 'pencil case <inbox@pencilcase.app>',
      to: 'inbox@pencilcase.app',
      replyTo: 'ada@example.com',
      subject: 'Contact form: ada@example.com',
      text: 'Hello\n\n—\nSent through the contact form by ada@example.com',
    });
  });

  it('skips sending without a token outside production', async () => {
    vi.stubEnv('EMAIL_API_TOKEN', '');
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    await sendContactMessage({ email: 'ada@example.com', message: 'Hello' });

    expect(sendLettermintEmail).not.toHaveBeenCalled();
  });
});
