import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useElementWidth } from '~/hooks/use-element-width';
import { EditorMock } from '~/ui/editor-mock/editor-mock';
import { HandNote } from '~/ui/hand-note/hand-note';
import { Icon } from '~/ui/icon/icon';
import { PhoneMock } from '~/ui/phone-mock/phone-mock';

const MIN_WIDTH = 300;
const FULL_WIDTH = 850;
const PHONE_WIDTH = 520;
const STEP = 24;
const LARGE_STEP = 96;

const lerp = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

/**
 * The editor in a browser window with a handle at its side: dragging it
 * (or the arrow keys) narrows the window down to a tablet and a phone,
 * and the window turns into a phone's frame on the way. Below `md` it is
 * a phone to begin with.
 */
export const ProductDemo: React.FC = () => (
  <div className="@container relative mx-auto mt-14 flow-root md:mt-16 md:w-[min(850px,56vw)]">
    <ResizableWindow />
    <div className="-mb-24 flex justify-center md:hidden">
      <PhoneMock className="w-[76%] max-w-[320px]" />
    </div>
    <img
      src="/waving-pencil.svg"
      alt=""
      width={180}
      height={180}
      className="pointer-events-none absolute bottom-[-0.7cqw] left-[-38cqw] hidden w-[48cqw] max-w-none select-none md:block"
    />
  </div>
);

const ResizableWindow: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const maxWidth = useElementWidth(stageRef, FULL_WIDTH);
  const [chosenWidth, setChosenWidth] = useState<number | null>(null);
  const drag = useRef<{ x: number; width: number } | null>(null);

  const width = Math.min(chosenWidth ?? maxWidth, maxWidth);
  const clamp = (value: number) =>
    Math.max(MIN_WIDTH, Math.min(maxWidth, value));
  // 0 while the window is wider than a phone, 1 at the narrowest.
  const phoneness = Math.max(0, Math.min(1, (PHONE_WIDTH - width) / 220));
  const isNarrowed = width < maxWidth - 48;
  const device = width < PHONE_WIDTH ? 'phone' : 'tablet';
  const deviceName = width < PHONE_WIDTH ? 'Phone' : 'Tablet';

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? LARGE_STEP : STEP;
    const next = {
      ArrowLeft: width - step,
      ArrowDown: width - step,
      ArrowRight: width + step,
      ArrowUp: width + step,
      Home: MIN_WIDTH,
      End: maxWidth,
    }[event.key];

    if (next !== undefined) {
      event.preventDefault();
      setChosenWidth(clamp(next));
    }
  };

  const labelClasses = classNames(
    'absolute hidden transition-[opacity,translate] duration-200 ease-out',
    'motion-reduce:transition-none xl:flex',
    isNarrowed ? 'opacity-100' : 'translate-y-1.5 opacity-0',
  );

  return (
    <div
      ref={stageRef}
      className="relative -mb-14 hidden aspect-[850/595] w-full md:block"
    >
      <div
        className="relative mx-auto h-full"
        style={{ width: chosenWidth === null ? '100%' : width }}
      >
        <div
          className="relative size-full overflow-hidden border-pca-grey-900 bg-pca-white shadow-window"
          style={{
            borderRadius: lerp(20, 44, phoneness),
            borderWidth: lerp(0, 6, phoneness),
          }}
        >
          <EditorMock />
        </div>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Width of the preview"
          aria-orientation="horizontal"
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={maxWidth}
          aria-valuenow={Math.round(width)}
          aria-valuetext={isNarrowed ? deviceName : 'Desktop'}
          onKeyDown={handleKeyDown}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = { x: event.clientX, width };
          }}
          onPointerMove={(event) => {
            if (drag.current) {
              const distance = event.clientX - drag.current.x;
              // The window stays centred, so it grows on both sides.
              setChosenWidth(clamp(drag.current.width + distance * 2));
            }
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          className="group absolute top-1/2 left-full -ml-5.5 grid h-24 w-11 -translate-y-1/2 cursor-ew-resize touch-none place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-pca-white shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_4px_12px_-2px_rgb(0_0_0/0.2)] transition-[scale] duration-150 ease-out group-hover:scale-105 group-active:scale-[0.96] motion-reduce:transition-none">
            <Icon icon="chevronLeft" className="-mr-1.5 size-5" />
            <Icon icon="chevronRight" className="-ml-1.5 size-5" />
          </span>
        </div>
        <HandNote
          side="left"
          className={classNames(labelClasses, 'top-[19%] right-full mr-3 -rotate-3')}
        >
          {`edit on ${device}`}
        </HandNote>
        <HandNote
          className={classNames(labelClasses, 'top-14 left-full ml-3 rotate-2')}
        >
          {`collab on ${device}`}
        </HandNote>
        <HandNote className="absolute top-1/2 left-full -mt-1.5 ml-12 hidden -translate-y-1/2 xl:flex">
          drag me
        </HandNote>
      </div>
    </div>
  );
};
