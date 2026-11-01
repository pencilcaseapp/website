import classNames from 'classnames';

export interface TableColumn {
  label: React.ReactNode;
  /** The share of the table's width, used from `lg`. */
  width: string;
}

export interface TableProps {
  /** Names the table for screen readers and its scroll region. */
  label: string;
  columns: TableColumn[];
  /** One array of cells per row; the first cell heads its row. */
  rows: React.ReactNode[][];
}

const CELL = classNames(
  'pr-6 last:pr-0 max-lg:pr-4 max-lg:last:pr-4 sm:max-lg:last:pr-6',
);

const FIRST_CELL = 'max-lg:pl-4 sm:max-lg:pl-6';

/**
 * A table of the legal texts on a grey card that reaches past the text
 * column on wide screens. Below `lg` it scrolls sideways and below `sm` it
 * runs edge to edge.
 */
export const Table: React.FC<TableProps> = ({ label, columns, rows }) => (
  <div
    role="region"
    aria-label={label}
    tabIndex={0}
    className={classNames(
      'my-10 rounded-[1.5rem] bg-pca-grey-100 pt-5 pb-1',
      'lg:-mr-30 lg:-ml-6 lg:px-6',
      'max-lg:overflow-x-auto max-lg:[scrollbar-width:thin]',
      'max-sm:-mx-4 max-sm:rounded-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-pca-grey-900',
    )}
  >
    <table className="type-body w-full border-collapse text-left max-lg:min-w-[34rem] lg:table-fixed">
      <caption className="sr-only">{label}</caption>
      <colgroup>
        {columns.map((column, index) => (
          <col key={index} style={{ width: column.width }} />
        ))}
      </colgroup>
      <thead>
        <tr className="border-b-2 border-pca-grey-900">
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className={classNames(
                'type-label pb-3 align-bottom',
                CELL,
                index === 0 && FIRST_CELL,
              )}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-pca-grey-300 last:border-b-0"
          >
            {cells.map((cell, index) => {
              const Cell = index === 0 ? 'th' : 'td';

              return (
                <Cell
                  key={index}
                  {...index === 0 && { scope: 'row' }}
                  className={classNames(
                    'py-4 align-top [overflow-wrap:anywhere]',
                    CELL,
                    index === 0
                      ? classNames('font-semibold', FIRST_CELL)
                      : 'font-normal',
                  )}
                >
                  {cell}
                </Cell>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
