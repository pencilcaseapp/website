import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router';
import { CONTACT_EMAIL } from '~/constants/links';
import { useConfig } from '~/hooks/use-config';
import { Button } from '~/ui/button/button';
import { TextLink } from '~/ui/text-link/text-link';

/** The look of a text field, a text area or a date field in the form. */
export const FIELD = classNames(
  'mt-3 block w-full rounded-2xl bg-pca-white px-5 text-[1.125rem]',
  'leading-normal text-pca-grey-900 transition-[box-shadow] duration-150',
  'ease-out hover:shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]',
  'motion-reduce:transition-none focus-visible:outline-2',
  'focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900',
);

type SendState = 'idle' | 'sending' | 'sent' | 'failed';

interface SendableFormProps {
  /** Which of the app's forms this is: `message` and the like. */
  form: 'message' | 'cancellation' | 'withdrawal';
  submitLabel: string;
  sentTitle: string;
  sentText: string;
  /** What did not go through: “Your message”, “Your cancellation”. */
  failedSubject: string;
  /** What the details are used for, ahead of the privacy policy link. */
  privacyNote: string;
  children: React.ReactNode;
}

/**
 * A form the app mails for us. Posts from the browser to the app's
 * `/contact`, which tells the forms apart by `form`, and says thanks in
 * place of the form once it is sent. The form stays, hidden, under the
 * thanks, so the box keeps its height.
 */
export const SendableForm: React.FC<SendableFormProps> = ({
  form,
  submitLabel,
  sentTitle,
  sentText,
  failedSubject,
  privacyNote,
  children,
}) => {
  const { contactUrl } = useConfig();
  const [state, setState] = useState<SendState>('idle');
  const isSending = state === 'sending';
  const isSent = state === 'sent';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');

    try {
      const response = await fetch(contactUrl, {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });

      setState(response.ok ? 'sent' : 'failed');
    }
    catch {
      setState('failed');
    }
  }

  return (
    <div className="relative">
      {isSent && (
        <div
          role="status"
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <p className="type-subtitle text-balance">{sentTitle}</p>
          <p className="type-body mt-3 text-pca-grey-700">{sentText}</p>
        </div>
      )}
      <form
        method="post"
        action={contactUrl}
        onSubmit={handleSubmit}
        inert={isSent}
        className={classNames(isSent && 'invisible')}
      >
        <input type="hidden" name="form" value={form} />
        {children}
        {state === 'failed' && (
          <p role="alert" className="type-body mt-6 text-pca-red-600">
            {failedSubject}
            {' '}
            didn’t go through. Please try again, or write to
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
          {isSending ? 'Sending …' : submitLabel}
        </Button>
        <p className="type-caption mt-6 text-pca-grey-700">
          {privacyNote}
          {' '}
          More in our
          {' '}
          <TextLink as={Link} to="/privacy">privacy policy</TextLink>
          .
        </p>
      </form>
    </div>
  );
};
