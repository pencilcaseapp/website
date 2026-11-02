import classNames from 'classnames';

export interface BarTintProps {
  /** The colour Safari picks up, such as `bg-pca-yellow-500`. */
  className: string;
}

/**
 * Safari 26 ignores theme-color and tints its top and bottom bars with the
 * colour of a fixed element it finds along each edge. These strips are
 * those elements: masked out, so nobody sees them, but still picked up.
 */
export const BarTint: React.FC<BarTintProps> = ({ className }) => (
  <>
    <div aria-hidden="true" className={classNames('bar-tint top-0', className)} />
    <div aria-hidden="true" className={classNames('bar-tint bottom-0', className)} />
  </>
);
