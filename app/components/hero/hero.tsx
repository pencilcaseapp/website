import { APP_URL } from '~/constants/links';
import { FREE_DOCUMENT_LIMIT } from '~/constants/plans';
import { Container } from '~/ui/container/container';
import { Button } from '~/ui/button/button';
import { HandArrow } from '~/ui/hand-note/hand-note';
import { useScrollDrift } from '~/hooks/use-scroll-drift';
import { ProductDemo } from '../product-demo/product-demo';

export const Hero: React.FC = () => {
  const driftRef = useScrollDrift<HTMLDivElement>();

  return (
    <section className="rounded-b-[2.5rem] bg-pca-yellow-500 sm:rounded-b-[3.5rem]">
      <Container className="pt-12 text-center sm:pt-20">
        <div ref={driftRef} className="scroll-drift will-change-[translate]">
          <h1 className="type-hero">
            Docs,
            <br />
            dead simple.
          </h1>
          <p className="type-lead mx-auto mt-8 max-w-[34ch] text-balance lg:max-w-none xl:whitespace-nowrap">
            The European alternative for writing docs and sharing them with your
            friends.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <div className="relative">
              <Button as="a" href={APP_URL}>Get started</Button>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 items-center gap-2 select-none lg:flex"
              >
                <p className="type-hand -rotate-4 text-center whitespace-nowrap">
                  free for your
                  <br />
                  {`first ${FREE_DOCUMENT_LIMIT} docs`}
                </p>
                <HandArrow className="mt-3 h-9 w-[4.5rem]" />
              </div>
            </div>
            <p className="type-caption text-pca-grey-800 lg:hidden">
              {`Free for your first ${FREE_DOCUMENT_LIMIT}\u00A0docs.`}
            </p>
          </div>
        </div>
        <ProductDemo />
      </Container>
    </section>
  );
};
