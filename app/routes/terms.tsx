import { TermsOfUse } from '~/components/terms-of-use/terms-of-use';
import { PageLayout } from '~/components/page-layout/page-layout';
import { pageMeta } from '~/utils/meta';

export const meta = () => pageMeta({
  title: 'Terms of Use – pencil case',
  description:
    'The terms for using pencil case and buying Pro.',
  path: '/terms',
});

export default function TermsOfUsePage() {
  return (
    <PageLayout header="white">
      <TermsOfUse />
    </PageLayout>
  );
}
