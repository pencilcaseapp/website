import { href } from 'react-router';
import {
  LegalLead,
  LegalList,
  LegalPage,
  LegalParagraph,
  LegalSection,
} from '~/components/legal-page/legal-page';
import { PROVIDER_ADDRESS } from '~/constants/legal';
import { CONTACT_EMAIL, CONTACT_FORM_HREF } from '~/constants/links';
import { TextLink } from '~/ui/text-link/text-link';

/** The terms of use of the web app and the native apps. */
export const TermsOfUse: React.FC = () => (
  <LegalPage title="Terms of use">
    <LegalSection id="terms-1" number={1} title="Scope">
      <LegalParagraph>
        These terms apply to your use of pencil case, a collaborative writing
        app at pencilcase.app and in our apps for iOS and Android (“pencil
        case”, “we”). It is provided by
        {' '}
        {PROVIDER_ADDRESS}
        {' '}
        (see the
        {' '}
        <TextLink href={href('/imprint')}>legal notice</TextLink>
        ).
      </LegalParagraph>
      <LegalParagraph>
        The contract for using pencil case is made when you create an account.
        Buying the Pro plan is a separate purchase from our reseller Creem
        (section 3).
      </LegalParagraph>
      <LegalParagraph>
        You download our apps from Apple’s App Store or Google Play, whose
        terms apply to the download. Apple and Google are not party to these
        terms and are not responsible for pencil case. These terms apply in the
        apps as they do on the website.
      </LegalParagraph>
      <LegalParagraph>
        pencil case is only offered to consumers for personal use. By creating
        an account you confirm that you are not using pencil case for a
        business or professional purpose.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-2" number={2} title="Your account">
      <LegalParagraph>
        You need to be at least 16 years old to create an account.
      </LegalParagraph>
      <LegalParagraph>
        You sign in with a one-time code we send to your email address, so
        whoever controls that mailbox controls your account. Keep the address
        current and protect access to it. You can change it in the settings.
      </LegalParagraph>
      <LegalParagraph>
        One account is for one person. Do not share your sign-in with others;
        invite them to your documents instead.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-3" number={3} title="Plans and payment">
      <LegalParagraph>
        There are two plans: Free, which costs nothing and has usage limits,
        and Pro, which is paid, raises those limits and adds features for
        working with others. The current features, limits and price of each
        plan are on our
        {' '}
        <TextLink href="/#pricing">pricing page</TextLink>
        , which you see before you upgrade. What it showed when you bought Pro
        is what your Pro year includes; section 7 says how features change.
      </LegalParagraph>
      <LegalParagraph>
        <LegalLead>Free.</LegalLead>
        {' '}
        The Free plan has no time limit. We may change its features, but we
        will never lower its usage limits, such as the number of documents and
        spaces.
      </LegalParagraph>
      <LegalParagraph>
        <LegalLead>Pro.</LegalLead>
        {' '}
        You buy Pro from Creem (Armitage Labs OÜ, Tallinn, Estonia), which
        sells it as our reseller and merchant of record. Payment, invoices,
        taxes, refunds and your right of withdrawal are governed by
        {' '}
        <TextLink
          href="https://www.creem.io/terms"
          target="_blank"
          rel="noreferrer"
        >
          Creem’s terms
        </TextLink>
        . Pro is billed once a year in advance. The first year is a fixed
        term: if you cancel during it, Pro runs until the end of that year.
        After the first year Pro continues until you cancel it, and you can
        cancel at any time with one month’s notice; we then refund the unused
        part of the year you paid for. You upgrade and cancel in the settings
        at pencilcase.app, not in our apps.
      </LegalParagraph>
      <LegalParagraph>
        If Pro ends and you have more documents or spaces than the Free plan
        allows, you keep all of them and can still open, edit and delete them.
        You can only create new ones once you are below the limit again.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-4" number={4} title="Your content">
      <LegalParagraph>
        Everything you write and upload stays yours. You give us only the
        rights we need to run pencil case for you: to store your documents and
        images, sync them between devices and people, and show them to the
        people you share them with. These rights end when your content is
        deleted.
      </LegalParagraph>
      <LegalParagraph>
        You decide who sees a document. Anyone with the link can open a
        document whose link you have turned on, with the access you chose for
        the link. People you invite by email get the access you set for them.
        Everyone in a document sees each other’s name or email while they are
        in it.
      </LegalParagraph>
      <LegalParagraph>
        You are responsible for what you put into pencil case and for having
        the rights to it. Keep your own copies of anything important; we work
        to keep your data safe but cannot rule out loss entirely.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-5" number={5} title="Acceptable use">
      <LegalParagraph>You may not use pencil case to:</LegalParagraph>
      <LegalList
        items={[
          'store or share content that is illegal or infringes other people’s rights, such as copyright or personal rights;',
          'send unsolicited invitations or otherwise spam people through pencil case;',
          'distribute malware or phishing;',
          'attack, overload or probe pencil case or its users, or get around its limits and access controls;',
          'create accounts automatically or resell access to pencil case.',
        ]}
      />
      <LegalParagraph>
        If you break these rules we may remove the content concerned, turn off
        a document’s link, or suspend or close your account (section 8). We
        choose the mildest step that is enough and tell you why, unless the
        law prevents it.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-6" number={6} title="Reporting illegal content">
      <LegalParagraph>
        We do not read your documents and do not scan them automatically. We
        only look at content when someone reports it or the law requires it.
      </LegalParagraph>
      <LegalParagraph>
        To report content you believe is illegal, write to
        {' '}
        <TextLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</TextLink>
        {' '}
        or use our
        {' '}
        <TextLink href={CONTACT_FORM_HREF}>contact form</TextLink>
        . In our apps you can also use Report in a shared document’s menu.
        Please include the link to the document, what you consider illegal and
        why, your name and email address, and a statement that your report is
        accurate and complete to the best of your knowledge. (Reports about
        child sexual abuse material do not need your name.)
      </LegalParagraph>
      <LegalParagraph>
        We confirm receipt, decide carefully and without undue delay, and tell
        you the outcome. If we restrict content or an account, we tell the
        person affected why and how to challenge it, including through the
        courts.
      </LegalParagraph>
      <LegalParagraph>
        The same address is our point of contact for users and for authorities
        under Art. 11 and 12 of the Digital Services Act. We answer in English
        and German.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-7" number={7} title="Availability and liability">
      <LegalParagraph>
        We work to keep pencil case available and improve it continuously, but
        we cannot guarantee that it is always reachable or free of errors.
      </LegalParagraph>
      <LegalParagraph>
        <LegalLead>Changes to features.</LegalLead>
        {' '}
        We may change pencil case, including the features and limits of each
        plan, for a valid reason: to keep it secure, to follow a change in the
        law or a decision of a court or authority, to adapt it to technical
        developments or to changes at our service providers, or to improve it.
        The core of what you use, writing and sharing documents, keeps
        working, and a change never costs you extra. We show changes on the
        pricing page and in the app.
      </LegalParagraph>
      <LegalParagraph>
        If a change limits Pro more than slightly, for example by removing a
        feature or lowering a limit, we email you at least 4 weeks before it
        takes effect, saying what changes and when. You can then end Pro free
        of charge within 30 days after the change, or after our email if that
        comes later, and we refund the unused part of the year you paid for.
        You do not have this right if you can keep using Pro unchanged at no
        extra cost.
      </LegalParagraph>
      <LegalParagraph>
        We are liable without limitation for damage caused intentionally or
        through gross negligence, for injury to life, body or health, under the
        Product Liability Act, and where we have given a guarantee.
      </LegalParagraph>
      <LegalParagraph>
        For slight negligence we are only liable if we breach an obligation
        that is essential to the contract and that you may rely on (a cardinal
        obligation), and only for the damage that is typical and foreseeable
        for this kind of contract.
      </LegalParagraph>
      <LegalParagraph>
        For the Free plan, which we provide without charge, we are only liable
        for intent and gross negligence, except for injury to life, body or
        health.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-8" number={8} title="Ending the contract">
      <LegalParagraph>
        <LegalLead>You</LegalLead>
        {' '}
        can end the contract at any time by deleting your account in the
        settings, at pencilcase.app or in our apps. We keep your account,
        documents and images for 30 days, then delete them permanently.
        Deleting your account also cancels Pro, with the refund described in
        section 3.
      </LegalParagraph>
      <LegalParagraph>
        <LegalLead>We</LegalLead>
        {' '}
        can end the contract with 4 weeks’ notice by email, for example if we
        shut pencil case down. A Pro year you have already paid for is then
        refunded pro rata.
      </LegalParagraph>
      <LegalParagraph>
        We can suspend or close an account without notice for an important
        reason, in particular a serious or repeated breach of section 5. Where
        possible we warn you first.
      </LegalParagraph>
      <LegalParagraph>
        Before your account is deleted, copy anything you want to keep:
        deleted documents cannot be recovered after the 30 days.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="terms-9" number={9} title="Changes and final provisions">
      <LegalParagraph>
        <LegalLead>Changes to these terms.</LegalLead>
        {' '}
        We send you changes by email at least 4 weeks before they take effect.
        Changes that affect the price or the core of what you get only apply
        with your express agreement. You can end the contract free of charge
        before any change takes effect. Changes to the features and limits on
        the pricing page are not changes to these terms; section 7 covers
        them.
      </LegalParagraph>
      <LegalParagraph>
        <LegalLead>Applicable law.</LegalLead>
        {' '}
        German law applies, excluding the UN Convention on Contracts for the
        International Sale of Goods. If you are a consumer living in another
        country, you keep the protection of the mandatory consumer law of that
        country.
      </LegalParagraph>
    </LegalSection>
  </LegalPage>
);
