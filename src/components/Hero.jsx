import { useState } from 'react';
import { VERSION_TAG, docs } from '../data/version.js';

function ChevronRightTiny() {
  return (
    <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <rect height="13" rx="2" width="13" x="9" y="9" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="13">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const INSTALL_CMD = 'uv tool install tuvl';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <section className="hero hero-futuristic" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <a className="pill" href={docs('/changelog')} rel="noopener" target="_blank">
          <span className="pill-dot" />
          <span>{VERSION_TAG} · beta</span>
          <ChevronRightTiny />
        </a>

        <h1 className="hero-title">
          Business logic,<br />
          <span className="grad">declared in YAML.</span>
        </h1>

        <p className="hero-sub">
          A production runtime for AI workflows and APIs, driven by YAML-defined business logic. No brittle Python boilerplate — declare it once, get a production-ready API instantly. Open-source, local-first, and fast.
        </p>

        <div className="hero-install">
          <button
            aria-label="Copy install command"
            className={`hero-install-line${copied ? ' is-copied' : ''}`}
            onClick={handleCopy}
            type="button"
          >
            <span className="hero-install-prompt">$</span>
            <code>{INSTALL_CMD}</code>
            <span className="hero-install-copy">
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'copied' : 'copy'}
            </span>
          </button>
          <a className="hero-install-alt" href={docs('/getting-started/quickstart')} rel="noopener" target="_blank">
            Read the manual →
          </a>
          <p className="hero-install-note">
            Beta — solid for building &amp; evaluating; hold off on production until the stable release (coming soon).
          </p>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">
              34<span className="hero-stat-unit">KB</span>
            </div>
            <div className="hero-stat-lbl">whole engine contract</div>
          </div>
          <span className="hero-stat-sep" aria-hidden="true" />
          <div className="hero-stat">
            <div className="hero-stat-num">
              0<span className="hero-stat-unit">deps</span>
            </div>
            <div className="hero-stat-lbl">on complex cloud services</div>
          </div>
          <span className="hero-stat-sep" aria-hidden="true" />
          <div className="hero-stat">
            <div className="hero-stat-num">
              &lt;1<span className="hero-stat-unit">s</span>
            </div>
            <div className="hero-stat-lbl">cold start</div>
          </div>
        </div>
      </div>
    </section>
  );
}
