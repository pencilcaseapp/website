import { useEffect } from 'react';
import { href, Link } from 'react-router';
import { FloatingNav } from '~/components/floating-nav/floating-nav';
import { MobileMenu } from '~/components/mobile-menu/mobile-menu';
import { SiteHeader } from '~/components/site-header/site-header';
import { useConfig } from '~/hooks/use-config';
import { Button } from '~/ui/button/button';
import { Container } from '~/ui/container/container';
import { trackEvent } from '~/utils/analytics';

/**
 * The page for an address with nothing behind it, under the white header
 * and without the footer: the sad pencil and the way back home.
 * Reports itself to Plausible as a `404` event.
 */
export const NotFound: React.FC = () => {
  const { analytics } = useConfig();

  useEffect(() => {
    if (analytics) {
      trackEvent('404');
    }
  }, [analytics]);

  return (
    <div className="flex min-h-svh flex-col bg-pca-white">
      <title>Page not found – pencil case</title>
      <SiteHeader tone="white" />
      <FloatingNav />
      <MobileMenu />
      <main id="main" className="flex flex-1 items-center py-14">
        <Container className="flex flex-col items-center text-center">
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
          <Button as={Link} to={href('/')} className="mt-10">
            Back to home
          </Button>
        </Container>
      </main>
    </div>
  );
};
