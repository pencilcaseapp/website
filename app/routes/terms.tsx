import { TermsOfUse } from '~/components/terms-of-use/terms-of-use';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Terms of Use – pencil case' }];
}

export default function TermsOfUsePage() {
  return (
    <PageLayout header="white">
      <TermsOfUse />
    </PageLayout>
  );
}
