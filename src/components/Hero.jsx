import { docs, VERSION_TAG } from '../data/version.js';
import CodeDemo from './CodeDemo.jsx';

function ChevronRightTiny() {
  return (
    <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg fill="none" height="14" viewBox="0 0 16 16" width="14">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <a className="pill" href="#insight">
          <span className="pill-dot" />
          <span>{VERSION_TAG} — beta dropped</span>
          <ChevronRightTiny />
        </a>

        <h1 className="hero-title">
          Stop vibing with AI.
          <span className="grad">Engineer it.</span>
        </h1>

        <p className="hero-sub">
          tuvl compiles declarative YAML into auditable, local-first FastAPI endpoints.
          Signal-driven routing. Streaming observability. Zero black boxes.
        </p>

        <div className="hero-name">
          <img alt="" className="hero-name-mark" src="/assets/logo.png" />
          <div className="hero-name-text">
            <span className="hero-name-word">tuvl</span>
            <span className="hero-name-meta">
              <span className="hero-name-mal">തൂവൽ</span>
              <span className="hero-name-sep">·</span>
              <span className="hero-name-ipa">/ˈtuːvəl/</span>
              <span className="hero-name-sep">·</span>
              <span className="hero-name-en">feather</span>
            </span>
          </div>
        </div>

        <div className="hero-cta">
          <a
            className="btn btn-primary"
            href={docs('/getting-started/quickstart')}
            rel="noopener"
            target="_blank"
          >
            Start building
            <ArrowRight />
          </a>
          <a
            className="btn btn-ghost"
            href="https://github.com/tuvl-io/tuvl"
            rel="noopener"
            target="_blank"
          >
            <GitHubMark />
            Star on GitHub
          </a>
        </div>

        <p className="demo-label"><span>Three steps.</span> One production API.</p>
        <CodeDemo />
      </div>
    </section>
  );
}
