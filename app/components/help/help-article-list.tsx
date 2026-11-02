import classNames from 'classnames';
import { Link } from 'react-router';
import type { HelpArticleLink } from '~/constants/help';
import { helpArticleHref } from '~/utils/help';

export const FOCUS_RING = classNames(
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-pca-grey-900',
);

/** The arrow at the end of a link row, darker while the row is hovered. */
export const RowArrow: React.FC = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 16"
    className="w-[0.9em] shrink-0 text-pca-grey-500 group-hover:text-pca-grey-900"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 8h15M11 2l6 6-6 6" />
  </svg>
);

/** Marks an article about something the app does not do yet. */
export const DraftBadge: React.FC = () => (
  <span
    className={classNames(
      'type-caption ml-2 inline-block rounded-full bg-pca-pop-yellow',
      'px-2.5 align-[0.1em] font-normal whitespace-nowrap',
    )}
  >
    Draft
  </span>
);

export interface HelpArticleListProps {
  articles: HelpArticleLink[];
}

/** The questions of a few help articles, each a link to its answer. */
export const HelpArticleList: React.FC<HelpArticleListProps> = ({
  articles,
}) => (
  <ul className="divide-y divide-pca-grey-300">
    {articles.map(article => (
      <li key={article.slug}>
        <Link
          to={helpArticleHref(article)}
          className={classNames(
            'type-card group -mx-2 flex min-h-11 items-center',
            'justify-between gap-6 rounded-lg px-2 py-3',
            FOCUS_RING,
          )}
        >
          <span className="decoration-2 underline-offset-[0.2em] group-hover:underline">
            {article.question}
            {article.draft && <DraftBadge />}
          </span>
          <RowArrow />
        </Link>
      </li>
    ))}
  </ul>
);
