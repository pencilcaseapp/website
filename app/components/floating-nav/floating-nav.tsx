import { APP_URL, NAV_ITEMS } from '~/constants/links';
import { useActiveSection } from '~/hooks/use-active-section';
import { useScrolledPast } from '~/hooks/use-scrolled-past';
import { Button } from '~/ui/button/button';
import { NavLink } from '~/ui/nav-link/nav-link';

const SHOW_AFTER = 140;
const CUT_ABOVE = 80;

const stagger = (index: number) => ({ '--i': index }) as React.CSSProperties;

/**
 * The section links and Sign in, dropping in as a floating bar once the
 * header has scrolled away (from `md`). Scrolled back to the top it goes
 * without a transition, since the header is there again.
 */
export const FloatingNav: React.FC = () => {
  const isShown = useScrolledPast(SHOW_AFTER);
  const isCut = !useScrolledPast(CUT_ABOVE);
  const activeSection = useActiveSection(NAV_ITEMS.map(item => item.href));

  return (
    <div
      data-shown={isShown ? '' : undefined}
      data-cut={isCut ? '' : undefined}
      inert={!isShown}
      className="float-nav fixed top-2 left-1/2 z-50 hidden w-max -translate-x-1/2 md:block"
    >
      <div className="relative flex items-center gap-1.5 p-[11px]">
        <span
          aria-hidden="true"
          className="float-bar absolute inset-0 -z-10 rounded-full bg-pca-white shadow-[0_0_0_1px_rgb(0_0_0/0.05),0_1px_0_rgb(0_0_0/0.06),0_10px_24px_-8px_rgb(0_0_0/0.18)]"
        />
        <nav aria-label="Sections">
          <ul className="flex gap-1.5">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  isCompact
                  aria-current={activeSection === item.href ? 'true' : undefined}
                  className="float-item bg-pca-yellow-500"
                  style={stagger(index)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          as="a"
          href={APP_URL}
          colorLight="red-600"
          size="extraSmall"
          className="float-item ml-1.5"
          style={stagger(NAV_ITEMS.length)}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};
