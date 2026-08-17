/* Thin GA4 wrapper — safe no-op when gtag is absent (blocked, dev, SSR). */

export function track(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/* Delegated outbound-link tracking: one listener catches every external link
   on the page (nav, hero, cards, footer) — present and future — so individual
   components never need instrumentation. */
export function initOutboundTracking() {
  const handler = (e) => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (!/^https?:\/\//.test(href)) return;
    let destination = 'external';
    try {
      const host = new URL(href).hostname;
      if (host.includes('github.com')) destination = 'github';
      else if (host.includes('tuvl.io')) destination = href.includes('/docs') ? 'docs' : 'tuvl.io';
    } catch {
      /* malformed href — keep generic destination */
    }
    track('outbound_click', {
      destination,
      link_url: href,
      link_text: (a.textContent || '').trim().slice(0, 60),
    });
  };
  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
}

/* Scroll-depth funnel: fire section_view once per section[id] per page load.
   Answers "how far down the pitch do visitors actually get?" */
export function initSectionTracking() {
  if (!('IntersectionObserver' in window)) return () => {};
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        track('section_view', { section_id: entry.target.id });
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.25 },
  );
  sections.forEach((s) => io.observe(s));
  return () => io.disconnect();
}
