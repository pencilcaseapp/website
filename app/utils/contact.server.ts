import { sendLettermintEmail } from '~/clients/lettermint.server';
import { CONTACT_EMAIL } from '~/constants/links';

const MAX_MESSAGE_LENGTH = 5000;

const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactMessage {
  email: string;
  message: string;
}

/** The form's fields, or `undefined` when they are missing or malformed. */
export function parseContactMessage(
  formData: FormData,
): ContactMessage | undefined {
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (
    email.length > MAX_EMAIL_LENGTH
    || !EMAIL_PATTERN.test(email)
    || !message
    || message.length > MAX_MESSAGE_LENGTH
  ) {
    return undefined;
  }

  return { email, message };
}

/** Mails a contact form message to our inbox, answerable to the sender. */
export async function sendContactMessage({ email, message }: ContactMessage) {
  const apiToken = process.env.EMAIL_API_TOKEN;

  if (!apiToken) {
    if (import.meta.env.PROD) {
      throw new Error('EMAIL_API_TOKEN is not set.');
    }

    console.warn('EMAIL_API_TOKEN is not set. Skipping the contact e-mail …');
    return;
  }

  await sendLettermintEmail({
    apiToken,
    from: `pencil case <${CONTACT_EMAIL}>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Contact form: ${email}`,
    text: `${message}\n\n—\nSent through the contact form by ${email}`,
  });
}
