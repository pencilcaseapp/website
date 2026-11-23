import classNames from 'classnames';
import { APP_URL } from '~/constants/links';
import type { Feature } from '~/constants/features';
import { Button } from '~/ui/button/button';
import { Icon } from '~/ui/icon/icon';
import { plausibleEvent } from '~/utils/analytics';

const LOOKS = [
  {
    color: 'bg-pca-pop-blue',
    tilt: '-rotate-2 lg:-rotate-3 lg:translate-y-6',
  },
  { color: 'bg-pca-pop-pink', tilt: 'rotate-1 lg:-translate-y-2' },
  {
    color: 'bg-pca-pop-yellow',
    tilt: 'rotate-2 lg:rotate-3 lg:translate-y-8',
  },
  {
    color: 'bg-pca-pop-green',
    tilt: '-rotate-1 lg:-rotate-2 lg:translate-y-2',
  },
  {
    color: 'bg-pca-pop-orange',
    tilt: 'rotate-2 lg:rotate-3 lg:translate-y-6',
  },
];

// The card's name: as large as the longest one ("Collaborate") can be on
// a narrow phone without reaching the strip the next card lies over.
const TITLE = 'type-title text-[clamp(1.25rem,6.4vw,2rem)]';

const FOCUS_RING = classNames(
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-pca-grey-900',
);

export interface FeatureCardProps {
  feature: Feature;
  index: number;
  count: number;
  /**
   * The hand is spread out: every card is straightened, has room on both
   * sides and shows its turn over button.
   */
  spread: boolean;
  /** Showing its back, the list of what the feature does. */
  flipped: boolean;
  onToggle: () => void;
  onFlip: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  index,
  count,
  spread,
  flipped,
  onToggle,
  onFlip,
}) => {
  const look = LOOKS[index % LOOKS.length];
  const name = `${feature.title}, feature ${index + 1} of ${count}`;
  const label = feature.soon ? 'Coming soon' : `Feature #${index + 1}`;
  const face = classNames(
    'fan-face flex flex-col rounded-[2.75rem] p-8 sm:p-10',
    look.color,
  );
  const showsBack = spread && flipped;

  return (
    <li
      className={classNames(
        'fan-card relative w-[min(25rem,calc(100vw-4rem))] shrink-0 snap-start',
        'transition-[rotate,translate,margin-left] duration-300 ease-in-out',
        'motion-reduce:transition-none',
        // In the fan a card under the pointer straightens and lifts, to
        // say it can be picked. Spread out, the cards hold still: there
        // the turn over button is what to press.
        !spread && 'hover:z-10 hover:rotate-0 lg:hover:-translate-y-2',
        index > 0 && (spread ? 'ml-5' : '-ml-9'),
        look.tilt,
      )}
      style={{ zIndex: index, rotate: spread ? '0deg' : undefined }}
    >
      <div
        className="fan-card-body relative"
        data-flipped={showsBack ? '' : undefined}
      >
        <div className={face} inert={showsBack}>
          <button
            type="button"
            aria-label={spread ? `Close ${name}` : `Open ${name}`}
            aria-expanded={spread}
            onClick={onToggle}
            className={classNames(
              'absolute inset-0 cursor-pointer rounded-[2.75rem]',
              FOCUS_RING,
            )}
          />
          <FlipButton
            label="Turn the card over"
            shown={spread && !flipped}
            onClick={onFlip}
          />
          <p className="type-hand text-center">{label}</p>
          <div
            aria-hidden="true"
            className="mt-6 flex h-52 items-end justify-center sm:h-64"
          >
            <img
              src={`/features/${feature.id}.webp`}
              alt=""
              width={640}
              height={640}
              className="pointer-events-none h-full w-auto select-none"
            />
          </div>
          {/* The next card lies over this one's right edge: 36px of it,
              and a little more where the two tilt towards each other. The
              text keeps clear of that strip, so the cards overlap without
              covering a word. */}
          <div className="mt-8 pr-6 sm:pr-4">
            <h3 className={TITLE}>{feature.title}</h3>
            <p className="type-card mt-2 text-[1rem]">{feature.lead}</p>
          </div>
        </div>
        <div className={classNames(face, 'fan-face-back')} inert={!showsBack}>
          <button
            type="button"
            aria-label={`Close ${name}`}
            onClick={onToggle}
            className={classNames(
              'absolute inset-0 cursor-pointer rounded-[2.75rem]',
              FOCUS_RING,
            )}
          />
          <FlipButton
            label="Turn the card back"
            shown={showsBack}
            onClick={onFlip}
          />
          <p className="type-hand text-center">{label}</p>
          <h3 className={classNames(TITLE, 'mt-8')}>{feature.title}</h3>
          <ul className="mt-6 flex flex-col gap-2.5">
            {feature.points.map(point => (
              <li key={point} className="type-body flex items-start gap-3">
                <Icon icon="check" className="mt-[0.15em] size-5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto pt-8">
            <Button
              as="a"
              href={APP_URL}
              size="medium"
              className={classNames(
                'w-full',
                plausibleEvent('Get started', { location: 'feature card' }),
              )}
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

interface FlipButtonProps {
  label: string;
  shown: boolean;
  onClick: () => void;
}

const FlipButton: React.FC<FlipButtonProps> = ({ label, shown, onClick }) => (
  <button
    type="button"
    aria-label={label}
    tabIndex={shown ? undefined : -1}
    aria-hidden={!shown}
    onClick={onClick}
    className={classNames(
      'absolute top-5 right-5 z-10 grid size-11 place-items-center',
      'rounded-full bg-pca-grey-900 text-pca-white hover:bg-pca-grey-800',
      'transition-[opacity,scale] duration-200 ease-out active:scale-[0.96]',
      'motion-reduce:transition-none',
      !shown && 'pointer-events-none scale-75 opacity-0',
      FOCUS_RING,
    )}
  >
    <Icon icon="turnOver" className="size-6" />
  </button>
);
