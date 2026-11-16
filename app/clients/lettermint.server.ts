import { Lettermint } from 'lettermint';

export interface LettermintEmail {
  apiToken: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export async function sendLettermintEmail(email: LettermintEmail) {
  const lettermint = new Lettermint({
    sendingToken: email.apiToken,
  });

  const response = await lettermint.emails.send({
    from: email.from,
    to: [email.to],
    reply_to: email.replyTo ? [email.replyTo] : undefined,
    subject: email.subject,
    text: email.text,
  });

  return response?.message_id;
}
