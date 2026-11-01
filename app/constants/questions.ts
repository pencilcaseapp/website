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
    answer: `No. Free gives you ${FREE_DOCUMENT_LIMIT} documents for life, with sharing, live collaboration and every editor feature. Pro is for when you want more than ${FREE_DOCUMENT_LIMIT}.`,
  },
  {
    id: 'cancel',
    question: 'How can I cancel my subscription?',
    answer: 'Any time, from the settings. Pro is billed once a year and keeps running until the end of the year you paid for.',
  },
  {
    id: 'app-stores',
    question: 'Can I buy a subscription in the Apple App Store or Google Play Store?',
    answer: 'No. pencil case is not in the app stores, so Pro is bought here, on our website, from the settings in the app.',
  },
  {
    id: 'friends',
    question: 'Do my friends need an account to collaborate with me?',
    answer: 'No. Turn on the link, send it, and they are in the document right away — as a Capybara or an Axolotl. Only the person who owns the document needs an account.',
  },
  {
    id: 'folders',
    question: 'Can I share an entire folder?',
    answer: 'Not yet. Today you share one document at a time, by link or by inviting someone by e-mail. Sharing a whole space at once is on its way.',
  },
  {
    id: 'apps',
    question: 'Do you have apps for iOS and Android?',
    answer: 'Not as apps from a store. pencil case runs in the browser on your phone, with the same documents and the toolbar under your thumb — nothing to install and nothing to keep up to date.',
  },
];
