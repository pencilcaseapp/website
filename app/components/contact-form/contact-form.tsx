import classNames from 'classnames';
import { Link } from 'react-router';
import { Button } from '~/ui/button/button';
import { TextLink } from '~/ui/text-link/text-link';

const FIELD = classNames(
  'mt-3 block w-full rounded-2xl bg-pca-white px-5 text-[1.125rem]',
  'leading-normal text-pca-grey-900 transition-[box-shadow] duration-150',
  'ease-out hover:shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]',
  'motion-reduce:transition-none focus-visible:outline-2',
  'focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900',
);

/** A message to our inbox: an e-mail address to answer and the text. */
export const ContactForm: React.FC = () => (
  <form method="post">
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
    <Button type="submit" size="compact" className="mt-8 px-7">
      Send message
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
