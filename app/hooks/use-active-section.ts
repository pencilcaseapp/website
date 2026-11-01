import { useEffect, useState } from 'react';

/**
 * The last of the given `#section` links whose section has scrolled into
 * the top third of the screen, or `null` above all of them.
 */
export function useActiveSection(hrefs: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = hrefs.join(' ');

  useEffect(() => {
    const sections = key.split(' ').filter(href => href.startsWith('#'));

    const update = () => {
      let current: string | null = null;

      for (const href of sections) {
        const top = document.querySelector(href)?.getBoundingClientRect().top;

        if (top !== undefined && top < window.innerHeight / 3) {
          current = href;
        }
      }

      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [key]);

  return active;
}
