import { data } from 'react-router';
import { Contact } from '~/components/contact/contact';
import { PageLayout } from '~/components/page-layout/page-layout';
import {
  parseContactMessage,
  sendContactMessage,
} from '~/utils/contact.server';
import type { Route } from './+types/contact';

export function meta() {
  return [{ title: 'Contact – pencil case' }];
}

/** Takes the contact form of this page and of /help. */
export async function action({ request }: Route.ActionArgs) {
  const contactMessage = parseContactMessage(await request.formData());

  if (!contactMessage) {
    return data({ sent: false }, { status: 400 });
  }

  try {
    await sendContactMessage(contactMessage);
  }
  catch (error) {
    console.error('Sending a contact message failed', error);
    return data({ sent: false }, { status: 502 });
  }

  return { sent: true };
}

export default function ContactPage() {
  return (
    <PageLayout header="white">
      <Contact />
    </PageLayout>
  );
}
