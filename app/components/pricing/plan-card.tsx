import classNames from 'classnames';
import type { Plan } from '~/constants/plans';
import { Button, type ButtonColor } from '~/ui/button/button';
import { Icon } from '~/ui/icon/icon';
import { plausibleEvent } from '~/utils/analytics';

const LOOKS: Record<Plan['id'], { card: string; button: ButtonColor }> = {
  free: { card: 'bg-pca-grey-100', button: 'white' },
  pro: { card: 'bg-pca-pop-yellow', button: 'grey-900' },
};

export interface PlanCardProps {
  plan: Plan;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const look = LOOKS[plan.id];

  return (
    <article
      className={classNames(
        'flex flex-col rounded-[2rem] p-8 sm:p-10',
        look.card,
      )}
    >
      {/* The name steps back so the price leads: the same face at its
          regular weight. The lighter cuts get faint at the 22px this has
          on a phone. */}
      <h3 className="type-subtitle font-normal">{plan.name}</h3>
      <p className="mt-6 flex items-baseline gap-2">
        {/* The price is drawn one and a half times as wide as it is laid
            out (`type-price`); the empty second column is the room for
            that, half the width of the first. */}
        <span className="inline-grid grid-cols-[2fr_1fr]">
          {/* Set tight, "25€": at this size the space of "25 €" (as it
              is written everywhere else) reads as a gap. */}
          <span className="type-price">{plan.price.replace(/\s/, '')}</span>
        </span>
        <span className="type-card max-sm:text-[1rem]">{plan.period}</span>
      </p>
      {/* One line in the full-width card. Narrower cards wrap it, and
          keep room for two lines so the lists start level. */}
      <p className="type-card mt-3 max-lg:min-h-[2.8em] max-sm:text-[1rem]">
        {plan.lead}
      </p>
      <ul className="mt-8 mb-10 flex flex-col gap-2.5">
        {plan.points.map(point => (
          <li
            key={point.label}
            className={classNames(
              'type-card flex items-start gap-3 max-sm:text-[1rem]',
              !point.included && 'text-pca-grey-600',
            )}
          >
            <Icon
              icon={point.included ? 'check' : 'minus'}
              className="mt-[0.1em] size-5.5 shrink-0"
            />
            <span>
              {point.highlight && (
                <>
                  <strong className="font-bold">{point.highlight}</strong>
                  {' '}
                </>
              )}
              {point.label}
              {!point.included && (
                <span className="sr-only"> (not included)</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <Button
        as="a"
        href={plan.href}
        colorLight={look.button}
        size="medium"
        className={classNames('mt-auto w-full', plausibleEvent(plan.event))}
      >
        {plan.cta}
      </Button>
    </article>
  );
};
