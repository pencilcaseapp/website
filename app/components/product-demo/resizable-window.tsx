import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useElementWidth } from '~/hooks/use-element-width';
import { playGenie } from '~/utils/genie';
import { EditorMock, type WindowAction } from '~/ui/editor-mock/editor-mock';
import { HandNote } from '~/ui/hand-note/hand-note';
import { Icon } from '~/ui/icon/icon';
import { LogoMark } from '~/ui/logo/logo-mark';

const MIN_WIDTH = 300;
const FULL_WIDTH = 850;
const PHONE_WIDTH = 520;
const STEP = 24;
const LARGE_STEP = 96;
const ZOOM_DURATION = 320;
const BOUNCE_DURATION = 650;

type WindowState = 'open' | 'closed' | 'minimised';

const lerp = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

/**
 * The editor in a browser window. The handle at its side (or the arrow
 * keys) narrows it down to a tablet and a phone, turning it into a
 * phone's frame on the way. Its window buttons work like macOS': close,
 * minimise into a dock below (with the genie effect) and zoom, and shift
 * slows the animations down five times.
 */
export const ResizableWindow: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const dockIconRef = useRef<HTMLSpanElement>(null);
  const dockButtonRef = useRef<HTMLButtonElement>(null);
  const maxWidth = useElementWidth(stageRef, FULL_WIDTH);
  const [chosenWidth, setChosenWidth] = useState<number | null>(null);
  const [windowState, setWindowState] = useState<WindowState>('open');
  const [isSlow, setIsSlow] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isGenieRunning, setIsGenieRunning] = useState(false);
  const drag = useRef<{ x: number; width: number } | null>(null);
  const widthBeforeZoom = useRef(600);
  const cancelGenie = useRef<(() => void) | null>(null);
  const minimisedWithGenie = useRef(false);

  const width = Math.min(chosenWidth ?? maxWidth, maxWidth);
  const clamp = (value: number) =>
    Math.max(MIN_WIDTH, Math.min(maxWidth, value));
  // 0 while the window is wider than a phone, 1 at the narrowest.
  const phoneness = Math.max(0, Math.min(1, (PHONE_WIDTH - width) / 220));
  const isNarrowed = width < maxWidth - 48;
  const device = width < PHONE_WIDTH ? 'phone' : 'tablet';
  const deviceName = width < PHONE_WIDTH ? 'Phone' : 'Tablet';
  const isGone = windowState !== 'open' || isGenieRunning;

  useEffect(() => () => cancelGenie.current?.(), []);

  useEffect(() => {
    if (isGone) {
      dockButtonRef.current?.focus({ preventScroll: true });
    }
  }, [isGone]);

  useEffect(() => {
    if (!isZooming) {
      return;
    }

    const timeout = setTimeout(() => setIsZooming(false), ZOOM_DURATION);
    return () => clearTimeout(timeout);
  }, [isZooming]);

  useEffect(() => {
    if (!isBouncing) {
      return;
    }

    const timeout = setTimeout(() => setIsBouncing(false), BOUNCE_DURATION);
    return () => clearTimeout(timeout);
  }, [isBouncing]);

  /** Plays the genie effect, unless motion is reduced or nothing to draw. */
  const genie = (reverse: boolean, slow: boolean, onDone: () => void) => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const shell = shellRef.current;
    const icon = dockIconRef.current;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !stage || !frame || !shell || !icon
    ) {
      return false;
    }

    setIsGenieRunning(true);
    cancelGenie.current = playGenie({
      stage,
      frame,
      shell,
      icon,
      reverse,
      slow,
      onDone: () => {
        cancelGenie.current = null;
        onDone();
        setIsGenieRunning(false);
      },
    });

    return true;
  };

  const handleWindowAction = (
    action: WindowAction,
    event: React.MouseEvent,
  ) => {
    if (action === 'close') {
      setIsSlow(event.shiftKey);
      setWindowState('closed');
    }
    else if (action === 'minimise') {
      setIsSlow(event.shiftKey);
      minimisedWithGenie.current = genie(
        false,
        event.shiftKey,
        () => setWindowState('minimised'),
      );

      if (!minimisedWithGenie.current) {
        setWindowState('minimised');
      }
    }
    else {
      setIsZooming(true);

      if (width < maxWidth) {
        widthBeforeZoom.current = width;
        setChosenWidth(null);
      }
      else {
        setChosenWidth(Math.min(widthBeforeZoom.current, maxWidth - 120));
      }
    }
  };

  const handleOpen = (event: React.MouseEvent) => {
    if (cancelGenie.current) {
      return;
    }

    const pouredOut = windowState === 'minimised'
      && minimisedWithGenie.current
      && genie(true, event.shiftKey, () => {
        // The genie already drew the way back, so the window appears
        // without its own transition.
        const frame = frameRef.current;

        if (frame) {
          frame.style.transition = 'none';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            frame.style.transition = '';
          }));
        }

        setWindowState('open');
      });

    if (!pouredOut) {
      setIsSlow(false);
      setIsBouncing(true);
      setWindowState('open');
    }
  };

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
      data-window-gone={isGone ? '' : undefined}
      className="relative -mb-14 hidden aspect-[850/595] w-full md:block"
    >
      <div
        ref={frameRef}
        data-window={windowState}
        data-genie={isGenieRunning && windowState === 'open' ? '' : undefined}
        data-zooming={isZooming ? '' : undefined}
        inert={isGone}
        className="mac-window relative mx-auto h-full"
        style={{
          'width': chosenWidth === null ? '100%' : width,
          '--window-speed': isSlow ? 5 : 1,
        } as React.CSSProperties}
      >
        <div
          ref={shellRef}
          className="relative size-full overflow-hidden border-pca-grey-900 bg-pca-white shadow-window"
          style={{
            borderRadius: lerp(20, 44, phoneness),
            borderWidth: lerp(0, 6, phoneness),
          }}
        >
          <EditorMock onWindowAction={handleWindowAction} />
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
            setIsZooming(false);
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
      <div
        data-shown={isGone || isBouncing ? '' : undefined}
        inert={!isGone}
        className="mac-dock absolute bottom-20 left-1/2 z-10"
      >
        <div className="rounded-[1.4rem] bg-pca-white/60 p-2 shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_8px_20px_-8px_rgb(0_0_0/0.25)]">
          <button
            ref={dockButtonRef}
            type="button"
            aria-label="Open pencil case"
            onClick={handleOpen}
            className="group/dock relative block rounded-[0.9rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900"
          >
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-md bg-pca-grey-900 px-2 py-1 text-xs font-medium whitespace-nowrap text-pca-white opacity-0 transition-opacity duration-150 ease-out group-hover/dock:opacity-100 motion-reduce:transition-none">
              pencil case
            </span>
            <span
              ref={dockIconRef}
              data-bounce={isBouncing ? '' : undefined}
              className="mac-dock-icon grid size-14 place-items-center rounded-[0.9rem] bg-pca-yellow-500 shadow-[0_0_0_1px_rgb(0_0_0/0.1),0_2px_4px_rgb(0_0_0/0.12)]"
            >
              <LogoMark className="h-8 w-auto" />
            </span>
            <span className="absolute top-full left-1/2 mt-0.5 size-1 -translate-x-1/2 rounded-full bg-pca-grey-900" />
          </button>
        </div>
        <HandNote className="absolute top-1/2 left-full ml-4 hidden -translate-y-1/2 lg:flex">
          bring it back
        </HandNote>
      </div>
    </div>
  );
};
