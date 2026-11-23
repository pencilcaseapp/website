import classNames from 'classnames';
import { APP_URL } from '~/constants/links';
import { PRINCIPLES, type Principle } from '~/constants/small-tech';
import { useStackedPanels } from '~/hooks/use-stacked-panels';
import { Button } from '~/ui/button/button';
import { Container } from '~/ui/container/container';
import { plausibleEvent } from '~/utils/analytics';

const TITLE = 'Small Tech';

/**
 * What we stand for, one principle per screen. The panels stick and pile
 * up on each other as the page scrolls, each tipping back as the next one
 * covers it.
 */
export const SmallTech: React.FC = () => {
  const ref = useStackedPanels<HTMLElement>();

  return (
    <section
      id="small-tech"
      ref={ref}
      className="stack relative overflow-y-clip"
    >
      <Container className="py-24 text-center lg:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="type-section">{TITLE}</h2>
          <p className="type-lead mt-4 text-balance">
            We build a product for people, not machines.
          </p>
          <Button
            as="a"
            href={APP_URL}
            className={classNames(
              'mt-8',
              plausibleEvent('Get started', { location: 'small tech' }),
            )}
          >
            Get started
          </Button>
        </div>
      </Container>
      {PRINCIPLES.map((principle, index) => (
        <Panel key={principle.id} principle={principle} index={index} />
      ))}
    </section>
  );
};

interface PanelProps {
  principle: Principle;
  index: number;
}

const Panel: React.FC<PanelProps> = ({ principle, index }) => (
  <article
    className="stack-panel sticky min-h-lvh overflow-x-clip"
    style={{ zIndex: index + 1 }}
  >
    <div
      aria-hidden="true"
      className={classNames(
        'absolute -inset-x-[4vw] -top-[1.2vh] -bottom-[6vh] -z-10',
        principle.background,
        principle.tilt,
      )}
    />
    <Container
      className={classNames(
        'flex min-h-svh flex-col pt-8 pb-32 sm:pt-14 sm:pb-22 lg:py-16',
        principle.dark ? 'text-pca-grey-900' : 'text-pca-white',
      )}
    >
      <div
        className={classNames(
          'flex flex-1 flex-col justify-end sm:grid sm:grid-cols-[3fr_2fr]',
          'sm:items-center sm:gap-x-8 lg:grid-cols-[7fr_5fr]',
          'lg:gap-x-12',
        )}
      >
        <Art
          principle={principle}
          className="relative mx-auto mb-8 w-[clamp(9rem,42vw,16rem)] sm:hidden"
        />
        <div
          className={classNames(
            'flex flex-col items-center text-center sm:items-start',
            'sm:text-left',
          )}
        >
          {/* Three clear steps: a small label that says where you are,
              right on top of the headline it belongs to, the headline,
              and the text at a reading size and a reading width, closer
              to its headline than to the button. */}
          <p className="type-label mb-3 text-[0.8125rem] tracking-[0.14em] uppercase lg:mb-5">
            {TITLE}
          </p>
          <h3
            className={classNames(
              'type-hero text-[clamp(2.5rem,7.2vw,6rem)]',
              'sm:max-lg:text-[clamp(2.25rem,5.6vw,6rem)]',
              'lg:text-[clamp(2.5rem,6.2vw,5.5rem)]',
            )}
          >
            {principle.headline.map((line, index) => (
              <span key={line} className="block">
                {index > 0 && ' '}
                {line}
              </span>
            ))}
          </h3>
          <p className="type-lead mt-5 max-w-[34ch] leading-[1.55] sm:max-w-[40ch] lg:mt-6">
            {principle.body}
          </p>
          <Button
            as="a"
            href={APP_URL}
            colorLight={principle.dark ? 'grey-900' : 'white'}
            outlineColor={principle.dark ? 'grey-900' : 'white'}
            className={classNames(
              'mt-8 lg:mt-10',
              plausibleEvent('Get started', {
                location: `small tech ${principle.id}`,
              }),
            )}
          >
            Get started
          </Button>
        </div>
        <div className="hidden h-full min-h-0 items-center justify-center sm:flex">
          <Art
            principle={principle}
            className="relative w-[min(100%,52vh)] lg:w-[min(100%,60vh)]"
          />
        </div>
      </div>
    </Container>
  </article>
);

interface ArtProps {
  principle: Principle;
  className: string;
}

/** The drawing, a mask filled with the text colour. */
const Art: React.FC<ArtProps> = ({ principle, className }) => (
  <span
    aria-hidden="true"
    className={classNames('block aspect-square', className)}
  >
    {principle.fill && (
      <Drawing art={principle.fill.art} className={principle.fill.color} />
    )}
    <Drawing art={`/small-tech/${principle.id}.webp`} className="bg-current" />
  </span>
);

const Drawing: React.FC<{ art: string; className: string }> = ({
  art,
  className,
}) => (
  <span
    className={classNames('stack-drawing absolute inset-0', className)}
    style={{ '--art': `url(${art})` } as React.CSSProperties}
  />
);
