import { LegalNotice } from '~/components/legal-notice/legal-notice';
import { PageLayout } from '~/components/page-layout/page-layout';
import { pageMeta } from '~/utils/meta';

export const meta = () => pageMeta({
  title: 'Legal Notice – pencil case',
  description:
    'Who runs pencil case and how to reach us.',
  path: '/legal-notice',
});

export default function LegalNoticePage() {
  return (
    <PageLayout header="white">
      <LegalNotice />
    </PageLayout>
  );
}
