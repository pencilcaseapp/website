import { CancelContract } from '~/components/contract-page/contract-page';
import { PageLayout } from '~/components/page-layout/page-layout';
import { pageMeta } from '~/utils/meta';

export const meta = () => pageMeta({
  title: 'Cancel Contract – pencil case',
  description:
    'Cancel pencil case Pro here, no sign-in needed.',
  path: '/cancel-contract',
});

export default function CancelContractPage() {
  return (
    <PageLayout header="white">
      <CancelContract />
    </PageLayout>
  );
}
