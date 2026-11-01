import classNames from 'classnames';
import {
  APP_URL,
  CONTACT_EMAIL,
  FOOTER_LINKS,
  LEGAL_LINKS,
} from '~/constants/links';
import { Button } from '~/ui/button/button';
import { Container } from '~/ui/container/container';
import { Eyes } from '~/ui/eyes/eyes';
import { Logo } from '~/ui/logo/logo';

const TILTS = [
  '-rotate-2',
  'rotate-1',
  '-rotate-1',
  'rotate-2',
  '-rotate-[1.5deg]',
];

const PILL = 'hover:-translate-y-0.5 hover:rotate-0';

const CAPTION_LINK = classNames(
  'flex h-11 items-center transition-colors duration-150 ease-out',
  'hover:text-pca-white focus-visible:outline-2',
  'focus-visible:outline-offset-2 focus-visible:outline-pca-white',
);

/**
 * The dark footer the page's white sheet slides over: the links as tilted
 * pills, the logo and the small print. Below `md` it leaves room for the
 * floating menu.
 */
export const SiteFooter: React.FC = () => (
  <footer
    className={classNames(
      '-mt-10 bg-pca-grey-900 pt-22 text-pca-white',
      'pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]',
      'selection:bg-pca-yellow-500 selection:text-pca-grey-900',
      'md:pb-[calc(3rem+env(safe-area-inset-bottom,0px))]',
    )}
  >
    <Eyes />
    <Container className="mt-16 flex flex-col items-center text-center">
      <ul className="flex max-w-[42rem] flex-wrap justify-center gap-3">
        {FOOTER_LINKS.map((link, index) => (
          <li key={link.label}>
            <Button
              as="a"
              href={link.href}
              {...link.isExternal && { target: '_blank', rel: 'noreferrer' }}
              colorLight="white"
              size="medium"
              outlineColor="white"
              isExternal={link.isExternal}
              className={classNames(PILL, TILTS[index % TILTS.length])}
            >
              {link.label}
            </Button>
          </li>
        ))}
        <li>
          <Button
            as="a"
            href={APP_URL}
            colorLight="pop-yellow"
            size="medium"
            outlineColor="white"
            className={classNames(PILL, 'rotate-2')}
          >
            Get started
          </Button>
        </li>
      </ul>
      <div className="mt-12">
        <Logo tone="light" />
      </div>
    </Container>
    <Container
      className={classNames(
        'mt-16 flex flex-col items-center gap-x-8 gap-y-2 border-t',
        'border-pca-white/10 pt-4 text-center lg:flex-row lg:justify-between',
        'lg:text-left',
      )}
    >
      <p
        className={classNames(
          'type-caption flex flex-wrap items-center justify-center gap-x-3',
          'py-3 text-pca-grey-500',
        )}
      >
        <span>
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          pencil case
        </span>
        <span aria-hidden="true" className="text-pca-grey-700">·</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className={classNames(CAPTION_LINK, '-my-3')}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <nav aria-label="Legal">
        <ul className="flex flex-wrap justify-center gap-x-6">
          {LEGAL_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={classNames(
                  'type-caption text-pca-grey-500',
                  CAPTION_LINK,
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </footer>
);
