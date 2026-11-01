export const LOGO_MARK_PATHS = (
  <>
    <path
      strokeWidth="3.6"
      d="M16.39 4.50 Q18 3 19.61 4.50 L29.93 14.13 Q33 17 33.00 21.20 L33.00 34.40 Q33 38 29.95 39.91 L28.05 41.09 Q25 43 21.40 43.00 L14.60 43.00 Q11 43 7.95 41.09 L6.05 39.91 Q3 38 3.00 34.40 L3.00 21.20 Q3 17 6.07 14.13 Z"
    />
    <path strokeWidth="3.2" d="M3 21 Q7.9 16 12.8 21 Q18 16 23.2 21 Q28.1 16 33 21" />
    <path strokeWidth="3.2" d="M12.8 21.5 V43 M23.2 21.5 V43" />
    <path strokeWidth="3" d="M10 11.2 Q18 14.6 26 11.2" />
  </>
);

export interface LogoMarkProps {
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ className }) => (
  <svg
    viewBox="0 0 36 46"
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {LOGO_MARK_PATHS}
  </svg>
);
