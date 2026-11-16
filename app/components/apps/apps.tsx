import { APP_UPGRADE_HINT, APPS } from '~/constants/apps';
import { Button } from '~/ui/button/button';
import { Container } from '~/ui/container/container';

type Os = keyof typeof APPS;

const LOGOS: Record<Os, string> = {
  ios: 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701',
  android: 'M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z',
};

const PHONE = 'absolute h-auto select-none '
  + 'drop-shadow-[0_24px_28px_rgb(0_0_0/0.22)]';

/**
 * The offer of the iOS and Android apps, as one wide panel: the
 * headline top left, the two store buttons bottom left, and on the
 * right the app on two phones, the editor in front of the menu, both
 * cut off by the panel's lower edge. Below `lg` the phones stand under
 * the copy. The phones are screenshots of the app itself in a flat
 * frame, and nothing tells an iPhone from an Android phone.
 */
export const Apps: React.FC = () => (
  // The page's last section: with the layout's own 96px under it, the
  // panel stands three quarters of its distance to the section above
  // away from the footer instead of half.
  <section id="apps" className="pt-36 pb-3 sm:pt-48 sm:pb-12">
    <Container>
      <div className="relative overflow-hidden rounded-[2.5rem] bg-pca-pop-blue lg:aspect-[16/9]">
        <div className="relative z-10 flex h-full flex-col items-start p-7 sm:p-10 lg:p-14">
          <h2 className="type-lead text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
            Download the app, and write
            {' '}
            <br className="max-sm:hidden" />
            your docs anywhere.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3 lg:mt-auto">
            <StoreButton os="ios" />
            <StoreButton os="android" />
          </div>
          <p className="type-caption mt-4 text-left text-pca-grey-800 sm:whitespace-nowrap">
            {APP_UPGRADE_HINT}
          </p>
        </div>
        {/* The phones take a little less room at `lg`, which leaves the
            row of buttons clear of them. There the front phone keeps the
            copy's 56px to the panel's top and right edge. */}
        <div className="relative mx-auto mt-4 aspect-[6/5] w-full max-w-[560px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[52%] lg:max-w-none xl:w-[58%]">
          <img
            src="/apps/menu.webp"
            alt="The pencil case app on a phone: the menu with the list of documents"
            width={753}
            height={1586}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`${PHONE} top-[30%] left-[6%] w-[47%]`}
          />
          <img
            src="/apps/editor.webp"
            alt="The pencil case app on a phone: a shared list for a trip to Lisbon, with a friend writing in it"
            width={720}
            height={1465}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`${PHONE} top-[8%] right-[6%] w-[54%] lg:top-14 lg:right-14`}
          />
        </div>
      </div>
    </Container>
  </section>
);

const StoreButton: React.FC<{ os: Os }> = ({ os }) => (
  <Button
    as="a"
    href={APPS[os].href}
    target="_blank"
    rel="noreferrer"
    aria-label={APPS[os].label}
    size="compact"
    isExternal
    className="max-sm:px-4 max-sm:text-base"
  >
    {/* Inline and shifted down to the middle of the capitals: the
        button centres its label by cap height, which a flex box around
        the mark and the name would throw off. */}
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mr-2 inline-block size-[1em] align-[-0.15em]"
      fill="currentColor"
    >
      <path d={LOGOS[os]} />
    </svg>
    {APPS[os].store}
  </Button>
);
