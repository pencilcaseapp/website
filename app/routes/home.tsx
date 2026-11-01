import { Features } from '~/components/features/features';
import { Hero } from '~/components/hero/hero';
import { PageLayout } from '~/components/page-layout/page-layout';
import { Pricing } from '~/components/pricing/pricing';

export function meta() {
  return [
    { title: 'pencil case – Docs, dead simple.' },
    {
      name: 'description',
      content: 'The European alternative for writing docs and sharing them with your friends.',
    },
  ];
}

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <Pricing />
    </PageLayout>
  );
}
