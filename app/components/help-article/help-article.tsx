import classNames from 'classnames';
import { Link } from 'react-router';
import type {
  HelpArticle as HelpArticleData,
  HelpBlock,
  HelpSection,
} from '~/constants/help';
import { HELP_HREF } from '~/constants/links';
import { Container } from '~/ui/container/container';
import {
  helpArticleMarkdownHref,
  relatedHelpArticles,
} from '~/utils/help';
import { WRITE_TO_US_ID } from '../help/help';
import {
  FOCUS_RING,
  HelpArticleList,
  RowArrow,
} from '../help/help-article-list';

/** Sets the `**bold**` and `` `code` `` of an article's text. */
const HelpText: React.FC<{ text: string }> = ({ text }) =>
  text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, index) => {
    if (part.startsWith('`')) {
      return (
        <code
          key={index}
          className="rounded-md bg-pca-grey-100 px-1.5 py-0.5 font-mono text-[0.9em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });

const HelpBlockView: React.FC<{ block: HelpBlock }> = ({ block }) => {
  switch (block.type) {
    case 'list':
      return (
        <ul className="mt-6 flex list-disc flex-col gap-3 pl-6 marker:text-pca-grey-500">
          {block.items.map(item => (
            <li key={item}><HelpText text={item} /></li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className="mt-6 flex list-decimal flex-col gap-3 pl-6 marker:font-semibold">
          {block.items.map(item => (
            <li key={item}><HelpText text={item} /></li>
          ))}
        </ol>
      );
    default:
      return <p className="mt-6"><HelpText text={block.text} /></p>;
  }
};

const Breadcrumb: React.FC<{ section: HelpSection }> = ({ section }) => {
  const link = classNames(
    'inline-flex h-11 items-center rounded-full hover:text-pca-grey-900',
    FOCUS_RING,
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="type-label flex items-center gap-2 text-pca-grey-700"
    >
      <Link to={HELP_HREF} className={link}>Help</Link>
      <span aria-hidden="true">/</span>
      <Link to={`${HELP_HREF}#${section.id}`} className={link}>
        {section.title}
      </Link>
    </nav>
  );
};

export interface HelpArticleProps {
  article: HelpArticleData;
  section: HelpSection;
}

/** One help article: the question, its answer and where to go next. */
export const HelpArticle: React.FC<HelpArticleProps> = ({
  article,
  section,
}) => (
  <Container className="pt-10 sm:pt-14">
    <article className="mx-auto max-w-[680px]">
      <Breadcrumb section={section} />
      {article.draft && (
        <p className="type-body mt-6 rounded-[1.5rem] bg-pca-pop-yellow px-6 py-5">
          Draft: the app does not do this yet, or not everywhere. This page
          stays out of search engines until it does.
        </p>
      )}
      <h1 className="type-subtitle mt-6 text-balance sm:mt-8 sm:text-[2.75rem]">
        {article.question}
      </h1>
      <p className="type-lead mt-6 text-pca-grey-800">
        <HelpText text={article.summary} />
      </p>
      {article.body && (
        <div className="type-body-lg mt-4">
          {article.body.map((block, index) => (
            <HelpBlockView key={index} block={block} />
          ))}
        </div>
      )}
    </article>
    <div className="mx-auto mt-14 max-w-[680px] rounded-[2rem] bg-pca-grey-100 p-6 sm:p-8">
      <h2 className="type-label">More questions like this</h2>
      <div className="mt-3">
        <HelpArticleList articles={relatedHelpArticles(article, section)} />
      </div>
    </div>
    <Link
      to={`${HELP_HREF}#${WRITE_TO_US_ID}`}
      className={classNames(
        'type-question group mx-auto mt-4 flex min-h-11 max-w-[680px]',
        'items-center justify-between gap-6 rounded-[1.75rem]',
        'bg-pca-grey-100 px-6 py-5 sm:px-8',
        FOCUS_RING,
      )}
    >
      <span className="decoration-2 underline-offset-[0.2em] group-hover:underline">
        Still stuck? Write to us
      </span>
      <RowArrow />
    </Link>
    <p className="type-caption mt-6 text-center text-pca-grey-700">
      <a
        href={helpArticleMarkdownHref(article)}
        className={classNames(
          'inline-flex h-11 items-center rounded-sm hover:text-pca-grey-900',
          FOCUS_RING,
        )}
      >
        This page as Markdown
      </a>
    </p>
  </Container>
);
