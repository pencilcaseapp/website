import { WithdrawContract } from '~/components/contract-page/contract-page';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Withdraw Contract – pencil case' }];
}

export default function WithdrawContractPage() {
  return (
    <PageLayout header="white">
      <WithdrawContract />
    </PageLayout>
  );
}
