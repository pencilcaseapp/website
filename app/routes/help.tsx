import { Help } from '~/components/help/help';
import { PageLayout } from '~/components/page-layout/page-layout';
import { getHelpSections } from '~/utils/help.server';
import { pageMeta } from '~/utils/meta';
import type { Route } from './+types/help';

export function loader() {
  return { sections: getHelpSections() };
}

export const meta = () => pageMeta({
  title: 'Help – pencil case',
  description:
    'Answers to questions about pencil case, and a way to write to us.',
  path: '/help',
});

export default function HelpPage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout header="white">
      <Help sections={loaderData.sections} />
    </PageLayout>
  );
}
