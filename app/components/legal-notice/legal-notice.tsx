import { href } from 'react-router';
import {
  LegalPage,
  LegalParagraph,
  LegalSection,
} from '~/components/legal-page/legal-page';
import { CONTACT_EMAIL, CONTACT_FORM_HREF } from '~/constants/links';
import { PROVIDER } from '~/constants/legal';
import { TextLink } from '~/ui/text-link/text-link';

/** The legal notice (Impressum) under § 5 DDG. */
export const LegalNotice: React.FC = () => (
  <LegalPage title="Legal notice">
    <LegalSection id="legal-provider" title="Provider">
      <LegalParagraph>
        Information under § 5 DDG (Digitale-Dienste-Gesetz)
      </LegalParagraph>
      <address className="type-body-lg mt-5 not-italic">
        {Object.values(PROVIDER).map(line => (
          <span key={line} className="block">{line}</span>
        ))}
      </address>
    </LegalSection>
    <LegalSection id="legal-contact" title="Contact">
      <dl className="type-body-lg grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt>Email:</dt>
        <dd>
          <TextLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</TextLink>
        </dd>
        <dt>Contact form:</dt>
        <dd>
          <TextLink href={CONTACT_FORM_HREF}>pencilcase.app/contact</TextLink>
        </dd>
      </dl>
    </LegalSection>
    <LegalSection id="legal-responsible" title="Responsible for content">
      <LegalParagraph>
        {PROVIDER.name}
        , address as above (§ 18(2) MStV)
      </LegalParagraph>
    </LegalSection>
    <LegalSection id="legal-dispute" title="Consumer dispute resolution">
      <LegalParagraph>
        We are neither willing nor obliged to take part in dispute resolution
        proceedings before a consumer arbitration board (§ 36 VSBG).
      </LegalParagraph>
    </LegalSection>
    <LegalSection id="legal-links" title="Liability for links">
      <LegalParagraph>
        Our pages link to external websites whose content we do not control.
        The provider of each linked page is responsible for its content. We
        remove links as soon as we learn that they lead to unlawful content.
      </LegalParagraph>
    </LegalSection>
    <LegalSection id="legal-privacy" title="Privacy">
      <LegalParagraph>
        How we handle personal data is described in our
        {' '}
        <TextLink href={href('/privacy')}>privacy policy</TextLink>
        .
      </LegalParagraph>
    </LegalSection>
  </LegalPage>
);
