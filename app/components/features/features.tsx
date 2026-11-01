import classNames from 'classnames';
import { useRef, useState } from 'react';
import { APP_URL } from '~/constants/links';
import { FEATURES } from '~/constants/features';
import { useCarousel } from '~/hooks/use-carousel';
import { Button } from '~/ui/button/button';
import { Container } from '~/ui/container/container';
import { Icon } from '~/ui/icon/icon';
import { FeatureCard } from './feature-card';

const ROW_ID = 'feature-row';

export const Features: React.FC = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { atStart, atEnd, step } = useCarousel(rowRef, '.fan-card');
  const [open, setOpen] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);

  const toggle = (index: number) => {
    setOpen(open => (open === index ? null : index));
    setFlipped(false);
  };

  return (
    <section id="features" className="overflow-x-clip pt-36 sm:pt-48">
      <div className="fan-panel relative isolate mx-auto max-w-[1680px]">
        <Container>
          <div className="mx-auto flex max-w-[56ch] flex-col items-center text-center">
            <h2 className="type-section">Features</h2>
            <p className="type-lead mt-4 text-balance">
              <span className="sm:block">
                Discover what pencil case does for you.
              </span>
              {' '}
              <span className="sm:block">These five are just the start.</span>
            </p>
            <Button as="a" href={APP_URL} className="mt-8">
              Get started
            </Button>
          </div>
        </Container>
        <div className="relative mt-10 lg:mt-16">
          <StepButton direction={-1} hidden={atStart} onClick={step} />
          <StepButton direction={1} hidden={atEnd} onClick={step} />
          {/* `overflow-y-hidden`: with only `overflow-x` set, the browser
              makes the row scroll vertically too, and the tilted cards
              overhang it by a few pixels. A vertical swipe over the cards
              then latched onto the row instead of moving the page. */}
          <div
            id={ROW_ID}
            ref={rowRef}
            tabIndex={0}
            role="region"
            aria-label="The five features, side by side"
            className={classNames(
              'fan-scroller snap-x snap-mandatory overflow-x-auto',
              'overflow-y-hidden overscroll-x-contain [scrollbar-width:none]',
              '[&::-webkit-scrollbar]:hidden',
            )}
          >
            <ol className="isolate flex w-max items-start py-10">
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  count={FEATURES.length}
                  open={open === index}
                  flipped={flipped}
                  afterOpen={open === index - 1}
                  onToggle={() => toggle(index)}
                  onFlip={() => setFlipped(flipped => !flipped)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepButtonProps {
  direction: 1 | -1;
  hidden: boolean;
  onClick: (direction: 1 | -1) => void;
}

const StepButton: React.FC<StepButtonProps> = ({
  direction,
  hidden,
  onClick,
}) => (
  <button
    type="button"
    aria-label={direction > 0 ? 'Next feature' : 'Previous feature'}
    aria-controls={ROW_ID}
    disabled={hidden}
    onClick={() => onClick(direction)}
    className={classNames(
      'absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 md:grid',
      'place-items-center rounded-full bg-pca-grey-900 text-pca-white',
      'shadow-[0_0_0_3px_var(--color-pca-white)] hover:bg-pca-grey-800',
      'transition-[opacity,scale] duration-200 ease-out active:scale-[0.96]',
      'motion-reduce:transition-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-pca-grey-900',
      hidden && 'pointer-events-none scale-75 opacity-0',
      direction > 0 ? 'right-3 lg:right-6' : 'left-3 lg:left-6',
    )}
  >
    <Icon
      icon="arrowRight"
      className={classNames('size-6', direction < 0 && '-scale-x-100')}
    />
  </button>
);
