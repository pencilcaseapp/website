import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router';
import { CONTACT_EMAIL, CONTACT_ENDPOINT } from '~/constants/links';
import { Button } from '~/ui/button/button';
import { TextLink } from '~/ui/text-link/text-link';

const FIELD = classNames(
  'mt-3 block w-full rounded-2xl bg-pca-white px-5 text-[1.125rem]',
  'leading-normal text-pca-grey-900 transition-[box-shadow] duration-150',
  'ease-out hover:shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]',
  'motion-reduce:transition-none focus-visible:outline-2',
  'focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900',
);

type SendState = 'idle' | 'sending' | 'sent' | 'failed';

/**
 * A message to our inbox: an e-mail address to answer and the text. Posts
 * from the browser to the app, which mails it, and thanks the sender in
 * place of the form once it is sent.
 */
export const ContactForm: React.FC = () => {
  const [state, setState] = useState<SendState>('idle');
  const isSending = state === 'sending';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });

      setState(response.ok ? 'sent' : 'failed');
    }
    catch {
      setState('failed');
    }
  }

  if (state === 'sent') {
    return (
      <p role="status" className="type-body">
        Thanks, your message is on its way. We’ll get back to you soon.
      </p>
    );
  }

  return (
    <form method="post" action={CONTACT_ENDPOINT} onSubmit={handleSubmit}>
      <label htmlFor="contact-email" className="type-label block">
        Your e-mail address
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        spellCheck={false}
        required
        className={classNames(FIELD, 'h-14')}
      />
      <label htmlFor="contact-message" className="type-label mt-7 block">
        Your message
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows={7}
        maxLength={5000}
        required
        className={classNames(FIELD, 'min-h-48 resize-y py-4')}
      />
      {state === 'failed' && (
        <p role="alert" className="type-body mt-6 text-pca-red-600">
          Your message didn’t go through. Please try again, or write to
          {' '}
          {CONTACT_EMAIL}
          .
        </p>
      )}
      <Button
        type="submit"
        size="compact"
        disabled={isSending}
        className="mt-8 px-7"
      >
        {isSending ? 'Sending …' : 'Send message'}
      </Button>
      <p className="type-caption mt-6 text-pca-grey-700">
        We use your e-mail address and message only to answer you, and
        delete both once your request is done. More in our
        {' '}
        <TextLink as={Link} to="/privacy">privacy policy</TextLink>
        .
      </p>
    </form>
  );
};
