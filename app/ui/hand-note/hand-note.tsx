import classNames from 'classnames';

export interface HandNoteProps extends React.PropsWithChildren {
  /** The side of the thing it points at the note sits on. */
  side?: 'left' | 'right';
  className?: string;
}

/** A handwritten note with a drawn arrow, scribbled next to something. */
export const HandNote: React.FC<HandNoteProps> = ({
  children,
  side = 'right',
  className,
}) => (
  <div
    aria-hidden="true"
    className={classNames(
      'pointer-events-none flex items-center gap-2 select-none',
      'text-pca-grey-900',
      side === 'left' && 'flex-row-reverse',
      className,
    )}
  >
    <HandArrow className={classNames(
      'h-8 w-16',
      side === 'right' && '-scale-x-100',
    )}
    />
    <p className="type-hand whitespace-nowrap">{children}</p>
  </div>
);

export interface HandArrowProps {
  className?: string;
}

export const HandArrow: React.FC<HandArrowProps> = ({ className }) => (
  <svg
    viewBox="0 0 72 36"
    aria-hidden="true"
    className={classNames('shrink-0 overflow-visible', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12 C 22 3, 47 6, 66 24" />
    <path d="M66 24 L 53 22 M66 24 L 63 11" />
  </svg>
);

/** A drawn arrow pointing down at what follows a handwritten line. */
export const HandArrowDown: React.FC<HandArrowProps> = ({ className }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 36 56"
    className={classNames('h-14 w-9 overflow-visible', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 3 C 6 18, 28 30, 18 50" />
    <path d="M18 50 L 9 42 M18 50 L 26 41" />
  </svg>
);
