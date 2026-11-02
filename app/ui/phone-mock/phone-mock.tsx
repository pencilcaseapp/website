import classNames from 'classnames';
import { EditorMock } from '../editor-mock/editor-mock';

const PHONE_WIDTH = 300;
const PHONE_HEIGHT = 620;

export interface PhoneMockProps {
  className?: string;
}

/**
 * The editor on a phone. It is laid out at a phone's size and scaled to
 * the width it is given, so the document looks the same at any size. The
 * scale is worked out in CSS from the container's width, so the server
 * render already has it and nothing jumps once the page hydrates.
 */
export const PhoneMock: React.FC<PhoneMockProps> = ({ className }) => (
  <div
    className={classNames('@container relative', className)}
    style={{ aspectRatio: `${PHONE_WIDTH} / ${PHONE_HEIGHT}` }}
  >
    <div
      className="absolute top-0 left-0 origin-top-left overflow-hidden rounded-[44px] border-6 border-pca-grey-900 bg-pca-white shadow-window"
      style={{
        width: PHONE_WIDTH,
        height: PHONE_HEIGHT,
        scale: `calc(100cqw / ${PHONE_WIDTH}px)`,
      }}
    >
      <EditorMock />
    </div>
  </div>
);
