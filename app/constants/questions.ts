import { FREE_DOCUMENT_LIMIT } from './plans';

export interface Question {
  id: string;
  question: string;
  answer: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 'subscription',
    question: 'Do I need a subscription?',
    answer: `No. Free gives you ${FREE_DOCUMENT_LIMIT} documents for life, with sharing by link, live collaboration and every editor feature. Pro is for when you want more than ${FREE_DOCUMENT_LIMIT}.`,
  },
  {
    id: 'pro',
    question: 'What do I get with Pro?',
    answer: 'As many documents as you like, and inviting people by e-mail, each with their own say over whether they can view or edit. The editor, sharing by link and live collaboration are the same on both plans.',
  },
  {
    id: 'payment',
    question: 'How do I pay?',
    answer: 'Select Buy, sign in and pay on the checkout of Creem, the European company that sells Pro for us. Your card details never reach us, and Creem e-mails you a receipt and an invoice.',
  },
  {
    id: 'cancel',
    question: 'How can I cancel my subscription?',
    answer: 'In the settings of the app, or without signing in through “cancel contract” at the bottom of this page. The first year runs to its end. After that you can cancel with one month’s notice and we refund the rest of the year. You keep every document either way.',
  },
  {
    id: 'withdraw',
    question: 'What if I change my mind?',
    answer: 'You can withdraw within 14 days of buying Pro, through “withdraw contract” at the bottom of this page. You need no reason and no sign-in, and we e-mail you a confirmation.',
  },
  {
    id: 'app-stores',
    question: 'Can I buy Pro in the App Store or on Google Play?',
    answer: 'No. The iOS and Android apps sell nothing: Pro is bought here, on our website. Once you have it, it works in the apps too.',
  },
  {
    id: 'friends',
    question: 'Do my friends need an account to collaborate with me?',
    answer: 'No. Turn on the link, send it, and they are in the document right away. Only the person who owns the document needs an account.',
  },
];
