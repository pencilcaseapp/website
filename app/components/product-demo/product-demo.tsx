import { PhoneMock } from '~/ui/phone-mock/phone-mock';
import { ResizableWindow } from './resizable-window';

/**
 * The editor in a browser window that can be narrowed to a tablet and a
 * phone, closed and minimised (`ResizableWindow`), next to the pencil.
 * Below `md` it is a phone to begin with.
 */
export const ProductDemo: React.FC = () => (
  <div className="group/collage @container relative mx-auto mt-14 flow-root md:mt-16 md:w-[min(850px,56vw)]">
    <ResizableWindow />
    <div className="-mb-24 flex justify-center md:hidden">
      <PhoneMock className="w-[76%] max-w-[320px]" />
    </div>
    <img
      src="/waving-pencil.svg"
      alt=""
      width={180}
      height={180}
      className="pointer-events-none absolute bottom-[-0.7cqw] left-[-38cqw] hidden w-[48cqw] max-w-none select-none md:block md:group-has-[[data-window-gone]]/collage:hidden"
    />
    <img
      src="/sad-pencil.svg"
      alt=""
      width={180}
      height={180}
      className="pointer-events-none absolute bottom-[-0.7cqw] left-[-38cqw] hidden w-[48cqw] max-w-none select-none md:group-has-[[data-window-gone]]/collage:block"
    />
  </div>
);
