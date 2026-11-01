import classNames from 'classnames';
import type { PolymorphicComponentPropWithRef } from '../polymorphic-types/polymorphic-types';

export type ButtonColor = 'grey-900' | 'red-600';
export type ButtonSize = 'extraSmall' | 'small' | 'medium' | 'large';

export type ButtonProps<C extends React.ElementType>
  = PolymorphicComponentPropWithRef<
    C,
    {
      colorLight?: ButtonColor;
      size?: ButtonSize;
      className?: string;
    }
  >;

const COLORS: Record<ButtonColor, string> = {
  'grey-900': 'bg-pca-grey-900 text-pca-white hover:bg-pca-grey-800',
  'red-600': 'bg-pca-red-600 text-pca-white hover:bg-pca-red-700',
};

const SIZES: Record<ButtonSize, string> = {
  extraSmall: 'h-10 px-6 text-base',
  small: 'h-11 px-6 text-base',
  medium: 'h-13 px-5 text-lg',
  large: 'h-15 px-9 text-[1.375rem]',
};

/**
 * The pill shaped call to action. On hover the label makes room for an
 * arrow sliding in from the left. Renders a `<button>` unless `as` says
 * otherwise, e.g. `as="a"` for a link.
 */
export function Button<C extends React.ElementType = 'button'>({
  as,
  colorLight = 'grey-900',
  size = 'large',
  className,
  children,
  ...props
}: ButtonProps<C>) {
  const Component = as || 'button';

  return (
    <Component
      className={classNames(
        'group type-button inline-flex items-center justify-center',
        'overflow-hidden rounded-full',
        'transition-[background-color,scale] duration-200 ease-out',
        'active:scale-[0.96] motion-reduce:transition-none',
        'motion-reduce:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-pca-grey-900',
        COLORS[colorLight],
        SIZES[size],
        className,
      )}
      {...props}
    >
      <span
        className={classNames(
          'translate-x-[0.65em] transition-[translate] duration-350',
          'ease-[cubic-bezier(.645,.045,.355,1)] motion-reduce:transition-none',
          'group-hover:-translate-x-[0.1em]',
          'group-focus-visible:-translate-x-[0.1em]',
        )}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={classNames(
          'ml-[0.4em] flex w-[0.9em] overflow-hidden transition-[translate]',
          'duration-350 ease-[cubic-bezier(.645,.045,.355,1)]',
          'motion-reduce:transition-none group-hover:translate-x-[0.1em]',
          'group-focus-visible:translate-x-[0.1em]',
        )}
      >
        <svg
          viewBox="0 0 20 16"
          className={classNames(
            'h-auto w-full -translate-x-[110%] transition-[translate]',
            'duration-250 ease-[cubic-bezier(.645,.045,.355,1)]',
            'motion-reduce:transition-none group-hover:translate-x-0',
            'group-focus-visible:translate-x-0',
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 8h15M11 2l6 6-6 6" />
        </svg>
      </span>
    </Component>
  );
}
