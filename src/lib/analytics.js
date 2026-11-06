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
      const u = new URL(href);
      const host = u.hostname;
      if (host.includes('github.com')) destination = 'github';
      else if (host === 'try.tuvl.online') destination = 'try';
      else if (host === 'nest.tuvl.io') destination = 'nest';
      else if (host === 'tuvl.dev' || (host.endsWith('tuvl.io') && u.pathname.startsWith('/docs'))) destination = 'docs';
      else if (host.includes('tuvl.io')) destination = 'tuvl.io';
      else if (host.includes('pypi.org')) destination = 'pypi';
      else if (host.includes('npmjs.com')) destination = 'npm';
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

/* In-page navigation: which anchor links (nav, footer, buttons) people use. */
export function initNavTracking() {
  const handler = (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    if (!a) return;
    const target = (a.getAttribute('href') || '').slice(1);
    if (!target) return;
    track('nav_click', { target, in_nav: !!a.closest('nav, header') });
  };
  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
}

/* FAQ questions opened (details elements; the toggle event does not bubble, so capture it). */
export function initFaqTracking() {
  const handler = (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement) || !d.open) return;
    track('faq_open', { question: (d.querySelector('summary')?.textContent || '').trim().slice(0, 80) });
  };
  document.addEventListener('toggle', handler, { capture: true });
  return () => document.removeEventListener('toggle', handler, { capture: true });
}

/* Deepest scroll position reached: 25, 50, 75 and 100 percent, once each. */
export function initScrollDepth() {
  const marks = [25, 50, 75, 100];
  const seen = new Set();
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = (window.scrollY / max) * 100;
    for (const m of marks) {
      if (pct >= m - 1 && !seen.has(m)) {
        seen.add(m);
        track('scroll_depth', { percent: m });
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/* Time the tab was open and visible: 15 s, 60 s and 180 s, once each. */
export function initEngagedTime() {
  const marks = [15, 60, 180];
  let visible = 0;
  const id = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    visible += 1;
    if (marks.includes(visible)) track('engaged_time', { seconds: visible });
  }, 1000);
  return () => clearInterval(id);
}

/* Text copied from a code block or command (not only the Install buttons). */
export function initCopyTracking() {
  const handler = () => {
    const sel = window.getSelection?.();
    const node = sel?.anchorNode?.parentElement;
    if (!node || !node.closest('pre, code') || !String(sel).trim()) return;
    track('code_copy', { length: String(sel).length });
  };
  document.addEventListener('copy', handler);
  return () => document.removeEventListener('copy', handler);
}

/* How fast the page became usable, and script errors (at most 3 per load). */
export function initHealthTracking() {
  let errors = 0;
  const onError = (e) => {
    if (errors++ >= 3) return;
    track('js_error', { message: String(e.message || 'error').slice(0, 100), source: String(e.filename || '').split('/').pop().slice(0, 60) });
  };
  window.addEventListener('error', onError);
  const onLoad = () => {
    const nav = performance.getEntriesByType?.('navigation')?.[0];
    if (nav) track('page_timing', { load_ms: Math.round(nav.loadEventEnd), dom_ms: Math.round(nav.domContentLoadedEventEnd) });
  };
  if (document.readyState === 'complete') setTimeout(onLoad, 0);
  else window.addEventListener('load', () => setTimeout(onLoad, 0), { once: true });
  return () => window.removeEventListener('error', onError);
}
