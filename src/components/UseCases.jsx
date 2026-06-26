function GitHubMark() {
  return (
    <svg fill="currentColor" height="15" viewBox="0 0 24 24" width="15">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const EXAMPLES_REPO = 'https://github.com/tuvl-io/examples';

const CASES = [
  {
    title: 'Smart Document Extraction',
    description: 'Parse, route, and extract structured JSON from PDFs and images — no glue code, just YAML.',
    icon: (
      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Customer Support Triage',
    description: 'Classify incoming tickets, route by intent, and hand off to the right agent or human.',
    icon: (
      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Local RAG Pipelines',
    description: 'Connect local LLMs to private data and retrieve over pgvector — without leaving your machine.',
    icon: (
      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

export default function UseCases() {
  return (
    <section className="insight" id="use-cases" style={{ background: 'transparent' }}>
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">What can you build?</span>
        <h2 className="section-title">
          Production templates.<br />
          <span className="grad">Cloned, not copied.</span>
        </h2>
        <p className="section-sub">
          A growing, open collection of production-ready YAML templates and reference
          architectures. Clone one, run it locally, make it yours — new examples land regularly.
        </p>
      </div>

      <div className="insight-grid uc-grid">
        {CASES.map((useCase) => (
          <div className="i-cell uc-card" key={useCase.title}>
            <div className="uc-icon">{useCase.icon}</div>
            <div className="uc-title">{useCase.title}</div>
            <div className="i-cell-text uc-desc">{useCase.description}</div>
          </div>
        ))}
      </div>

      <div className="uc-cta">
        <a className="btn btn-ghost" href={EXAMPLES_REPO} rel="noopener" target="_blank">
          <GitHubMark /> Browse the examples on GitHub →
        </a>
      </div>
    </section>
  );
}
