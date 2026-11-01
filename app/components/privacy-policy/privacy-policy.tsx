import {
  LegalLead,
  LegalPage,
  LegalParagraph,
  LegalSection,
} from '~/components/legal-page/legal-page';
import { PRIVACY_POLICY_UPDATED_AT, PROVIDER_ADDRESS } from '~/constants/legal';
import { CONTACT_EMAIL } from '~/constants/links';
import { Table } from '~/ui/table/table';
import { TextLink } from '~/ui/text-link/text-link';

const ExternalLink: React.FC<React.ComponentProps<'a'>> = props => (
  <TextLink target="_blank" rel="noreferrer" {...props} />
);

const Inbox: React.FC = () => (
  <TextLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</TextLink>
);

/** A provider's name, bold, and its address after it in normal weight. */
const ProviderName: React.FC<{ name: string; address: string }> = ({
  name,
  address,
}) => (
  <>
    {name}
    <span className="font-normal">{`, ${address}`}</span>
  </>
);

/** The privacy policy of the website, the web app and the native apps. */
export const PrivacyPolicy: React.FC = () => (
  <LegalPage title="Privacy policy" updatedAt={PRIVACY_POLICY_UPDATED_AT}>
    <LegalSection id="privacy-1" number={1} title="Who is responsible">
      <LegalParagraph>
        The controller for the processing described here is
        {' '}
        {PROVIDER_ADDRESS}
        {' '}
        (“pencil case”, “we”).
      </LegalParagraph>
      <LegalParagraph>
        For anything about your data, write to
        {' '}
        <Inbox />
        . We have not appointed a data protection officer, as we are not
        required to.
      </LegalParagraph>
      <LegalParagraph>
        This policy covers the pencil case web app at pencilcase.app, our apps
        for iOS and Android, and the emails we send.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="privacy-2" number={2} title="What we process and why">
      <LegalParagraph>
        We only process what we need to run pencil case. We do not sell data,
        show ads or use analytics or tracking tools.
      </LegalParagraph>
      <Table
        label="What we process, why, and on what legal basis"
        columns={[
          { label: 'Data', width: '34%' },
          { label: 'Why', width: '36%' },
          { label: 'Legal basis (GDPR)', width: '30%' },
        ]}
        rows={[
          [
            'Email address, optional name',
            'Your account and sign-in with a one-time code',
            'Art. 6(1)(b), contract',
          ],
          [
            'One-time codes (stored hashed), sessions with the user agent of your browser or our app',
            'Signing you in and keeping you signed in',
            'Art. 6(1)(b), contract',
          ],
          [
            'Documents and the images you add to them',
            'Storing and syncing your documents, and showing them to the people you share them with',
            'Art. 6(1)(b), contract',
          ],
          [
            'Email addresses of people you invite',
            'Sending them the invitation and giving them access',
            'Art. 6(1)(f), legitimate interest in letting you share your documents',
          ],
          [
            'Your name or email, shown to others in the same document',
            'Showing who else is editing (presence and cursors)',
            'Art. 6(1)(b), contract',
          ],
          [
            <>
              Reports of a shared document:
              <span className="font-normal">
                {' the reason and details you give, your account and the document. We email the report to our own inbox together with the document’s title, link and its owner’s email address. The owner is not told who reported it'}
              </span>
            </>,
            'Looking into reported content, removing what breaks our terms and answering you',
            'Art. 6(1)(f), legitimate interest in keeping shared content lawful and safe',
          ],
          [
            'Record of the emails we send you (address, type, time)',
            'Making sure an email is not sent twice, limiting invitations and investigating abuse',
            'Art. 6(1)(f), legitimate interest in reliable, abuse-free email',
          ],
          [
            'Subscription status, Creem customer and subscription IDs, and the payment notifications Creem sends us (including your name and email)',
            'Unlocking the paid plan; the notifications are kept to troubleshoot payment issues',
            'Art. 6(1)(b), contract; notifications Art. 6(1)(f), legitimate interest in reliable billing',
          ],
          [
            'IP address, time and URL of a request (server logs)',
            'Delivering the site and keeping it secure',
            'Art. 6(1)(f), legitimate interest in a secure service',
          ],
          [
            'Emails and contact form messages you send us',
            'Answering your request',
            'Art. 6(1)(b) or (f)',
          ],
        ]}
      />
      <LegalParagraph>
        If you open a shared document without an account, your browser gets a
        random guest ID so your anonymous name (an animal) stays the same. We
        cannot tell who you are from it.
      </LegalParagraph>
      <LegalParagraph>
        Our apps for iOS and Android show the same pencil case as the website
        and process the same data, as described in this policy. The apps add
        “PencilCaseApp” to the user agent they send, so our server can tell a
        request comes from the app. When you add an image in the app, it only
        reads the photos you pick; it has no other access to your photo
        library.
      </LegalParagraph>
      <LegalParagraph>
        You do not have to give us any of this, but without an email address
        we cannot create an account.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="privacy-3" number={3} title="Cookies and local storage">
      <LegalParagraph>
        We only store what is strictly necessary to provide the service you
        asked for, so we do not ask for consent (Art. 5(3) ePrivacy Directive,
        § 25(2) TDDDG). There are no tracking, advertising or third-party
        cookies. The same applies inside our apps, which show pencil case in a
        built-in browser view.
      </LegalParagraph>
      <Table
        label="Cookies and local storage we use"
        columns={[
          { label: 'Name', width: '17%' },
          { label: 'Type', width: '17%' },
          { label: 'Purpose', width: '38%' },
          { label: 'Lifetime', width: '28%' },
        ]}
        rows={[
          [
            'session',
            'Cookie',
            'Keeps you signed in',
            '90 days, renewed each time you use pencil case',
          ],
          [
            'csrf',
            'Cookie',
            'Protects forms against cross-site request forgery',
            'Browser session',
          ],
          [
            'user-prefs',
            'Cookie',
            'Remembers your display preferences, such as whether you closed the sidebar',
            '1 year',
          ],
          [
            'Guest ID',
            'Local storage',
            'Keeps a signed-out visitor’s anonymous name the same in shared documents',
            'Until you clear it',
          ],
        ]}
      />
      <LegalParagraph>
        When you pay, you are on Creem’s checkout, which sets its own cookies
        under its own policy.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="privacy-4" number={4} title="Who else receives data">
      <LegalParagraph>
        We use these providers. Clever Cloud, Bunny, Lettermint and
        united-domains process data only on our instructions under a data
        processing agreement (Art. 28 GDPR). Creem acts as merchant of record
        and processes payment data as its own controller.
      </LegalParagraph>
      <Table
        label="Providers that receive data"
        columns={[
          { label: 'Provider', width: '27%' },
          { label: 'What they do for us', width: '25%' },
          { label: 'Data', width: '20%' },
          { label: 'Where', width: '28%' },
        ]}
        rows={[
          [
            <ProviderName
              name="Clever Cloud SAS"
              address="4 rue Voltaire, 44000 Nantes, France"
            />,
            'Hosting of the app, its database and cache',
            'Everything in section 2',
            <>
              EU (France); see
              {' '}
              <ExternalLink href="https://www.clever.cloud/privacy-policy/">
                Clever Cloud’s privacy policy
              </ExternalLink>
            </>,
          ],
          [
            <ProviderName
              name="BunnyWay d.o.o."
              address="Dunajska cesta 165, 1000 Ljubljana, Slovenia (Bunny)"
            />,
            'Storage and delivery (CDN) of images in documents',
            'Images, IP address of whoever loads them',
            <>
              Storage in Frankfurt, Germany, with a replica in Stockholm,
              Sweden; delivered only from Bunny’s locations in Europe; see
              {' '}
              <ExternalLink href="https://bunny.net/privacy/">
                Bunny’s privacy policy
              </ExternalLink>
            </>,
          ],
          [
            <ProviderName
              name="Lettermint B.V."
              address="Willemsvaart 16 B, 8019 AB Zwolle, Netherlands"
            />,
            'Sending our emails (sign-in codes, invitations, account emails)',
            'Email address, name, email content',
            <>
              EU; see
              {' '}
              <ExternalLink href="https://lettermint.co/privacy-policy">
                Lettermint’s privacy policy
              </ExternalLink>
            </>,
          ],
          [
            <ProviderName
              name="united-domains GmbH"
              address="Gautinger Straße 10, 82319 Starnberg, Germany"
            />,
            'Our domain and the inbox for emails you send us',
            'Your email and its content',
            <>
              Germany; see
              {' '}
              <ExternalLink href="https://www.united-domains.de/unternehmen/datenschutz/">
                united-domains’ privacy policy
              </ExternalLink>
            </>,
          ],
          [
            <ProviderName
              name="Armitage Labs OÜ (Creem)"
              address="Rotermanni 14, 10111 Tallinn, Estonia"
            />,
            'Checkout, payment, invoicing and tax as merchant of record',
            'Email address, name, billing and payment details',
            <>
              EU; providers outside the EU under standard contractual clauses,
              see
              {' '}
              <ExternalLink href="https://www.creem.io/privacy">
                Creem’s privacy policy
              </ExternalLink>
            </>,
          ],
        ]}
      />
      <LegalParagraph>
        Where data leaves the EU or EEA, it happens on the basis of an adequacy
        decision or the EU Standard Contractual Clauses (Art. 45 and 46 GDPR).
      </LegalParagraph>
      <LegalParagraph>
        You download our apps from Apple’s App Store or Google Play. Apple and
        Google process the data needed for that as their own controllers,
        under their own privacy policies (
        <ExternalLink href="https://www.apple.com/legal/privacy/">
          Apple
        </ExternalLink>
        ,
        {' '}
        <ExternalLink href="https://policies.google.com/privacy">
          Google
        </ExternalLink>
        ). We do not receive personal data from them, only anonymous
        statistics such as download numbers.
      </LegalParagraph>
      <LegalParagraph>
        People you share a document with see its content, and everyone in the
        same document sees each other’s name or email.
      </LegalParagraph>
      <LegalParagraph>
        We disclose data to authorities only when the law requires it.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="privacy-5" number={5} title="How long we keep it">
      <LegalParagraph>
        We keep your account data for as long as you have an account. You can
        delete your account at any time in the settings, at pencilcase.app or
        in our apps. We then keep your account, documents and images for 30
        days and delete them permanently afterwards, unless the law requires
        us to keep something longer.
      </LegalParagraph>
      <Table
        label="When other data is deleted"
        columns={[
          { label: 'Data', width: '40%' },
          { label: 'Deleted', width: '60%' },
        ]}
        rows={[
          [
            'One-time sign-in codes and email change requests',
            'One day after they expire',
          ],
          [
            'Sessions',
            'The night after they expire, at the latest 90 days after your last visit',
          ],
          [
            'Deleted documents and their images',
            '30 days after you delete them',
          ],
          [
            'Record of sent emails',
            'One year after sending, or earlier when you delete your account',
          ],
          [
            'Reports of shared documents',
            'One year after we handled the report. The link to you or the document is removed earlier when you delete your account or the document is deleted for good',
          ],
          [
            'Payment notifications from Creem',
            '30 days after we receive them',
          ],
          ['Server logs', 'After 7 days (deleted by Clever Cloud)'],
          [
            'Emails and contact form messages you send us',
            'One year after the last message. Requests about your data protection rights and reports of content: one year after we handled them',
          ],
          [
            'Invoices and payment records',
            'Kept by Creem for as long as tax law requires',
          ],
        ]}
      />
    </LegalSection>

    <LegalSection id="privacy-6" number={6} title="Your rights">
      <LegalParagraph>
        You have the right to access your data (Art. 15 GDPR), to have it
        corrected (Art. 16) or deleted (Art. 17), to restrict its processing
        (Art. 18), and to receive it in a portable format (Art. 20).
      </LegalParagraph>
      <LegalParagraph>
        <LegalLead>Right to object (Art. 21 GDPR):</LegalLead>
        {' '}
        where we rely on legitimate interest, you can object at any time for
        reasons arising from your particular situation.
      </LegalParagraph>
      <LegalParagraph>
        To use any of these rights, write to
        {' '}
        <Inbox />
        .
      </LegalParagraph>
      <LegalParagraph>
        You can also complain to a data protection authority, for example the
        one where you live or the one responsible for us: Berliner Beauftragte
        für Datenschutz und Informationsfreiheit, Alt-Moabit 59–61, 10555
        Berlin.
      </LegalParagraph>
    </LegalSection>

    <LegalSection id="privacy-7" number={7} title="Changes">
      <LegalParagraph>
        We update this policy when the app or our providers change. The date
        at the top shows the current version, and we tell you by email about
        changes that affect you significantly.
      </LegalParagraph>
    </LegalSection>
  </LegalPage>
);
