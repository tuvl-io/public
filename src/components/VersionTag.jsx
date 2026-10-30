import { VERSION_TAG } from '../data/version.js';

/** The release badge in the hero. */
export default function VersionTag() {
  return (
    <a className="tag" href="https://github.com/tuvl-io/tuvl/blob/main/CHANGELOG.md" rel="noopener" target="_blank">
      <span className="tag-dot" aria-hidden="true" />{VERSION_TAG} · open source · Apache 2.0
    </a>
  );
}
