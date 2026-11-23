import { useEffect } from 'react';
import { Link } from 'react-router';
import { useConfig } from '~/hooks/use-config';
import { Button } from '~/ui/button/button';
import { Container } from '~/ui/container/container';

declare global {
  interface Window {
    plausible?: (event: string) => void;
  }
}

/**
 * The page for an address with nothing behind it: the sad pencil and the
 * way back home. Reports itself to Plausible as a `404` event.
 */
export const NotFound: React.FC = () => {
  const { analytics } = useConfig();

  useEffect(() => {
    if (analytics) {
      window.plausible?.('404');
    }
  }, [analytics]);

  return (
    <Container className="flex flex-col items-center pt-14 text-center sm:pt-20">
      <title>Page not found – pencil case</title>
      <img
        src="/sad-pencil.svg"
        alt=""
        width={180}
        height={180}
        className="size-36 sm:size-45"
      />
      <h1 className="type-hero mt-8 text-balance">Page not found.</h1>
      <p className="type-lead mx-auto mt-6 max-w-[32ch] sm:mt-8">
        This page doesn’t exist. Maybe it moved, or the link has a typo.
      </p>
      <Button as={Link} to="/" className="mt-10">Back to home</Button>
    </Container>
  );
};
