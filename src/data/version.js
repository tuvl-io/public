export const VERSION_TAG = 'v2.0.0';

/**
 * The install command. `tuvl[standard]` is the toolchain (init, generate, verify, review, dev with Insight and the
 * terminal UI); the bare `tuvl` is only the production server.
 */
export const installCmd = () => 'uv tool install "tuvl[standard]"';

/** The 2.0 examples are on the examples repo's default branch. */
export const examplesUrl = () => 'https://github.com/tuvl-io/examples';

// tuvl.dev is the main documentation host (a single, unversioned MkDocs site).
// The same content is also mirrored same-origin at tuvl.io/docs — the compiled
// MkDocs site is copied into the Pages artefact by the portal's deploy-pages
// workflow — and on-site nav links stay on tuvl.io via this base.
export const DOCS_BASE = '/docs';

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
