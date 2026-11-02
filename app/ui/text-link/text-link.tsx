import classNames from 'classnames';
import type { PolymorphicComponentPropWithRef } from '../polymorphic-types/polymorphic-types';

export type TextLinkProps<C extends React.ElementType>
  = PolymorphicComponentPropWithRef<C, { className?: string }>;

/**
 * An underlined link inside running text. Renders an `<a>` unless `as`
 * says otherwise, e.g. `as={Link}` for a page of the site.
 */
export function TextLink<C extends React.ElementType = 'a'>({
  as,
  className,
  ...props
}: TextLinkProps<C>) {
  const Component = as || 'a';

  return (
    <Component
      className={classNames(
        'type-link rounded-sm font-medium [overflow-wrap:anywhere]',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-pca-grey-900',
        className,
      )}
      {...props}
    />
  );
}
