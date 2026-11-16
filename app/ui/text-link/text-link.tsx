import classNames from 'classnames';
import type { PolymorphicComponentPropWithRef } from '../polymorphic-types/polymorphic-types';

export type TextLinkProps<C extends React.ElementType>
  = PolymorphicComponentPropWithRef<C, { className?: string }>;

/**
 * An underlined link inside running text. Under the pointer it fades a
 * little, underline and all: enough to answer the pointer, quiet enough
 * for a paragraph with several links in it. Renders an `<a>` unless `as`
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
        // Mixed from the colour the link already has, so it works on any
        // text colour and background.
        'transition-colors duration-150 ease-out',
        'hover:text-[color-mix(in_oklab,currentColor_60%,transparent)]',
        'motion-reduce:transition-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-pca-grey-900',
        className,
      )}
      {...props}
    />
  );
}
