import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

/**
 * The page glides to a section (`scroll-behavior: smooth` in `app.css`),
 * which would also glide through the old page after every other client
 * side navigation. Only a link to a section keeps the glide: for a new
 * page and for back and forward, the scroll `ScrollRestoration` makes
 * jumps.
 */
export function useInstantPageChange() {
  const location = useLocation();
  const isSectionLink = useNavigationType() !== 'POP'
    && location.hash !== '';

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior
      = isSectionLink ? '' : 'auto';
  }, [location, isSectionLink]);
}
