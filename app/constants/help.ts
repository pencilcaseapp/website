import {
  APP_URL,
  CONTACT_EMAIL,
  CONTACT_FORM_HREF,
  GITHUB_HREF,
} from './links';
import { PLANS } from './plans';

export type HelpBlock
  = | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'steps'; items: string[] };

export interface HelpArticle {
  slug: string;
  question: string;
  /** The answer in one or two sentences, the lead of the article. */
  summary: string;
  body?: HelpBlock[];
  /** Slugs of the articles to suggest first under the article. */
  related?: string[];
  /** Describes something the app does not do yet, kept out of search. */
  draft?: boolean;
}

export interface HelpSection {
  id: string;
  title: string;
  articles: HelpArticle[];
}

const PRO_PRICE = PLANS.find(plan => plan.id === 'pro')?.price;

const SIGN_IN_HREF = `${APP_URL}/signin`;
const UPGRADE_HREF = `${APP_URL}/upgrade`;
const PRICING_HREF = '/#pricing';
const PRIVACY_HREF = '/privacy';

const link = (text: string, href: string) => `[${text}](${href})`;
const EMAIL_LINK = link(CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`);

const paragraph = (text: string): HelpBlock => ({ type: 'paragraph', text });
const list = (...items: string[]): HelpBlock => ({ type: 'list', items });
const steps = (...items: string[]): HelpBlock => ({ type: 'steps', items });

/**
 * The help articles by section. Text may set `**bold**`, `` `code` `` and
 * `[links](href)`.
 */
export const HELP_SECTIONS: HelpSection[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    articles: [
      {
        slug: 'what-is-pencil-case',
        question: 'What is pencil case?',
        summary: 'A simple editor for writing documents, alone or with other people at the same time.',
        body: [
          paragraph(
            'Open a document, write, send the link. Everyone in it sees the same text and each other’s cursors as they type. You get headings, lists, checklists, code blocks, images and Markdown shortcuts.',
          ),
          paragraph(
            'It is made by a small team in Berlin, hosted in the EU and open source, with no investors, ads or tracking.',
          ),
        ],
        related: [
          'formatting-options',
          'share-with-a-link',
          'hosted-in-the-eu',
        ],
      },
      {
        slug: 'create-an-account',
        question: 'How do I create an account?',
        summary: `Enter your e-mail address on the ${link('sign in page', SIGN_IN_HREF)} and type the code we send you. There is no password and no separate sign-up.`,
        body: [
          steps(
            `Go to ${link('Sign in', SIGN_IN_HREF)} and enter your e-mail address.`,
            'Type the code from the e-mail we send you.',
            'Add your name if you like. It is what other people see in a shared document.',
          ),
          paragraph('You need to be at least 16 years old to create an account.'),
        ],
        related: ['sign-in', 'do-others-need-an-account'],
      },
      {
        slug: 'is-it-free',
        question: 'Is pencil case free?',
        summary: 'Yes. The Free plan gives you 5 documents for life, with sharing by link, live collaboration and every editor feature.',
        body: [
          paragraph(
            `${link('Pro', PRICING_HREF)} costs ${PRO_PRICE} a year and is for when you want more than 5 documents or want to invite people by e-mail.`,
          ),
        ],
        related: ['what-does-pro-include', 'document-limit'],
      },
      {
        slug: 'contact-support',
        question: 'How do I reach you?',
        summary: `Write to ${EMAIL_LINK} or use the ${link('contact form', CONTACT_FORM_HREF)}. We answer in English and German.`,
        body: [
          paragraph(
            'In the app you also find the address under **Settings → Support**.',
          ),
        ],
      },
    ],
  },
  {
    id: 'writing',
    title: 'Writing',
    articles: [
      {
        slug: 'formatting-options',
        question: 'What can I format in a document?',
        summary: 'Headings, text styles, lists, checklists, quotes, code, links, images and divider lines.',
        body: [
          list(
            'Headings in three sizes',
            'Bold, italic and underline, plus strikethrough and inline code through Markdown shortcuts',
            'Bulleted lists, numbered lists and checklists, indented up to three levels with the Tab key',
            'Quotes',
            'Code blocks with syntax highlighting',
            'Links: a pasted web address turns into a link by itself',
            'Images',
            'Divider lines',
          ),
          paragraph(
            `The most common ones are in the toolbar. All of them are a few keystrokes away, through the ${link('slash menu', '/help/slash-menu')} or ${link('Markdown shortcuts', '/help/markdown-shortcuts')}.`,
          ),
        ],
      },
      {
        slug: 'markdown-shortcuts',
        question: 'Can I write in Markdown?',
        summary: 'Yes. Type the Markdown as you write and it turns into formatting on the spot.',
        body: [
          paragraph('At the start of a line, followed by a space:'),
          list(
            '`#`, `##` or `###` for a heading',
            '`-` or `*` for a bulleted list',
            '`1.` for a numbered list',
            '`- [ ]` for a checklist',
            '`>` for a quote',
          ),
          paragraph(
            'On a line of their own: three backticks start a code block, and `---` draws a divider line.',
          ),
          paragraph('Inside a line:'),
          list(
            '`**bold**`',
            '`*italic*`',
            '`~~strikethrough~~`',
            'A word between two backticks for inline code',
            '`[text](address)` for a link',
          ),
        ],
      },
      {
        slug: 'slash-menu',
        question: 'What does the slash menu do?',
        summary: 'Type / in a document to pick what comes next without leaving the keyboard.',
        body: [
          paragraph(
            'The menu offers headings, numbered and bulleted lists, checklists, images and code blocks. Keep typing to narrow the list down, for example /code or /todo.',
          ),
        ],
      },
      {
        slug: 'add-images',
        question: 'How do I add images?',
        summary: 'Drag them in, paste them, or use the image button in the toolbar or the slash menu.',
        body: [
          paragraph(
            'JPEG, PNG, WebP, GIF and AVIF files work, up to 10 MB each. On a computer you can move an image by dragging it to another place in the document.',
          ),
          paragraph(
            'We store images at up to 1600 pixels wide and remove their metadata, such as the place a photo was taken. An image is only visible to people who can open the document it is in.',
          ),
        ],
      },
      {
        slug: 'document-title',
        question: 'How do I give a document a title?',
        summary: 'The first heading is the title. There is no separate field to fill in.',
        body: [
          paragraph(
            'Whatever you write in the first heading shows up in the sidebar and the browser tab as you type.',
          ),
        ],
      },
      {
        slug: 'saving',
        question: 'Do I need to save?',
        summary: 'No. There is no save button: every change is saved by itself, a moment after you make it.',
        related: ['lost-connection', 'simultaneous-editing'],
      },
      {
        slug: 'lost-connection',
        question: 'What happens if I lose my connection?',
        summary: 'Keep writing. What you type is merged into the document once you are back online.',
        body: [
          paragraph(
            'Keep the tab open until you are: what you wrote offline lives in that tab until it has reached us.',
          ),
        ],
      },
      {
        slug: 'version-history',
        question: 'Is there a version history?',
        summary: 'No. You can undo your recent edits with Ctrl+Z or Cmd+Z, but you cannot go back to an older version of a document.',
      },
      {
        slug: 'export-a-document',
        question: 'Can I export a document?',
        summary: 'Not at the moment. There is no export button, but you can select the text and copy it into another app.',
      },
    ],
  },
  {
    id: 'documents',
    title: 'Documents',
    articles: [
      {
        slug: 'create-a-document',
        question: 'How do I create a document?',
        summary: 'Select **Create Doc** in the sidebar. It opens empty and ready to type in.',
        related: ['document-limit', 'document-title'],
      },
      {
        slug: 'document-limit',
        question: 'How many documents can I have?',
        summary: 'On Free you can own 5 documents at a time. On Pro there is no limit.',
        body: [
          paragraph(
            'Documents other people share with you do not count, and neither do the ones you have deleted, so deleting one frees a place again.',
          ),
        ],
        related: ['what-does-pro-include', 'when-pro-ends'],
      },
      {
        slug: 'finding-documents',
        question: 'Where do I find my documents?',
        summary: 'In the sidebar: one list, with the document you edited last at the top. Documents shared with you are in it too.',
        related: ['what-are-spaces', 'search-documents'],
      },
      {
        slug: 'search-documents',
        question: 'Can I search my documents?',
        summary: 'Not yet. The browser’s own search finds words in the document you have open.',
      },
      {
        slug: 'delete-a-document',
        question: 'How do I delete a document?',
        summary: 'Open the menu of its row in the sidebar and choose **Delete**. You can restore it for 30 days.',
        body: [
          paragraph(
            'Deleting takes the document away from everybody else at once and turns its link off. After that you can still open it yourself, read-only, from the **Deleted** group in the sidebar.',
          ),
          paragraph('After 30 days it is gone for good, along with its images.'),
        ],
        related: ['leave-a-shared-document'],
      },
      {
        slug: 'restore-a-document',
        question: 'How do I restore a deleted document?',
        summary: 'Open the **Deleted** group in the sidebar, open the menu of the document’s row and choose **Restore**. This works for 30 days after deleting it.',
        body: [
          paragraph(
            'It goes back to where it was in your list. People you invited by e-mail get their access back. The link stays off, so turn it on again if you want to share it that way.',
          ),
        ],
      },
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing and collaboration',
    articles: [
      {
        slug: 'share-with-a-link',
        question: 'How do I share a document with a link?',
        summary: 'Open the document, select **Share**, turn the switch on and copy the link. Anyone with the link can then read the document.',
        body: [
          steps(
            'Open the document and select **Share** at the top.',
            'Turn on the switch.',
            'Choose whether people with the link can view or edit.',
            'Select **Copy link** and send it to whoever you like.',
          ),
          paragraph(
            'A new link always starts as view only, so you never hand out editing by accident.',
          ),
        ],
        related: ['do-others-need-an-account'],
      },
      {
        slug: 'view-or-edit',
        question: 'Can I decide who can edit and who can only read?',
        summary: 'Yes. A link is either **Can view** or **Can edit**, and with Pro everyone you invite by e-mail gets their own setting.',
        body: [
          paragraph(
            'Change it in the **Share** panel at any time. People who already have the document open switch over right away.',
          ),
        ],
        related: ['invite-by-email'],
      },
      {
        slug: 'stop-sharing',
        question: 'How do I stop sharing a document?',
        summary: 'Open **Share** and turn the switch off. People who came in through the link lose access immediately, even with the document open.',
        body: [
          paragraph(
            'People you invited by e-mail keep their access until you remove them.',
          ),
        ],
        related: ['change-or-remove-access'],
      },
      {
        slug: 'invite-by-email',
        question: 'How do I invite someone by e-mail?',
        summary: 'With Pro, open **Share**, enter their address under **Invite people by email**, choose what they can do and send it.',
        body: [
          paragraph(
            'They get an e-mail with a link to the document, and show as Invited until they open it for the first time. To open it they sign in with the address you invited, which creates an account if they do not have one.',
          ),
          paragraph(
            'New invitations can edit unless you say otherwise. You can send up to 50 a day.',
          ),
        ],
        related: ['what-does-pro-include', 'change-or-remove-access'],
      },
      {
        slug: 'change-or-remove-access',
        question: 'How do I change or remove someone’s access?',
        summary: 'Open **Share** and find them under the people with access. Change what they can do or remove them. It applies immediately.',
        body: [
          paragraph(
            'Only people you invited by e-mail are listed. To shut out everybody who came through the link, turn the link off.',
          ),
        ],
        related: ['stop-sharing'],
      },
      {
        slug: 'do-others-need-an-account',
        question: 'Do the people I share with need an account?',
        summary: 'Not for a link. They open it and are in the document right away, as a Capybara or an Axolotl.',
        body: [
          paragraph(
            'Guests get an animal name that stays the same when they come back on the same device. Only the person who owns a document needs an account, and people invited by e-mail sign in with that address.',
          ),
        ],
      },
      {
        slug: 'who-is-in-a-document',
        question: 'How do I see who else is in a document?',
        summary: 'Their avatars sit next to the Share button, and their cursors and selections show in the text with their name attached.',
        body: [
          paragraph(
            'People see your name, or your e-mail address if you have not set a name. You can change it under **Settings → Account**.',
          ),
        ],
        related: ['change-name'],
      },
      {
        slug: 'simultaneous-editing',
        question: 'What happens when two people edit the same line?',
        summary: 'Both changes stay. Nobody’s typing is thrown away and there are no conflicts to resolve.',
        body: [
          paragraph(
            'When two people type into the same spot, both words stay, one after the other, and you decide which one goes.',
          ),
        ],
      },
      {
        slug: 'leave-a-shared-document',
        question: 'How do I remove a shared document from my list?',
        summary: 'Open the menu of its row in the sidebar and choose **Delete**. It only leaves your list. For everybody else it stays as it is.',
        body: [
          paragraph(
            'You can only get back in through the link or a new invitation.',
          ),
        ],
      },
      {
        slug: 'report-a-document',
        question: 'How do I report a shared document?',
        summary: 'Select **Report** at the top of the document, where the owner has Share, then choose a reason and add details if you like.',
        body: [
          paragraph(
            `You need to be signed in. Without an account, write to ${EMAIL_LINK} with the link and what you consider illegal or wrong. The owner is not told who reported the document.`,
          ),
        ],
      },
      {
        slug: 'comments',
        question: 'Can I comment on a document?',
        summary: 'Not yet. Comments are on their way: on a selection, with replies in threads, and resolved when you are done.',
      },
    ],
  },
  {
    id: 'spaces',
    title: 'Spaces',
    articles: [
      {
        slug: 'what-are-spaces',
        question: 'What are spaces?',
        summary: 'Spaces group your documents the way you like, so a long list becomes a few short ones.',
        draft: true,
      },
      {
        slug: 'share-a-space',
        question: 'Can I share a whole space?',
        summary: 'Yes. Share a space with other people and they get the documents in it, without you sharing each one.',
        draft: true,
      },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    articles: [
      {
        slug: 'sign-in',
        question: 'How do I sign in?',
        summary: 'Enter your e-mail address and type the code we send you. There are no passwords in pencil case.',
        body: [
          paragraph(
            'A code works for 15 minutes and allows five tries. After that, ask for a new one. Once you are in, a device stays signed in for up to 90 days.',
          ),
        ],
        related: ['no-sign-in-code'],
      },
      {
        slug: 'no-sign-in-code',
        question: 'I did not get my sign-in code. What now?',
        summary: `Check your spam folder and the spelling of the address, then ${link('ask for a new code', SIGN_IN_HREF)}.`,
        body: [
          paragraph(
            `If it still does not arrive, write to ${EMAIL_LINK} from that address and we will look into it.`,
          ),
        ],
      },
      {
        slug: 'sign-out',
        question: 'How do I sign out?',
        summary: 'Open **Settings** and choose **Logout**. It signs out the device you are on.',
      },
      {
        slug: 'change-email',
        question: 'How do I change my e-mail address?',
        summary: 'Go to **Settings → Account → Change e-mail**, enter the new address and type the code we send there.',
        body: [
          paragraph(
            'Your address is how you sign in, so changing it signs you out on all your other devices. The device you changed it on stays signed in.',
          ),
          paragraph(
            'The code works for 15 minutes, and you cannot move to an address another account already uses.',
          ),
        ],
      },
      {
        slug: 'change-name',
        question: 'How do I change my name?',
        summary: 'Go to **Settings → Account**, change **Name** and select **Save**.',
        body: [
          paragraph(
            'It is what other people see next to your cursor in a shared document. Without a name they see your e-mail address.',
          ),
        ],
      },
      {
        slug: 'newsletter',
        question: 'How do I turn the newsletter on or off?',
        summary: 'Go to **Settings → Account**, change **Subscribe to Newsletter** and select **Save**.',
      },
      {
        slug: 'delete-account',
        question: 'How do I delete my account?',
        summary: 'In the settings. We keep your account, documents and images for 30 days and then delete them for good.',
        draft: true,
      },
    ],
  },
  {
    id: 'subscription',
    title: 'Subscription',
    articles: [
      {
        slug: 'what-does-pro-include',
        question: 'What does Pro include?',
        summary: `Unlimited documents and inviting people by e-mail with their own access. It costs ${link(`${PRO_PRICE} a year`, PRICING_HREF)}.`,
        body: [
          paragraph(
            'Everything else is the same on both plans: every editor feature, sharing by link and live collaboration. Pro also pays for a small team and its servers, which is what keeps pencil case independent.',
          ),
        ],
        related: ['is-it-free', 'invite-by-email'],
      },
      {
        slug: 'upgrade-to-pro',
        question: 'How do I upgrade to Pro?',
        summary: `Go to ${link('Settings → Subscription', UPGRADE_HREF)} in your browser and select **Upgrade to Pro**. You pay on Creem’s checkout page and come straight back.`,
        related: ['who-handles-payment'],
      },
      {
        slug: 'who-handles-payment',
        question: 'Who handles my payment?',
        summary: 'Creem, a European company that sells Pro as our reseller. You pay on their page, so your card details never reach us.',
        body: [
          paragraph(
            'Creem is the merchant of record, which means it also takes care of invoices, sales tax and refunds.',
          ),
        ],
      },
      {
        slug: 'invoices',
        question: 'Where do I find my invoices?',
        summary: 'Creem e-mails a receipt and an invoice after every payment. You also find them under **Settings → Subscription → Manage subscription**.',
      },
      {
        slug: 'cancel-subscription',
        question: 'How do I cancel my subscription?',
        summary: 'Go to **Settings → Subscription → Manage subscription** and cancel on the page that opens.',
        body: [
          paragraph(
            'The first year is a fixed term: if you cancel during it, Pro keeps running until the year is over. After that you can cancel at any time with one month’s notice, and we refund the unused part of the year you paid for.',
          ),
        ],
        related: ['when-pro-ends'],
      },
      {
        slug: 'when-pro-ends',
        question: 'What happens to my documents when Pro ends?',
        summary: 'You keep all of them, and you can still open, edit and delete them.',
        body: [
          paragraph(
            'If you have more than 5, you can only create new ones once you are below the limit again.',
          ),
        ],
        related: ['document-limit'],
      },
      {
        slug: 'failed-payment',
        question: 'What happens if a payment fails?',
        summary: 'Pro stays on while Creem tries again, and you get an e-mail with a link to fix it.',
        body: [
          paragraph(
            'To change your card or other payment method, go to **Settings → Subscription → Manage subscription**.',
          ),
        ],
      },
      {
        slug: 'refunds',
        question: 'Can I get a refund?',
        summary: 'Refunds and your right of withdrawal come under Creem’s terms, as Creem is who you buy Pro from.',
        body: [
          paragraph(
            `If you are not sure where you stand, write to ${EMAIL_LINK} and we will help you sort it out.`,
          ),
        ],
      },
    ],
  },
  {
    id: 'devices',
    title: 'Apps and devices',
    articles: [
      {
        slug: 'phone-browser',
        question: 'Does pencil case work on my phone?',
        summary: 'Yes. It runs in your phone’s browser, with the same documents and the toolbar under your thumb.',
        related: ['ios-and-android-apps'],
      },
      {
        slug: 'ios-and-android-apps',
        question: 'Is there an app for iOS and Android?',
        summary: 'Yes, for iPhone and iPad from the App Store and for Android phones and tablets from Google Play.',
        body: [
          paragraph(
            'The apps show the same documents as the website. Links to a pencil case document open in the app when it is installed.',
          ),
        ],
        draft: true,
      },
      {
        slug: 'buy-pro-in-the-app',
        question: 'Can I buy Pro in the App Store or Google Play?',
        summary: 'No. Pro is sold on our website only. Once you have it, it works in the apps too.',
        draft: true,
      },
      {
        slug: 'dark-mode',
        question: 'Is there a dark mode?',
        summary: 'Yes. The app follows the light or dark setting of your device.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy and data',
    articles: [
      {
        slug: 'hosted-in-the-eu',
        question: 'Where is my data stored?',
        summary: 'In the EU, with European providers and no US company behind them.',
        body: [
          list(
            'Clever Cloud runs the app, its database and its cache',
            'Bunny stores your images',
            'Lettermint sends our e-mails',
            'Creem handles payments',
          ),
          paragraph(`The ${link('privacy policy', PRIVACY_HREF)} has the details on each of them.`),
        ],
      },
      {
        slug: 'can-you-read-my-documents',
        question: 'Can you read my documents?',
        summary: 'We do not read them and do not scan them automatically. We only look at a document when someone reports it or the law requires it.',
        body: [
          paragraph(
            'Documents are not end-to-end encrypted. Our server has to see the changes in order to merge them and pass them on to everyone in the document.',
          ),
        ],
        related: ['report-a-document'],
      },
      {
        slug: 'ai-training',
        question: 'Is my writing used to train AI?',
        summary: 'No. Nothing you write trains any model, ours or anybody else’s.',
        body: [
          paragraph(
            'pencil case has no AI features. If we ever add one, it will be off until you turn it on.',
          ),
        ],
      },
      {
        slug: 'tracking',
        question: 'Do you track me or sell my data?',
        summary: 'No. No ads, no tracking tools and no selling your data. We sell a subscription.',
        body: [
          paragraph(
            'The app sets only the cookies it needs to work: one for your session, one to protect forms and one that remembers your sidebar. Creem’s checkout sets its own when you pay.',
          ),
        ],
      },
      {
        slug: 'open-source',
        question: 'Is pencil case open source?',
        summary: `Yes. The code is public on ${link('GitHub', GITHUB_HREF)} under the AGPL-3.0 licence, so anyone can check what runs their documents.`,
      },
      {
        slug: 'deleted-data',
        question: 'How long do you keep what I delete?',
        summary: 'Deleted documents and their images stay restorable for 30 days and are then deleted for good.',
        body: [
          paragraph(`The ${link('privacy policy', PRIVACY_HREF)} lists how long we keep everything else.`),
        ],
        related: ['restore-a-document'],
      },
    ],
  },
];
