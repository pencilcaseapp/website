import { PrivacyPolicy } from '~/components/privacy-policy/privacy-policy';
import { PageLayout } from '~/components/page-layout/page-layout';
import { pageMeta } from '~/utils/meta';

export const meta = () => pageMeta({
  title: 'Privacy Policy – pencil case',
  description:
    'What pencil case stores about you, why, and for how long. No tracking, hosted in the EU.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <PageLayout header="white">
      <PrivacyPolicy />
    </PageLayout>
  );
}
