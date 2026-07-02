export const VERSION_TAG = 'v2026.2.5';

const SEMVER = VERSION_TAG.replace(/^v/, '');
const IS_PRERELEASE = /-(beta|alpha|rc)\./.test(SEMVER);

// Release channel — still surfaced as the Docs nav badge.
export const DOCS_ALIAS = IS_PRERELEASE ? 'beta' : 'latest';

// Docs ship as a same-origin subpage at /docs — the compiled MkDocs site is
// copied into the Pages artefact by the deploy workflow (see
// .github/workflows/deploy-pages.yml). The versioned mirror at tuvl.dev stays
// live and remains the canonical host; on-site links stay on tuvl.io.
export const DOCS_BASE = '/docs';

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
