/**
 * The release shown until PyPI answers (and when it can't): keep it at the latest release. The page replaces it with
 * the live latest stable version of `tuvl` from PyPI, see VersionTag.jsx.
 */
export const VERSION_TAG = 'v2.0.1';

/** PyPI's JSON API: `info.version` is the latest stable release (never a pre-release), and the API allows browser reads. */
export const PYPI_URL = 'https://pypi.org/pypi/tuvl/json';

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
