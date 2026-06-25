export default function UseCases() {
  const CASES = [
    {
      title: 'Smart Document Extraction',
      description: 'Automatically parse, route, and extract structured JSON data from PDFs and images with high accuracy.',
      icon: (
        <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      title: 'Customer Support Triage',
      description: 'Analyze incoming user tickets, classify the intent, and route them to the correct department or automated agent.',
      icon: (
        <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: 'Local RAG Pipelines',
      description: 'Connect local LLMs to your private data sources securely, without ever sending your sensitive data to cloud APIs.',
      icon: (
        <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      )
    }
  ];

  return (
    <section className="insight" id="use-cases" style={{ background: 'transparent' }}>
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">What can you build?</span>
        <h2 className="section-title">
          Endless possibilities.<br />
          <span className="grad">One simple contract.</span>
        </h2>
        <p className="section-sub">
          Whether you're building simple data extractors or complex autonomous agents, tuvl scales with your ambition.
        </p>
      </div>

      <div className="insight-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '0 2rem' }}>
        {CASES.map((useCase, i) => (
          <div className="i-cell" key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ color: '#00f0ff', marginBottom: '1rem' }}>{useCase.icon}</div>
            <div className="i-cell-num" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{useCase.title}</div>
            <div className="i-cell-text" style={{ fontSize: '1rem' }}>{useCase.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
