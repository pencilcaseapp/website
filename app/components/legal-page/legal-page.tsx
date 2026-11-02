import classNames from 'classnames';
import { Container } from '~/ui/container/container';

export interface LegalPageProps extends React.PropsWithChildren {
  title: string;
  /** The ISO date of the current version, shown under the title. */
  updatedAt?: string;
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** The title of a legal text and its sections in one narrow column. */
export const LegalPage: React.FC<LegalPageProps> = ({
  title,
  updatedAt,
  children,
}) => (
  <Container className="pt-14 sm:pt-20">
    <header className="text-center">
      <h1 className="type-section">{`${title}.`}</h1>
      {updatedAt && (
        <p className="type-lead mt-4 text-pca-grey-700 sm:mt-5">
          Last updated
          {' '}
          <time dateTime={updatedAt} className="tabular-nums">
            {DATE_FORMAT.format(new Date(updatedAt))}
          </time>
        </p>
      )}
    </header>
    <article className="mx-auto mt-14 max-w-[680px] sm:mt-20">
      {children}
    </article>
  </Container>
);

export interface LegalSectionProps extends React.PropsWithChildren {
  id: string;
  title: string;
  /** Numbers the section, hanging in the margin from `lg`. */
  number?: number;
}

export const LegalSection: React.FC<LegalSectionProps> = ({
  id,
  title,
  number,
  children,
}) => (
  <section
    aria-labelledby={id}
    className={classNames(
      'first:mt-0',
      number ? 'mt-16 sm:mt-20' : 'mt-12 sm:mt-14',
    )}
  >
    <h2 id={id} className="type-title relative flex gap-4 text-balance">
      {number && (
        <>
          <span
            aria-hidden="true"
            className="text-pca-grey-600 tabular-nums lg:absolute lg:right-full lg:mr-6"
          >
            {number}
          </span>
          <span className="sr-only">
            {number}
            .
            {' '}
          </span>
        </>
      )}
      {title}
    </h2>
    <div className={number ? 'mt-6' : 'mt-5'}>{children}</div>
  </section>
);

export const LegalParagraph: React.FC<React.PropsWithChildren> = ({
  children,
}) => <p className="type-body-lg mt-5 first:mt-0">{children}</p>;

export const LegalList: React.FC<{ items: React.ReactNode[] }> = ({
  items,
}) => (
  <ul className="type-body-lg mt-5 list-disc space-y-2 pl-6 first:mt-0">
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);

/** The bold lead-in of a paragraph, such as “Free.” */
export const LegalLead: React.FC<React.PropsWithChildren> = ({
  children,
}) => <strong className="font-semibold">{children}</strong>;
