import classNames from 'classnames';
import { LOGO_MARK_PATHS } from './logo-mark';

export interface LogoProps {
  tone?: 'dark' | 'light';
}

/**
 * The mark and the name, drawn as one SVG so both scale together. The name
 * is set in Hanken Grotesk, which `fonts.css` loads.
 */
export const Logo: React.FC<LogoProps> = ({ tone = 'dark' }) => (
  <span
    className={classNames(
      'block',
      tone === 'dark' ? 'text-pca-grey-900' : 'text-pca-white',
    )}
  >
    <svg
      viewBox="0 0 608 122"
      aria-hidden="true"
      className="block h-7 w-auto overflow-visible"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="scale(2.652)">{LOGO_MARK_PATHS}</g>
      <text
        x="126"
        y="98"
        fill="currentColor"
        stroke="none"
        className="font-logo"
        fontWeight="700"
        fontSize="100"
        letterSpacing="-2.5"
      >
        pencil case
      </text>
    </svg>
    <span className="sr-only">pencil case</span>
  </span>
);
