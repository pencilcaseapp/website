import classNames from 'classnames';
import { APP_URL } from '~/constants/links';
import type { Feature } from '~/constants/features';
import { Button } from '~/ui/button/button';
import { Icon } from '~/ui/icon/icon';

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

const FOCUS_RING = classNames(
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-pca-grey-900',
);

export interface FeatureCardProps {
  feature: Feature;
  index: number;
  count: number;
  /** Picked out of the fan: straightened, on top, with room on both sides. */
  open: boolean;
  /** Showing its back, the list of what the feature does. */
  flipped: boolean;
  /** The card before this one is open, so this one moves aside. */
  afterOpen: boolean;
  onToggle: () => void;
  onFlip: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  index,
  count,
  open,
  flipped,
  afterOpen,
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
  const showsBack = open && flipped;

  return (
    <li
      className={classNames(
        'fan-card relative w-[min(25rem,calc(100vw-4rem))] shrink-0 snap-start',
        'transition-[rotate,translate,margin-left] duration-300 ease-in-out',
        'hover:z-10 hover:rotate-0 motion-reduce:transition-none',
        'lg:hover:-translate-y-2',
        index > 0 && (open || afterOpen ? 'ml-5' : '-ml-9'),
        look.tilt,
      )}
      style={{ zIndex: open ? count : index, rotate: open ? '0deg' : undefined }}
    >
      <div
        className="fan-card-body relative"
        data-flipped={showsBack ? '' : undefined}
      >
        <div className={face} inert={showsBack}>
          <button
            type="button"
            aria-label={open ? `Close ${name}` : `Open ${name}`}
            aria-expanded={open}
            onClick={onToggle}
            className={classNames(
              'absolute inset-0 cursor-pointer rounded-[2.75rem]',
              FOCUS_RING,
            )}
          />
          <FlipButton label="Turn the card over" shown={open} onClick={onFlip} />
          <p className="type-hand-lg text-center">{label}</p>
          <div
            aria-hidden="true"
            className="mt-6 flex h-52 items-end justify-center sm:h-64"
          >
            <img
              src={`/features/${feature.id}.webp`}
              alt=""
              width={640}
              height={640}
              loading="lazy"
              className="pointer-events-none h-full w-auto select-none"
            />
          </div>
          <h3 className="type-title mt-8">{feature.title}</h3>
          <p className="type-card mt-4">{feature.lead}</p>
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
          <FlipButton label="Turn the card back" shown onClick={onFlip} />
          <p className="type-hand-lg text-center">{label}</p>
          <h3 className="type-title mt-8">{feature.title}</h3>
          <ul className="mt-6 flex flex-col gap-2.5">
            {feature.points.map(point => (
              <li key={point} className="type-body flex items-start gap-3">
                <Icon icon="check" className="mt-[0.15em] size-5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto pt-8">
            <Button as="a" href={APP_URL} size="medium" className="w-full">
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
