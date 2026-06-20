import { useState } from 'react';
import { docs } from '../data/version.js';

function GitHubMark() {
  return (
    <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const CMD = 'uv tool install tuvl && tuvl init my-app';
const DOCS_LINK_LABEL = 'tuvl.dev';

export default function Cta() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="cta cta-futuristic" id="get-started">
      <div className="cta-card">
        <div className="cta-glow" />
        <span className="eyebrow eyebrow-cyan">open source · local-first · stateless</span>
        <h2>
          Ship the contract.<br />
          <span className="grad">We handle the execution.</span>
        </h2>
        <p>
          Stop trapping your workflows inside proprietary cloud builders. Define your AI
          routing in portable YAML, hand it to your IDE, and let tuvl&apos;s open-source
          engine run it anywhere.
        </p>

        <button
          aria-label="Copy install command"
          className={`cta-cmd${copied ? ' is-copied' : ''}`}
          onClick={handleCopy}
          type="button"
        >
          <span className="cta-cmd-prompt">$</span>
          <code>{CMD}</code>
          <span className="cta-cmd-copy">{copied ? 'copied' : 'copy'}</span>
        </button>

        <div className="cta-foot">
          <a className="cta-foot-link" href={docs('/')} rel="noopener" target="_blank">
            Docs ({DOCS_LINK_LABEL}) →
          </a>
          <span className="cta-foot-sep" aria-hidden="true">·</span>
          <a className="cta-foot-link" href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank">
            <GitHubMark /> Star on GitHub
          </a>
          <span className="cta-foot-sep" aria-hidden="true">·</span>
          <a className="cta-foot-link" href="mailto:developer@tuvl.io">developer@tuvl.io</a>
        </div>
      </div>
    </section>
  );
}
