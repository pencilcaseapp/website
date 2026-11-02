import { useEffect, useRef, useState } from 'react';

/** Whether the element has scrolled out past the top of the viewport. */
export function useScrolledOut<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsOut(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, isOut] as const;
}
