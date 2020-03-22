import { useState, useEffect } from 'react';
import { createIntersectionObserver } from '../services/intersection-observer';

export default function useIntersectionObserver (ref, options) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = createIntersectionObserver(({ isIntersecting: wasIntersected }) => {
    setIsIntersecting(wasIntersected);
  }, options);

  if (!observer) return [null];

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  });

  return [isIntersecting];
}
