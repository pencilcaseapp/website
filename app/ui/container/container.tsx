import classNames from 'classnames';

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

/** Centres the page content at its maximum width, with the side gutters. */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => (
  <div
    className={classNames(
      'mx-auto w-full max-w-[1200px] px-4 sm:px-8',
      className,
    )}
  >
    {children}
  </div>
);
