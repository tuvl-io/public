export const VERSION_TAG = 'v1.0.1';

// tuvl.dev is the main documentation host (a single, unversioned MkDocs site).
// The same content is also mirrored same-origin at tuvl.io/docs — the compiled
// MkDocs site is copied into the Pages artefact by the portal's deploy-pages
// workflow — and on-site nav links stay on tuvl.io via this base.
export const DOCS_BASE = '/docs';

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
