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
    title: 'Invoice Extraction API',
    level: 'Easy',
    href: `${EXAMPLES_REPO}/tree/release/invoice-extraction-api`,
    description:
      'Raw invoice text in, validated Postgres records out. One Agent step with typed JSON output, a deterministic totals check, enum currencies, and a masked tax id.',
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
    title: 'Content Moderation Pipeline',
    level: 'Medium',
    href: `${EXAMPLES_REPO}/tree/release/content-moderation-pipeline`,
    description:
      'An LLM classifies, deterministic match: routing applies region policy, and borderline content suspends for a moderator group — the submitter cannot approve their own post.',
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
    title: 'KYC Onboarding',
    level: 'Complex',
    href: `${EXAMPLES_REPO}/tree/release/kyc-onboarding`,
    description:
      'An autonomous investigator under a fail-closed supervisor, policy RAG over pgvector, compliance-gated human approval, and versioned risk schemas — every field of PII masked.',
    icon: (
      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
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
          Open example projects, from a one-screen API to a compliance-grade agent pipeline.
          Each ships a build specification and runs with <code>tuvl dev</code> — clone one,
          point it at your Postgres, make it yours.
        </p>
      </div>

      <div className="insight-grid uc-grid">
        {CASES.map((useCase) => (
          <a className="i-cell uc-card" href={useCase.href} key={useCase.title} rel="noopener" target="_blank">
            <div className="uc-head">
              <div className="uc-icon">{useCase.icon}</div>
              <span className="uc-level">{useCase.level}</span>
            </div>
            <div className="uc-title">{useCase.title}</div>
            <div className="i-cell-text uc-desc">{useCase.description}</div>
          </a>
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
