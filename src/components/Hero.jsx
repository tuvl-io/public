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

const BUILT_ON = [
  ['FastAPI', 'https://fastapi.tiangolo.com'],
  ['SQLModel', 'https://sqlmodel.tiangolo.com'],
  ['LiteLLM', 'https://docs.litellm.ai'],
  ['Biscuit', 'https://www.biscuitsec.org'],
  ['OpenTelemetry', 'https://opentelemetry.io'],
  ['pgvector', 'https://github.com/pgvector/pgvector'],
  ['MCP', 'https://modelcontextprotocol.io'],
];

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
          <span>{VERSION_TAG} · stable beta</span>
          <ChevronRightTiny />
        </a>

        <h1 className="hero-title">
          Give your AI agent a<br />
          <span className="grad">contract it can&apos;t break.</span>
        </h1>

        <p className="hero-sub">
          Prompting an AI to write imperative backend logic creates brittle spaghetti.
          tuvl shifts orchestration to a strict YAML schema. Your agent generates the
          configuration perfectly; our stateless ASGI router handles the execution.
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
        </div>

        <div className="hero-builton" aria-label="Built on">
          <span className="hero-builton-lbl">built on</span>
          {BUILT_ON.map(([name, href], i) => (
            <span key={name} className="hero-builton-item">
              <a href={href} rel="noopener" target="_blank">{name}</a>
              {i < BUILT_ON.length - 1 && <span className="hero-builton-sep" aria-hidden="true">·</span>}
            </span>
          ))}
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
            <div className="hero-stat-lbl">on torch / langchain</div>
          </div>
          <span className="hero-stat-sep" aria-hidden="true" />
          <div className="hero-stat">
            <div className="hero-stat-num">
              &lt;300<span className="hero-stat-unit">ms</span>
            </div>
            <div className="hero-stat-lbl">cold start mount</div>
          </div>
        </div>
      </div>
    </section>
  );
}
