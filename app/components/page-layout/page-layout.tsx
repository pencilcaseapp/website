import { FloatingNav } from '~/components/floating-nav/floating-nav';
import { MobileMenu } from '~/components/mobile-menu/mobile-menu';
import { SiteFooter } from '~/components/site-footer/site-footer';
import {
  SiteHeader,
  type SiteHeaderProps,
} from '~/components/site-header/site-header';

export interface PageLayoutProps extends React.PropsWithChildren {
  header?: SiteHeaderProps['tone'];
}

/**
 * The header, the navigation and the footer around a page's content, a
 * white sheet with rounded bottom corners over the footer.
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  children,
}) => (
  <>
    <SiteHeader tone={header} />
    <FloatingNav />
    <MobileMenu />
    <main
      id="main"
      className="relative z-10 rounded-b-[2.5rem] bg-pca-white pb-24"
    >
      {children}
    </main>
    <SiteFooter />
  </>
);
