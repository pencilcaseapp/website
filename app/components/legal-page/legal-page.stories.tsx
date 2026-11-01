import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegalNotice } from '~/components/legal-notice/legal-notice';
import { PrivacyPolicy } from '~/components/privacy-policy/privacy-policy';
import { TermsOfUse } from '~/components/terms-of-use/terms-of-use';
import { LegalPage } from './legal-page';

/** The legal texts, each on its own page behind the footer links. */
const meta = {
  title: 'Sections/LegalPage',
  component: LegalPage,
  parameters: { layout: 'fullscreen' },
  args: { title: 'Legal notice' },
} satisfies Meta<typeof LegalPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LegalNoticePage: Story = {
  render: () => <LegalNotice />,
};

export const PrivacyPolicyPage: Story = {
  render: () => <PrivacyPolicy />,
};

export const TermsOfUsePage: Story = {
  render: () => <TermsOfUse />,
};
