import { Dialog } from '@base-ui/react/dialog';
import classNames from 'classnames';
import { useState } from 'react';
import { APP_URL, NAV_ITEMS } from '~/constants/links';
import { CtaLink } from '~/ui/cta-link/cta-link';
import { Logo } from '~/ui/logo/logo';

const BAR = 'fixed bottom-6 left-1/2 grid w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 auto-cols-fr grid-flow-col items-center gap-2';

const BAR_BUTTON = classNames(
  'type-button flex h-13 w-full min-w-32 items-center justify-center gap-2.5',
  'rounded-full bg-pca-white text-lg text-pca-grey-900',
  'shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_8px_24px_-8px_rgb(0_0_0/0.35)]',
  'transition-[scale] duration-150 ease-out active:scale-[0.96]',
  'motion-reduce:transition-none focus-visible:outline-2',
  'focus-visible:outline-offset-2',
);

// Each item rises into place a little after the one above it.
const STAGGERED = classNames(
  'transition-[opacity,translate] duration-700',
  'ease-[cubic-bezier(.22,1,.36,1)] delay-[calc(0.3s+var(--i)*65ms)]',
  'group-data-starting-style:translate-y-7',
  'group-data-starting-style:opacity-0 motion-reduce:transition-none',
);

const stagger = (index: number) => ({ '--i': index }) as React.CSSProperties;

/**
 * Below `md` the navigation lives in a sheet behind a Menu button, which
 * floats at the bottom of the screen next to Sign in, under the thumb.
 */
export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={classNames(BAR, 'z-40 md:hidden')}>
        <Dialog.Trigger
          className={classNames(BAR_BUTTON, 'focus-visible:outline-pca-grey-900')}
        >
          <MenuIcon />
          Menu
        </Dialog.Trigger>
        <SignInLink />
      </div>
      <Dialog.Portal>
        <Dialog.Popup
          className={classNames(
            'group fixed inset-0 z-50 flex flex-col overflow-y-auto',
            'overscroll-contain bg-pca-grey-900 text-pca-white md:hidden',
            '[clip-path:inset(0)] transition-[clip-path] duration-600',
            'ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none',
            'data-starting-style:[clip-path:inset(0_0_100%)]',
            'data-ending-style:[clip-path:inset(0_0_100%)]',
            'data-ending-style:duration-400',
            'data-ending-style:ease-[cubic-bezier(.25,.46,.45,.94)]',
          )}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div
            className={classNames(
              'flex h-16 shrink-0 items-center justify-center px-4 sm:px-8',
              STAGGERED,
            )}
            style={stagger(-1)}
          >
            <Logo tone="light" />
          </div>
          <nav
            aria-label="Main"
            className="flex grow flex-col justify-center px-4 pt-4 pb-28 sm:px-8"
          >
            <ul>
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className={STAGGERED}
                  style={stagger(index)}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="type-menu inline-flex items-center rounded-md py-1.5 lowercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pca-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={BAR}>
            <Dialog.Close
              className={classNames(BAR_BUTTON, 'focus-visible:outline-pca-white')}
            >
              <MenuIcon isOpen />
              Close
            </Dialog.Close>
            <SignInLink />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const SignInLink: React.FC = () => (
  <CtaLink
    href={APP_URL}
    colorLight="red-600"
    size="medium"
    className="w-full shadow-floating"
  >
    Sign in
  </CtaLink>
);

const MenuIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
  >
    <path d={isOpen ? 'M3 3l10 10M13 3L3 13' : 'M2 5h12M2 11h12'} />
  </svg>
);
