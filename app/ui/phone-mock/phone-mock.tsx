import classNames from 'classnames';
import { useRef } from 'react';
import { useElementWidth } from '~/hooks/use-element-width';
import { EditorMock } from '../editor-mock/editor-mock';

const PHONE_WIDTH = 300;
const PHONE_HEIGHT = 620;

export interface PhoneMockProps {
  className?: string;
}

/**
 * The editor on a phone. It is laid out at a phone's size and scaled to
 * the width it is given, so the document looks the same at any size.
 */
export const PhoneMock: React.FC<PhoneMockProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref, PHONE_WIDTH);

  return (
    <div
      ref={ref}
      className={classNames('relative', className)}
      style={{ aspectRatio: `${PHONE_WIDTH} / ${PHONE_HEIGHT}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left overflow-hidden rounded-[44px] border-6 border-pca-grey-900 bg-pca-white shadow-window"
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          scale: String(width / PHONE_WIDTH),
        }}
      >
        <EditorMock />
      </div>
    </div>
  );
};
