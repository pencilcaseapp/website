import { WithdrawContract } from '~/components/contract-page/contract-page';
import { PageLayout } from '~/components/page-layout/page-layout';
import { pageMeta } from '~/utils/meta';

export const meta = () => pageMeta({
  title: 'Withdraw Contract – pencil case',
  description:
    'Changed your mind about pencil case Pro? Withdraw within 14 days of buying it, no reason needed.',
  path: '/withdraw-contract',
});

export default function WithdrawContractPage() {
  return (
    <PageLayout header="white">
      <WithdrawContract />
    </PageLayout>
  );
}
