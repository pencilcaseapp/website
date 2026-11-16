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
          // The focus ring belongs to the whole card, drawn a little
          // inside its edge: around the question alone, its lower line
          // ran right over the first line of an open answer.
          'has-[[data-trigger]:focus-visible]:outline-2',
          'has-[[data-trigger]:focus-visible]:-outline-offset-[6px]',
          'has-[[data-trigger]:focus-visible]:outline-pca-grey-900',
        )}
      >
        <BaseAccordion.Header render={<Heading />}>
          {/* `select-none`: clicking a question twice in a row would
              otherwise select its text. */}
          <BaseAccordion.Trigger
            data-trigger=""
            className={classNames(
              // Lighter than `type-question` on its own, and in three
              // steps beside `type-lead` (18, 20 and 22px to its 17, 19
              // and 22): a question is the title of its answer, not of
              // the section. It stops at 22px: the longest question of
              // the startpage still fits on one line of the full-width
              // card there.
              'type-question text-[1.125rem] font-medium',
              'sm:text-[1.25rem] lg:text-[1.375rem]',
              'flex min-h-11 w-full cursor-pointer items-center',
              'justify-between gap-6 rounded-[1.75rem] px-6 py-5 text-left',
              'select-none sm:px-7',
              'focus-visible:outline-none',
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
          {/* The answer is a step smaller than its question at every
              width, the size of the text in the plan cards, and keeps to
              a reading width however wide the card is. */}
          <div className="type-card max-w-[62ch] px-6 pb-6 leading-[1.55] max-sm:text-[1rem] sm:px-7">
            {item.content}
          </div>
        </BaseAccordion.Panel>
      </BaseAccordion.Item>
    ))}
  </BaseAccordion.Root>
);
