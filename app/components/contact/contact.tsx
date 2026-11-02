import { CONTACT_EMAIL } from '~/constants/links';
import { Container } from '~/ui/container/container';
import { TextLink } from '~/ui/text-link/text-link';
import { ContactForm } from '../contact-form/contact-form';

/** The contact page: a message to our inbox, or an e-mail instead. */
export const Contact: React.FC = () => (
  <Container className="pt-14 sm:pt-20">
    <header className="mb-12 text-center sm:mb-16">
      <h1 className="type-hero text-balance">Say hello.</h1>
      <p className="type-lead mx-auto mt-6 max-w-[32ch] sm:mt-8 lg:max-w-none">
        Questions, ideas, a bug? Write to us and we’ll get back to you.
      </p>
    </header>
    <div className="mx-auto max-w-[640px] rounded-[2rem] bg-pca-grey-100 p-6 sm:p-10">
      <ContactForm />
    </div>
    <p className="type-body mt-6 text-center text-pca-grey-700">
      Prefer e-mail?
      {' '}
      <TextLink href={`mailto:${CONTACT_EMAIL}`} className="font-semibold">
        {CONTACT_EMAIL}
      </TextLink>
    </p>
  </Container>
);
