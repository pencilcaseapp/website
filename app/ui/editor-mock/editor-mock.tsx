import classNames from 'classnames';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';
import { LogoMark } from '../logo/logo-mark';

const TOOLBAR_GROUPS: IconName[][] = [
  ['h1', 'h2', 'h3'],
  ['bold', 'italic', 'underline'],
  ['listUl', 'listOl', 'listCheck'],
];

const CHECKLIST = [
  { label: 'Flights', checked: true },
  { label: 'Apartment in Alfama', checked: true },
  { label: 'Dinner on Friday', checked: false },
];

/**
 * A simplified pencil case document, drawn to fill whatever box it is
 * given. It reads its own width through container queries: the browser
 * bar makes way for a phone's status bar below 32rem, and the toolbar
 * fades out below 48rem.
 */
export const EditorMock: React.FC = () => (
  <div className="@container pointer-events-none flex size-full flex-col bg-pca-white text-left text-pca-grey-900 select-none">
    <BrowserBar />
    <div
      role="img"
      aria-label="A pencil case document, Lisbon in May, with a check list and the cursors of two friends writing along"
      className="flex min-h-0 grow flex-col"
    >
      <div className="hidden h-11 shrink-0 items-end justify-between px-7 pb-1.5 text-[13px] font-semibold @max-[32rem]:flex">
        <span>19:02</span>
        <span className="mb-0.5 h-2.5 w-6 rounded-[3px] bg-pca-grey-900" />
      </div>
      <div className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center px-3">
        <Icon icon="sidebar" className="size-5" />
        <div className="flex items-center transition-opacity duration-150 ease-out motion-reduce:transition-none @max-[48rem]:opacity-0 @max-[32rem]:hidden">
          {TOOLBAR_GROUPS.map((group, index) => (
            <div
              key={group[0]}
              className={classNames(
                'flex items-center gap-0.5',
                index > 0 && 'ml-2 border-l border-black/10 pl-2',
              )}
            >
              {group.map(icon => (
                <span
                  key={icon}
                  className={classNames(
                    'grid size-7 place-items-center rounded-lg',
                    icon === 'h1' && 'bg-pca-grey-900 text-pca-white',
                  )}
                >
                  <Icon icon={icon} className="size-[18px]" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="col-start-3 flex items-center justify-end gap-2.5">
          <div className="flex -space-x-1.5">
            <span className="size-5 rounded-full bg-pca-pop-blue ring-2 ring-pca-white" />
            <span className="size-5 rounded-full bg-pca-pop-pink ring-2 ring-pca-white" />
          </div>
          <span className="block h-2.5 w-9 rounded-full bg-pca-grey-900" />
          <Icon icon="share" className="size-[18px]" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[28rem] grow overflow-hidden px-6 pt-5 @min-[32rem]:pt-9">
        <p className="text-[1.75rem] leading-[1.22] font-bold tracking-[-0.021em]">
          Lisbon in May
          <RemoteCursor
            name="Capybara"
            color="bg-pca-pop-blue"
            className="ml-0.5 h-7"
          />
        </p>
        <p className="mt-4 text-base leading-relaxed">
          Four days, five friends, one list. Add what you want to see and
          tick off what is booked.
        </p>
        <ul className="mt-5 flex list-disc flex-col gap-1 pl-6 text-base leading-relaxed">
          <li>Time Out Market on the first night</li>
          <li>Tram 28, before the queues</li>
          <li>
            A day in Sintra
            <RemoteCursor
              name="Axolotl"
              color="bg-pca-pop-pink"
              className="ml-0.5 h-5"
            />
          </li>
        </ul>
        <ul className="mt-5 flex flex-col gap-2 text-base leading-6">
          {CHECKLIST.map(item => (
            <li key={item.label} className="flex items-start gap-2">
              <span
                className={classNames(
                  'size-6 shrink-0 rounded-lg',
                  item.checked
                    ? 'bg-pca-grey-900 bg-checkmark-white bg-[length:13px] bg-center bg-no-repeat'
                    : 'border border-pca-grey-900 bg-pca-white',
                )}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const BrowserBar: React.FC = () => (
  <div className="flex h-10 shrink-0 items-center gap-3 bg-pca-grey-100 pr-3 pl-4 @max-[32rem]:hidden">
    <div className="flex gap-1.5">
      <span className="size-3 rounded-full bg-pca-pop-pink" />
      <span className="size-3 rounded-full bg-pca-pop-yellow" />
      <span className="size-3 rounded-full bg-pca-pop-blue" />
    </div>
    <div className="flex h-8 shrink-0 items-center gap-2 self-end rounded-t-xl bg-pca-white px-3">
      <LogoMark className="h-4 w-auto" />
      <span className="block h-2 w-14 rounded-full bg-pca-grey-300" />
    </div>
    <div className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-pca-white px-3 text-xs text-pca-grey-700">
      <Icon icon="link" className="size-3.5 shrink-0" />
      <span className="truncate">pencilcase.app</span>
    </div>
  </div>
);

interface RemoteCursorProps {
  name: string;
  color: string;
  className: string;
}

const RemoteCursor: React.FC<RemoteCursorProps> = ({
  name,
  color,
  className,
}) => (
  <span
    className={classNames(
      'relative inline-block w-0.5 shrink-0 align-[-0.2em]',
      color,
      className,
    )}
  >
    <span
      className={classNames(
        'absolute bottom-full left-0 rounded-sm rounded-bl-none px-1.5 py-0.5',
        'text-[11px] leading-none font-semibold tracking-normal',
        'whitespace-nowrap text-pca-grey-900',
        color,
      )}
    >
      {name}
    </span>
  </span>
);
