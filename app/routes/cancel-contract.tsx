import { CancelContract } from '~/components/contract-page/contract-page';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Cancel Contract – pencil case' }];
}

export default function CancelContractPage() {
  return (
    <PageLayout header="white">
      <CancelContract />
    </PageLayout>
  );
}
