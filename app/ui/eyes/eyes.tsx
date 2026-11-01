import { useId, useRef } from 'react';
import { usePointerShift } from '~/hooks/use-pointer-shift';

const MAX_PUPIL_SHIFT = 52;

const EYES = [
  { d: 'M0 56 Q 90 -22 180 56 Z', cx: 90 },
  { d: 'M200 56 Q 290 -22 380 56 Z', cx: 290 },
];

/**
 * Two eyes peeking over the edge, their pupils following the mouse from
 * one side to the other. Decoration only.
 */
export const Eyes: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId();

  usePointerShift(ref, MAX_PUPIL_SHIFT);

  return (
    <svg
      ref={ref}
      viewBox="0 0 380 56"
      aria-hidden="true"
      className="pointer-events-none mx-auto block w-[min(380px,70%)] select-none"
    >
      {EYES.map((eye, index) => (
        <g key={eye.cx} clipPath={`url(#${id}-${index})`}>
          <clipPath id={`${id}-${index}`}>
            <path d={eye.d} />
          </clipPath>
          <path d={eye.d} className="fill-pca-white" />
          <circle
            cx={eye.cx}
            cy={50}
            r={17}
            className="translate-x-(--pointer-shift,24px) fill-pca-grey-900"
          />
        </g>
      ))}
    </svg>
  );
};
