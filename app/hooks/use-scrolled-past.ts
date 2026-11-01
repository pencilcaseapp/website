import { useEffect, useState } from 'react';

/** Whether the page has scrolled further down than `offset` pixels. */
export function useScrolledPast(offset: number) {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const update = () => setIsPast(window.scrollY > offset);

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [offset]);

  return isPast;
}
