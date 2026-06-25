export default function PoweredBy() {
  const TECH_STACK = [
    { name: 'FastAPI', role: 'Lightning-fast routing' },
    { name: 'LiteLLM', role: 'Universal model support' },
    { name: 'pgvector', role: 'Powerful local embeddings' },
    { name: 'OpenTelemetry', role: 'Native tracing' },
  ];

  return (
    <section className="arch" id="powered-by" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="section-head" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span className="eyebrow">Built on Proven Primitives</span>
      </div>

      <div className="arch-stack" style={{ margin: '0 auto', maxWidth: '800px' }}>
        <div className="arch-stack-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {TECH_STACK.map((tech) => (
            <div className="arch-chip" key={tech.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', background: 'var(--c-bg-2)', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
              <span className="arch-chip-name" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--c-text-1)' }}>{tech.name}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--c-text-2)', marginTop: '0.25rem' }}>{tech.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
