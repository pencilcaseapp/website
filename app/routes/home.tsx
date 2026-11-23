import { Apps } from '~/components/apps/apps';
import { Features } from '~/components/features/features';
import { Hero } from '~/components/hero/hero';
import { PageLayout } from '~/components/page-layout/page-layout';
import { Pricing } from '~/components/pricing/pricing';
import { SmallTech } from '~/components/small-tech/small-tech';
import { homeStructuredData, pageMeta } from '~/utils/meta';

export const meta = () => [
  ...pageMeta({
    title: 'pencil case – A European docs alternative',
    description:
      'A European alternative for writing docs and sharing them with your friends.',
    path: '/',
  }),
  ...homeStructuredData(),
];

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <SmallTech />
      <Pricing />
      <Apps />
    </PageLayout>
  );
}
