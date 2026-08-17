const YAML_SAMPLE = `kind: Workflow
metadata:
  name: screen
spec:
  context: [Candidate]
  steps:
    - id: save
      kind: ModelOp
      model: Candidate
    - id: score
      kind: Agent
      agent:
        model: default
        output:
          format: json
          signal_from: route
      routes:
        strong: fast_track
        weak:   reject`;

const PY_FILES = [
  ['auth_middleware.py', '~80 lines'],
  ['scope_dependencies.py', '~40 lines'],
  ['candidate_model.py', '~60 lines'],
  ['pydantic_schemas.py', '~50 lines'],
  ['workflow_router.py', '~180 lines'],
  ['sse_streaming.py', '~90 lines'],
  ['llm_client.py', '~70 lines'],
  ['tests/', '~120 lines'],
  ['alembic_migration.py', '~30 lines'],
];

export default function AgenticReliability() {
  return (
    <section className="econ" id="reliability">
      <div className="econ-inner">
        <div className="section-head">
          <span className="eyebrow eyebrow-cyan">deterministic by design</span>
          <h2 className="section-title">
            Deterministic backends.<br />
            <span className="grad">Generated in seconds.</span>
          </h2>
          <p className="section-sub">
            Generating complex AI routing in Python requires endless debug loops. tuvl
            provides a finite YAML schema that coding agents (Cursor, Claude, Aider)
            generate flawlessly on the first try.
          </p>
        </div>

        <div className="econ-compare">
          <article className="econ-side econ-side-light">
            <header>
              <span className="econ-tag econ-tag-good">tuvl · declarative config</span>
            </header>
            <pre className="econ-code">{YAML_SAMPLE}</pre>
            <footer>
              <span className="econ-cost econ-cost-good">1st try execution</span>
              <span className="econ-cost-lbl">validates at load-time via Pydantic</span>
            </footer>
          </article>

          <div className="econ-vs" aria-hidden="true">
            <span className="econ-vs-num">vs</span>
          </div>

          <article className="econ-side econ-side-dim">
            <header>
              <span className="econ-tag econ-tag-bad">vibe-coded · custom stack</span>
            </header>
            <ul className="econ-files">
              {PY_FILES.map(([name, count]) => (
                <li key={name}>
                  <code>{name}</code>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
            <footer>
              <span className="econ-cost econ-cost-bad">5+ debug loops</span>
              <span className="econ-cost-lbl">open-ended Python · fails at runtime</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
