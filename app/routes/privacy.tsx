import { PrivacyPolicy } from '~/components/privacy-policy/privacy-policy';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Privacy policy – pencil case' }];
}

export default function Privacy() {
  return (
    <PageLayout header="white">
      <PrivacyPolicy />
    </PageLayout>
  );
}
