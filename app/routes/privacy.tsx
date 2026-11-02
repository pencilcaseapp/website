import { PrivacyPolicy } from '~/components/privacy-policy/privacy-policy';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Privacy Policy – pencil case' }];
}

export default function PrivacyPolicyPage() {
  return (
    <PageLayout header="white">
      <PrivacyPolicy />
    </PageLayout>
  );
}
