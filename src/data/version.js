export const VERSION_TAG = 'v1.0.0';

// Docs ship as a single, unversioned same-origin subpage at tuvl.io/docs — the
// compiled MkDocs site is built and copied into the Pages artefact by the
// portal's deploy-pages workflow. This is the canonical host; there is no
// separate versioned docs site.
export const DOCS_BASE = '/docs';

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
