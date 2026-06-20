const ROWS = [
  {
    metric: '1 wheel',
    label: 'pip install tuvl · no compilers, no C extensions',
    detail: 'pure-Python, one PyPI artefact, MIT licensed.',
  },
  {
    metric: '< 300 ms',
    label: 'cold start · tuvl dev → first request',
    detail: 'YAML scan + Pydantic validate + ASGI mount.',
  },
  {
    metric: 'stateless',
    label: 'ASGI router · scales linearly with --workers N',
    detail: 'no in-process state; Redis for shared coordination.',
  },
  {
    metric: '0 deps',
    label: 'on torch · transformers · langchain · chromadb',
    detail: 'LiteLLM does provider I/O; pgvector does retrieval.',
  },
  {
    metric: 'OTel Native',
    label: 'Zero-config OpenTelemetry',
    detail: 'Every node execution, LLM token count, and route decision is automatically exported to your APM.',
  },
  {
    metric: 'LLM Judge',
    label: 'Built-in evaluation pipelines',
    detail: 'Score route confidence and output quality natively. No need to build separate evaluation infrastructure.',
  },
];

const STACK = [
  'FastAPI',
  'SQLModel',
  'asyncpg',
  'pgvector',
  'Redis',
  'LiteLLM',
  'MCP',
  'Biscuit',
  'OpenTelemetry',
  'sonora',
];

export default function Architecture() {
  return (
    <section className="arch" id="architecture">
      <div className="section-head">
        <span className="eyebrow">under the feather</span>
        <h2 className="section-title">
          No magic.<br />
          <span className="grad">Standard primitives.</span>
        </h2>
        <p className="section-sub">
          tuvl delegates vector math to pgvector and provider I/O to LiteLLM, keeping the
          Python event loop entirely unblocked. Everything else is standard.
        </p>
      </div>

      <div className="arch-stage">
        <div className="arch-rows">
          {ROWS.map((row) => (
            <div className="arch-row" key={row.metric}>
              <span className="arch-row-num">{row.metric}</span>
              <div className="arch-row-text">
                <div className="arch-row-label">{row.label}</div>
                <div className="arch-row-detail">{row.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arch-stack">
          <div className="arch-stack-head">the stack tuvl is thin over</div>
          <div className="arch-stack-grid">
            {STACK.map((name) => (
              <div className="arch-chip" key={name}>
                <span className="arch-chip-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
