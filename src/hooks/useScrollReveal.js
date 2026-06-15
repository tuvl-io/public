import { useEffect } from 'react';

const SELECTOR = '.card, .step, .aud-card, .i-cell';

export function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(SELECTOR));
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal'));
      return;
    }

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 35, 240)}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.05 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
