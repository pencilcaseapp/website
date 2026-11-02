import classNames from 'classnames';
import { Link } from 'react-router';
import type { HelpSection } from '~/constants/help';
import { Container } from '~/ui/container/container';
import { HandArrowDown } from '~/ui/hand-note/hand-note';
import { ContactForm } from '../contact-form/contact-form';
import { FOCUS_RING, HelpArticleList } from './help-article-list';

/** The id of the form at the end, which the articles link to. */
export const WRITE_TO_US_ID = 'write-to-us';

const PILL = classNames(
  'type-label inline-flex h-11 shrink-0 items-center rounded-full px-5',
  'whitespace-nowrap transition-[background-color,color,rotate,translate,scale]',
  'duration-200 ease-out active:scale-[0.96] motion-reduce:transition-none',
  'motion-reduce:active:scale-100',
  FOCUS_RING,
);

const SECTION = classNames(
  'grid scroll-mt-28 gap-6 rounded-[2rem] bg-pca-grey-100 p-6 sm:p-10',
  'lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10',
);

const SECTION_TITLE = 'type-subtitle text-[1.5rem] text-balance';

const SectionNav: React.FC<HelpProps> = ({ sections }) => (
  <nav
    aria-label="Help sections"
    className={classNames(
      '-mx-4 mt-5 flex gap-2 overflow-x-auto overscroll-x-contain px-4 py-1',
      '[scrollbar-width:none] sm:mx-auto sm:mt-12 sm:max-w-[52rem]',
      'sm:flex-wrap sm:justify-center sm:overflow-visible sm:p-0',
    )}
  >
    {sections.map(section => (
      <Link
        key={section.id}
        to={`#${section.id}`}
        className={classNames(PILL, 'bg-pca-grey-100 hover:bg-pca-grey-200')}
      >
        {section.title}
      </Link>
    ))}
    <Link
      to={`#${WRITE_TO_US_ID}`}
      className={classNames(
        PILL,
        'bg-pca-pop-yellow hover:bg-pca-pop-yellow/80',
      )}
    >
      Write to us
    </Link>
  </nav>
);

export interface HelpProps {
  sections: HelpSection[];
}

/**
 * The help section: every question by topic, and a message to us for
 * whatever they leave open.
 */
export const Help: React.FC<HelpProps> = ({ sections }) => (
  <Container className="pt-14 sm:pt-20">
    <h1 className="type-section text-center">Help.</h1>
    <SectionNav sections={sections} />
    <div className="mx-auto mt-7 flex max-w-[1040px] flex-col gap-4 sm:mt-16 sm:gap-6">
      {sections.map(section => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className={SECTION}
        >
          <h2
            id={`${section.id}-title`}
            className={classNames(SECTION_TITLE, 'lg:mt-2.5')}
          >
            {section.title}
          </h2>
          <HelpArticleList articles={section.articles} />
        </section>
      ))}
      <div className="mt-8 text-center sm:mt-10">
        <p className="type-hand-lg inline-block -rotate-2">Still stuck?</p>
        <HandArrowDown className="mx-auto mt-2" />
      </div>
      <section
        id={WRITE_TO_US_ID}
        aria-labelledby={`${WRITE_TO_US_ID}-title`}
        className={SECTION}
      >
        <div>
          <h2 id={`${WRITE_TO_US_ID}-title`} className={SECTION_TITLE}>
            Didn’t find your answer?
          </h2>
          <p className="type-body mt-3 text-pca-grey-700">
            Write to us and we’ll get back to you.
          </p>
        </div>
        <div className="min-w-0 lg:pt-1.5">
          <ContactForm />
        </div>
      </section>
    </div>
  </Container>
);
