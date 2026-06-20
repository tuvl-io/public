import { useEffect } from 'react';

/* Tracks the pointer and writes it to CSS custom properties on <html>:
   --mx/--my  → absolute viewport px (for the ambient glow layer)
   --mxn/--myn → normalised -1..1 from centre (for parallax shifts)
   rAF-coalesced so we touch the DOM at most once per frame, and a complete
   no-op when the user prefers reduced motion. No animation library. */
export function usePointerGlow() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return; // skip touch devices

    const root = document.documentElement;
    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      root.style.setProperty('--mx', `${px}px`);
      root.style.setProperty('--my', `${py}px`);
      root.style.setProperty('--mxn', ((px / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty('--myn', ((py / window.innerHeight) * 2 - 1).toFixed(3));
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
