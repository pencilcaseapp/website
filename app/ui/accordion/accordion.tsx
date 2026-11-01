import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import classNames from 'classnames';
import { Icon } from '../icon/icon';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** The level of the headings the titles sit in. */
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

/**
 * A stack of questions that open to their answers, any number at once.
 * Closed answers stay in the page (`hidden="until-found"`), so the
 * browser's find opens the one it lands in.
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  headingLevel: Heading = 'h3',
  className,
}) => (
  <BaseAccordion.Root
    multiple
    hiddenUntilFound
    className={classNames('flex flex-col gap-3', className)}
  >
    {items.map(item => (
      <BaseAccordion.Item
        key={item.id}
        value={item.id}
        className={classNames(
          'group rounded-[1.75rem] bg-pca-grey-100 transition-colors',
          'duration-150 ease-out data-open:bg-pca-pop-yellow',
          'motion-reduce:transition-none',
        )}
      >
        <BaseAccordion.Header render={<Heading />}>
          {/* `select-none`: clicking a question twice in a row would
              otherwise select its text. */}
          <BaseAccordion.Trigger
            className={classNames(
              'type-question flex min-h-11 w-full cursor-pointer items-center',
              'justify-between gap-6 rounded-[1.75rem] px-6 py-5 text-left',
              'select-none sm:px-7',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-pca-grey-900',
            )}
          >
            {item.title}
            <span
              className={classNames(
                'grid size-9 shrink-0 place-items-center rounded-full',
                'bg-pca-white',
              )}
            >
              <Icon
                icon="plus"
                className={classNames(
                  'size-5 transition-transform duration-200 ease-out',
                  'group-data-open:rotate-45 motion-reduce:transition-none',
                )}
              />
            </span>
          </BaseAccordion.Trigger>
        </BaseAccordion.Header>
        <BaseAccordion.Panel
          className={classNames(
            'h-(--accordion-panel-height) overflow-hidden',
            'transition-[height] duration-200 ease-out',
            'data-ending-style:h-0 data-starting-style:h-0',
            'motion-reduce:transition-none',
          )}
        >
          <div className="type-body-lg max-w-[56ch] px-6 pb-6 sm:px-7">
            {item.content}
          </div>
        </BaseAccordion.Panel>
      </BaseAccordion.Item>
    ))}
  </BaseAccordion.Root>
);
