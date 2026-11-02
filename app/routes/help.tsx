import { Help } from '~/components/help/help';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [
    { title: 'Help – pencil case' },
    {
      name: 'description',
      content: 'Answers to questions about pencil case, and a way to write to us.',
    },
  ];
}

export default function HelpPage() {
  return (
    <PageLayout header="white">
      <Help />
    </PageLayout>
  );
}
