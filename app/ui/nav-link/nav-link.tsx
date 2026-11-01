import classNames from 'classnames';

export type NavLinkProps = React.ComponentPropsWithRef<'a'>;

/** A section link of the site navigation, marked with a dot on hover. */
export const NavLink: React.FC<NavLinkProps> = ({ className, ...props }) => (
  <a
    className={classNames(
      'type-nav relative flex h-11 items-center rounded-full px-4',
      'whitespace-nowrap transition-colors duration-200 ease-out',
      'hover:bg-pca-yellow-700 motion-reduce:transition-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-pca-grey-900',
      'after:pointer-events-none after:absolute after:left-1/2',
      'after:top-[calc(100%+0.25rem)] after:-ml-[0.2em] after:size-[0.4em]',
      'after:rounded-full after:bg-current after:opacity-0',
      'after:-translate-y-[0.3em] after:scale-0',
      'after:transition-[opacity,translate,scale] after:duration-150',
      'motion-reduce:after:transition-none',
      'hover:after:translate-y-0 hover:after:scale-100 hover:after:opacity-100',
      'focus-visible:after:translate-y-0 focus-visible:after:scale-100',
      'focus-visible:after:opacity-100',
      className,
    )}
    {...props}
  />
);
