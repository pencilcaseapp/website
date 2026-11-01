import classNames from 'classnames';
import { APP_URL } from '~/constants/links';
import type { Plan } from '~/constants/plans';
import { Button, type ButtonColor } from '~/ui/button/button';
import { Icon } from '~/ui/icon/icon';

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
      <h3 className="type-subtitle">{plan.name}</h3>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="type-price">{plan.price}</span>
        <span className="type-body-lg">{plan.period}</span>
      </p>
      <p className="type-body-lg mt-3 min-h-[3.2em]">{plan.lead}</p>
      <ul className="mt-8 mb-10 flex flex-col gap-2.5">
        {plan.points.map(point => (
          <li
            key={point.label}
            className={classNames(
              'type-body flex items-start gap-3',
              !point.included && 'text-pca-grey-600',
            )}
          >
            <Icon
              icon={point.included ? 'check' : 'minus'}
              className="mt-[0.15em] size-5 shrink-0"
            />
            <span>
              {point.highlight && (
                <>
                  <strong className="font-semibold">{point.highlight}</strong>
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
        href={APP_URL}
        colorLight={look.button}
        size="medium"
        className="mt-auto w-full"
      >
        {plan.cta}
      </Button>
    </article>
  );
};
