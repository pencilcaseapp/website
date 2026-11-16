import classNames from 'classnames';
import { FIELD, SendableForm } from '../sendable-form/sendable-form';

/** A message to our inbox: an e-mail address to answer and the text. */
export const ContactForm: React.FC = () => (
  <SendableForm
    form="message"
    submitLabel="Send message"
    sentTitle="Thanks, your message is on its way."
    sentText="We’ll get back to you soon."
    failedSubject="Your message"
    privacyNote={'We use your e-mail address and message only to answer '
      + 'you, and delete both once your request is done.'}
  >
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
  </SendableForm>
);
