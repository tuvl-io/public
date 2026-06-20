export const VERSION_TAG = 'v2026.2.3-beta.3';

const SEMVER = VERSION_TAG.replace(/^v/, '');
const IS_PRERELEASE = /-(beta|alpha|rc)\./.test(SEMVER);

export const DOCS_ALIAS = IS_PRERELEASE ? 'beta' : 'latest';
export const DOCS_BASE = `https://tuvl.dev/${DOCS_ALIAS}`;

export const docs = (path = '/') => `${DOCS_BASE}${path.startsWith('/') ? path : `/${path}`}`;
