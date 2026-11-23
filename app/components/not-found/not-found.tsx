import { useEffect } from 'react';
import { href, Link } from 'react-router';
import { useConfig } from '~/hooks/use-config';
import { Button } from '~/ui/button/button';
import { Logo } from '~/ui/logo/logo';

declare global {
  interface Window {
    plausible?: (event: string) => void;
  }
}

/**
 * The page for an address with nothing behind it, on its own without the
 * header and the footer: the logo, the sad pencil and the way back home.
 * Reports itself to Plausible as a `404` event.
 */
export const NotFound: React.FC = () => {
  const { analytics } = useConfig();

  useEffect(() => {
    if (analytics) {
      window.plausible?.('404');
    }
  }, [analytics]);

  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center bg-pca-white px-4 py-14 text-center"
    >
      <title>Page not found – pencil case</title>
      <Link
        to={href('/')}
        className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pca-grey-900"
      >
        <Logo />
      </Link>
      <img
        src="/sad-pencil.svg"
        alt=""
        width={180}
        height={180}
        className="mt-12 size-36 sm:size-45"
      />
      <h1 className="type-hero mt-8 text-balance">Page not found.</h1>
      <p className="type-lead mx-auto mt-6 max-w-[32ch] sm:mt-8">
        This page doesn’t exist. Maybe it moved, or the link has a typo.
      </p>
      <Button as={Link} to={href('/')} className="mt-10">
        Back to home
      </Button>
    </main>
  );
};
