import classNames from 'classnames';
import { LogoMark } from './logo-mark';

export interface LogoProps {
  tone?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ tone = 'dark' }) => (
  <span
    className={classNames(
      'flex items-center gap-2',
      tone === 'dark' ? 'text-pca-grey-900' : 'text-pca-white',
    )}
  >
    <LogoMark className="h-7 w-auto" />
    <span className="font-logo text-[1.4375rem] leading-none font-bold tracking-[-0.025em]">
      pencil case
    </span>
  </span>
);
