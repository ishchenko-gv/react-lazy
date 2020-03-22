export function createIntersectionObserver (callback, observerOpts = {}) {
  if (!('IntersectionObserver' in window)) return null;

  const handleIntersection = entries => {
    const intersectionOpts = {
      isIntersecting: entries[0].isIntersecting
    };

    callback(intersectionOpts);
  };

  return new window.IntersectionObserver(handleIntersection, observerOpts);
}
