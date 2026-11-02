import { Help } from '~/components/help/help';
import { PageLayout } from '~/components/page-layout/page-layout';
import { getHelpSections } from '~/utils/help.server';
import type { Route } from './+types/help';

export function loader() {
  return { sections: getHelpSections() };
}

export function meta() {
  return [
    { title: 'Help – pencil case' },
    {
      name: 'description',
      content: 'Answers to questions about pencil case, and a way to write to us.',
    },
  ];
}

export default function HelpPage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout header="white">
      <Help sections={loaderData.sections} />
    </PageLayout>
  );
}
