const STEP_KINDS = [
  'Functional',
  'Agent',
  'AutonomousAgent',
  'Router',
  'APICall',
  'MCP',
  'ModelOp',
  'Response',
  'HumanInTheLoop',
];

const DOC_KINDS = [
  'ModelDefinition',
  'EmbeddingRegistry',
  'EmbeddingConfig',
  'CollectionRegistry',
  'CollectionConfig',
  'DataSource',
  'RedisConfig',
  'FederationProvider',
  'Workflow',
  'AgentModel',
  'TelemetryConfig',
];

export default function Thesis() {
  return (
    <section className="thesis" id="thesis">
      <div className="thesis-inner">
        <span className="eyebrow eyebrow-cyan">the bet</span>
        <h2 className="section-title">
          Finite kinds.<br />
          <span className="grad">Boundless workflows.</span>
        </h2>
        <p className="section-sub">
          Any LLM reads the contract once — 34&nbsp;KB, one file — and generates valid backends
          on the first try. Nine step kinds. Eleven document kinds. Fixed by design,
          enforced by Pydantic at load time. When nine isn&apos;t enough, the{' '}
          <code className="thesis-inline">functional</code> step is plain Python — your
          escape hatch, no fork required.
        </p>

        <article className="thesis-card thesis-card-light thesis-card-solo">
          <header>
            <span className="thesis-tag">tuvl · the entire engine surface</span>
            <span className="thesis-count">9 + 11</span>
          </header>
          <div className="thesis-list-block">
            <div className="thesis-list-head">step kinds</div>
            <ul className="thesis-list">
              {STEP_KINDS.map((k) => (
                <li key={k}><code>{k}</code></li>
              ))}
            </ul>
          </div>
          <div className="thesis-list-block">
            <div className="thesis-list-head">document kinds</div>
            <ul className="thesis-list thesis-list-compact">
              {DOC_KINDS.map((k) => (
                <li key={k}><code>{k}</code></li>
              ))}
            </ul>
          </div>
          <footer>fixed by design · enforced by Pydantic at load time</footer>
        </article>
      </div>
    </section>
  );
}
