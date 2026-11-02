import { useEffect, useState } from 'react';
import { PYPI_URL, VERSION_TAG } from '../data/version.js';

const CACHE_KEY = 'tuvl.latest-version';
const CACHE_MS = 60 * 60 * 1000;
const STABLE = /^\d+\.\d+\.\d+$/;

function cached() {
  try {
    const { version, at } = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') || {};
    return STABLE.test(version) && Date.now() - at < CACHE_MS ? `v${version}` : null;
  } catch {
    return null;
  }
}

/** The latest stable `tuvl` on PyPI, or the baked-in release when PyPI can't be reached. */
export function useLatestVersion() {
  const [tag, setTag] = useState(() => cached() || VERSION_TAG);
  useEffect(() => {
    if (cached()) return undefined;
    const ctl = new AbortController();
    fetch(PYPI_URL, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        const version = d?.info?.version;
        if (!STABLE.test(version)) return;
        setTag(`v${version}`);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ version, at: Date.now() }));
        } catch {
          /* private mode: show it without caching */
        }
      })
      .catch(() => {});
    return () => ctl.abort();
  }, []);
  return tag;
}

/** The release badge in the hero. */
export default function VersionTag() {
  const tag = useLatestVersion();
  return (
    <a className="tag" href="https://github.com/tuvl-io/tuvl/blob/main/CHANGELOG.md" rel="noopener" target="_blank">
      <span className="tag-dot" aria-hidden="true" />{tag} · open source · Apache 2.0
    </a>
  );
}
