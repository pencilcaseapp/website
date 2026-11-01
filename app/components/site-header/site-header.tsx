import { href, Link } from 'react-router';
import { APP_URL, NAV_ITEMS } from '~/constants/links';
import { useActiveSection } from '~/hooks/use-active-section';
import { Container } from '~/ui/container/container';
import { CtaLink } from '~/ui/cta-link/cta-link';
import { Logo } from '~/ui/logo/logo';
import { NavLink } from '~/ui/nav-link/nav-link';

/**
 * The logo, the section links and Sign in. Below `lg` the section links
 * and below `md` Sign in move into the `MobileMenu`.
 */
export const SiteHeader: React.FC = () => {
  const activeSection = useActiveSection(NAV_ITEMS.map(item => item.href));

  return (
    <header className="relative z-20 bg-pca-yellow-500">
      <a
        href="#main"
        className="sr-only rounded-lg bg-pca-white px-4 py-3 font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-center gap-4 md:justify-between">
        <Link
          to={href('/')}
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900"
        >
          <Logo />
        </Link>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex gap-1.5">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  aria-current={activeSection === item.href ? 'true' : undefined}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block">
          <CtaLink href={APP_URL} colorLight="red-600" size="small">
            Sign in
          </CtaLink>
        </div>
      </Container>
    </header>
  );
};
