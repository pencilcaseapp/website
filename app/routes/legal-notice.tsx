import { LegalNotice } from '~/components/legal-notice/legal-notice';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Legal Notice – pencil case' }];
}

export default function LegalNoticePage() {
  return (
    <PageLayout header="white">
      <LegalNotice />
    </PageLayout>
  );
}
