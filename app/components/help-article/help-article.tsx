import classNames from 'classnames';
import { Link } from 'react-router';
import type { Root } from 'mdast';
import type { HelpArticleLink, HelpSectionInfo } from '~/constants/help';
import { HELP_HREF } from '~/constants/links';
import { Container } from '~/ui/container/container';
import { helpArticleMarkdownHref } from '~/utils/help';
import { WRITE_TO_US_ID } from '../help/help';
import {
  FOCUS_RING,
  HelpArticleList,
  RowArrow,
} from '../help/help-article-list';
import { HelpMarkdown } from './help-markdown';

const Breadcrumb: React.FC<{ section: HelpSectionInfo }> = ({ section }) => {
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
  article: HelpArticleLink;
  /** The first paragraph of the answer. */
  summary: Root;
  /** The rest of the answer. */
  body: Root;
  section: HelpSectionInfo;
  /** The articles to suggest under it. */
  related: HelpArticleLink[];
}

/** One help article: the question, its answer and where to go next. */
export const HelpArticle: React.FC<HelpArticleProps> = ({
  article,
  summary,
  body,
  section,
  related,
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
      <HelpMarkdown
        tree={summary}
        paragraphClassName="type-lead mt-6 text-pca-grey-800"
      />
      {body.children.length > 0 && (
        <div className="type-body-lg mt-4">
          <HelpMarkdown tree={body} />
        </div>
      )}
    </article>
    <div className="mx-auto mt-14 max-w-[680px] rounded-[2rem] bg-pca-grey-100 p-6 sm:p-8">
      <h2 className="type-label">More questions like this</h2>
      <div className="mt-3">
        <HelpArticleList articles={related} />
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
      <Link
        to={helpArticleMarkdownHref(article)}
        reloadDocument
        className={classNames(
          'inline-flex h-11 items-center rounded-sm hover:text-pca-grey-900',
          FOCUS_RING,
        )}
      >
        This page as Markdown
      </Link>
    </p>
  </Container>
);
