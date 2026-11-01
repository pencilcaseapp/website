const SLICES = 60;
const DURATION = 520;
const SLOW_FACTOR = 5;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

function offsetTopWithin(element: HTMLElement, ancestor: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  while (current && current !== ancestor) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

export interface GenieOptions {
  /** The positioned element both the window and the dock live in. */
  stage: HTMLElement;
  /** The window, for its size and position. */
  frame: HTMLElement;
  /** What is drawn: cloned into every slice. */
  shell: HTMLElement;
  /** The dock icon the window pours into. */
  icon: HTMLElement;
  /** Pours the window back out of the dock instead. */
  reverse: boolean;
  /** Five times slower, as macOS does with shift held. */
  slow: boolean;
  onDone: () => void;
}

/**
 * macOS' genie effect: the window is cut into horizontal slices that
 * squeeze towards the dock icon, the lower ones first, and slide into it.
 * Draws on clones on top of the stage, so the window itself stays as it
 * is (hide it meanwhile). Returns a function that cancels the animation.
 */
export function playGenie({
  stage,
  frame,
  shell,
  icon,
  reverse,
  slow,
  onDone,
}: GenieOptions) {
  const width = frame.offsetWidth;
  const height = frame.offsetHeight;
  const left = frame.offsetLeft;
  const target = offsetTopWithin(icon, stage) + icon.offsetHeight * 0.35;
  const centre = stage.clientWidth / 2;
  const iconHalf = icon.offsetWidth * 0.35;
  const squeeze = target / height;
  const sliceHeight = height / SLICES;

  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  layer.style.cssText = `position:absolute;left:0;top:0;width:100%;height:${target + 2}px;overflow:hidden;pointer-events:none;z-index:5;`;

  const slices = Array.from({ length: SLICES }, (_, index) => {
    const slice = document.createElement('div');
    slice.style.cssText = `position:absolute;left:0;top:0;width:${width}px;height:${sliceHeight + 1}px;overflow:hidden;transform-origin:0 0;will-change:transform;`;

    const clone = shell.cloneNode(true) as HTMLElement;
    clone.style.cssText += `;position:absolute;left:0;top:${-index * sliceHeight}px;width:${width}px;height:${height}px;box-shadow:none;`;

    slice.append(clone);
    layer.append(slice);
    return slice;
  });

  stage.append(layer);

  const duration = DURATION * (slow ? SLOW_FACTOR : 1);
  const start = performance.now();
  let frameId = 0;

  const draw = (now: number) => {
    const time = clamp01((now - start) / duration);
    const progress = reverse ? 1 - time : time;
    const narrowing = smoothstep(clamp01(progress / 0.45));
    const travel = clamp01((progress - 0.15) / 0.85) ** 1.7;
    const scaleY = 1 + (squeeze - 1) * narrowing;

    // The left and right edge at height `y`: the closer to the dock, the
    // closer they are pulled towards its icon.
    const edges = (y: number) => {
      const pull = smoothstep(clamp01(y / target)) * narrowing;
      return [
        left + (centre - iconHalf - left) * pull,
        left + width + (centre + iconHalf - left - width) * pull,
      ];
    };

    slices.forEach((slice, index) => {
      const top = index * sliceHeight * scaleY + travel * target;
      const [topLeft, topRight] = edges(top);
      const [bottomLeft, bottomRight] = edges(top + sliceHeight * scaleY);
      const scaleX = (topRight - topLeft) / width;

      slice.style.transform = `translate(${topLeft}px,${top}px) scale(${scaleX},${scaleY})`;

      const insetLeft = (bottomLeft - topLeft) / scaleX;
      const insetRight = (topRight - bottomRight) / scaleX;
      slice.style.clipPath = `polygon(0 0,${width}px 0,${width - insetRight}px 100%,${insetLeft}px 100%)`;
      slice.style.opacity = String(clamp01((target - top) / 18));
    });

    if (time < 1) {
      frameId = requestAnimationFrame(draw);
      return;
    }

    layer.remove();
    onDone();
  };

  draw(start);

  return () => {
    cancelAnimationFrame(frameId);
    layer.remove();
  };
}
