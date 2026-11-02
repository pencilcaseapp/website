import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';

/**
 * The page glides to a section (`scroll-behavior: smooth` in `app.css`),
 * which would also glide through the old page after every other client
 * side navigation. Only a link to a section of the same page keeps the
 * glide: for a new page, a section of another page and for back and
 * forward, the scroll `ScrollRestoration` makes jumps.
 */
export function useInstantPageChange() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(location.pathname);

  useLayoutEffect(() => {
    const isSectionLink = navigationType !== 'POP'
      && location.hash !== ''
      && location.pathname === previousPathname.current;
    previousPathname.current = location.pathname;

    document.documentElement.style.scrollBehavior
      = isSectionLink ? '' : 'auto';
  }, [location, navigationType]);
}
