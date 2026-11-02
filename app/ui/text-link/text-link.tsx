import classNames from 'classnames';
import { Link, type LinkProps } from 'react-router';

export type TextLinkProps = LinkProps;

/** An underlined link inside running text. */
export const TextLink: React.FC<TextLinkProps> = ({ className, ...props }) => (
  <Link
    className={classNames(
      'type-link rounded-sm font-medium [overflow-wrap:anywhere]',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-pca-grey-900',
      className,
    )}
    {...props}
  />
);
