import { TermsOfUse } from '~/components/terms-of-use/terms-of-use';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Terms of use – pencil case' }];
}

export default function Terms() {
  return (
    <PageLayout header="white">
      <TermsOfUse />
    </PageLayout>
  );
}
