export const VERSION_TAG = 'v2.0.0';

// 2.0.0 general availability. Until then the page counts down and installs the beta.
export const RELEASE_AT = '2026-10-30T00:00:00Z';
export const BETA_VERSION = '2.0.0b10';

export const isReleased = (now = Date.now()) => now >= Date.parse(RELEASE_AT);

/**
 * The install command for today. `tuvl[standard]` is the toolchain (init, generate, verify, review, dev with Insight and
 * the terminal UI); the bare `tuvl` is only the production server. uv takes a pre-release pulled in by an extra only
 * with --prerelease allow.
 */
export const installCmd = (now = Date.now()) =>
  isReleased(now)
    ? 'uv tool install "tuvl[standard]"'
    : `uv tool install --prerelease allow "tuvl[standard]==${BETA_VERSION}"`;

/** The 2.0 examples are on the examples repo's default branch. */
export const examplesUrl = () => 'https://github.com/tuvl-io/examples';

// tuvl.dev is the main documentation host (a single, unversioned MkDocs site).
// The same content is also mirrored same-origin at tuvl.io/docs — the compiled
// MkDocs site is copied into the Pages artefact by the portal's deploy-pages
// workflow — and on-site nav links stay on tuvl.io via this base.
export const DOCS_BASE = '/docs';

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
