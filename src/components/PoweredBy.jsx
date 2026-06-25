export default function PoweredBy() {
  const TECH_STACK = [
    { name: 'FastAPI', role: 'Lightning-fast routing' },
    { name: 'LiteLLM', role: 'Universal model support' },
    { name: 'pgvector', role: 'Powerful local embeddings' },
    { name: 'OpenTelemetry', role: 'Native tracing' },
  ];

  return (
    <section className="arch powered" id="powered-by">
      <div className="section-head powered-head">
        <span className="eyebrow">Built on Proven Primitives</span>
      </div>

      <div className="powered-grid">
        {TECH_STACK.map((tech) => (
          <div className="powered-chip" key={tech.name}>
            <span className="powered-chip-name">{tech.name}</span>
            <span className="powered-chip-role">{tech.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
