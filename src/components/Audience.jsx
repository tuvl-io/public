import { docs } from '../data/version.js';

function CodeIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect height="18" rx="2" width="18" x="3" y="3" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

export default function Audience() {
  return (
    <section className="audience">
      <div className="section-head">
        <span className="eyebrow">Built for</span>
        <h2 className="section-title">Different roles.<br />Same source of truth.</h2>
      </div>
      <div className="aud-grid">
        <article className="aud-card">
          <div className="aud-icon"><CodeIcon /></div>
          <h3>Developers</h3>
          <p>
            Replace ad-hoc LLM scripts with signal-driven pipelines. YAML lives next to your
            code. Every execution streams structured events you can inspect.
          </p>
          <a className="aud-link" href={docs('/getting-started/quickstart')} rel="noopener" target="_blank">
            Quickstart →
          </a>
        </article>

        <article className="aud-card">
          <div className="aud-icon"><TableIcon /></div>
          <h3>Teams &amp; PMs</h3>
          <p>
            Every step is named. Every AI decision is logged with its signal and context
            snapshot. Know exactly what your system did — and why.
          </p>
          <a className="aud-link" href={docs('/concepts/architecture')} rel="noopener" target="_blank">
            Architecture →
          </a>
        </article>

        <article className="aud-card">
          <div className="aud-icon"><StackIcon /></div>
          <h3>Founders &amp; investors</h3>
          <p>
            Open-source infrastructure for production AI backends. Enterprise IAM, audit
            trails, data sovereignty — built in from day one.
          </p>
          <a className="aud-link" href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank">
            GitHub →
          </a>
        </article>
      </div>
    </section>
  );
}
