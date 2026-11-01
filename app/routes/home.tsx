import { Features } from '~/components/features/features';
import { FloatingNav } from '~/components/floating-nav/floating-nav';
import { Hero } from '~/components/hero/hero';
import { MobileMenu } from '~/components/mobile-menu/mobile-menu';
import { Pricing } from '~/components/pricing/pricing';
import { SiteFooter } from '~/components/site-footer/site-footer';
import { SiteHeader } from '~/components/site-header/site-header';

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
    <>
      <SiteHeader />
      <FloatingNav />
      <MobileMenu />
      <main
        id="main"
        className="relative z-10 rounded-b-[2.5rem] bg-pca-white pb-24"
      >
        <Hero />
        <Features />
        <Pricing />
      </main>
      <SiteFooter />
    </>
  );
}
