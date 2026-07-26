export const VERSION_TAG = 'v1.0.0';

// Docs ship as a same-origin subpage at /docs — the compiled MkDocs site is
// copied into the Pages artefact by the deploy workflow (see
// .github/workflows/deploy-pages.yml). The versioned mirror at tuvl.dev stays
// live and remains the canonical host; on-site links stay on tuvl.io.
export const DOCS_BASE = '/docs';

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
