function ShieldIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ScrollIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h2" />
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

export default function AgenticEra() {
  return (
    <section className="agentic-era" id="agentic">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">Built for the agentic era</span>
        <h2 className="section-title">Your AI agent shouldn't<br />be writing FastAPI.</h2>
        <p className="section-sub">
          Coding agents are great at generating text and bad at writing production backends.
          tuvl gives them a closed YAML contract instead — cheaper to generate, impossible to
          hallucinate against, hardened below the surface by default.
        </p>
      </div>

      <div className="agentic-grid">
        {/* Card 1 — Token economy, wide, with side-by-side comparison */}
        <article className="card card-feature agentic-card-wide">
          <div className="card-glow" />
          <div className="card-body">
            <div className="card-kind">token economy</div>
            <h3>6× fewer tokens for the same backend.</h3>
            <p>
              A typical tuvl workflow is ~50 lines of YAML — about 1,500 tokens.
              The equivalent FastAPI / SQLModel / Biscuit / OpenTelemetry code your
              agent would otherwise write is 500+ lines, roughly 10,000 tokens.
              <strong> Pay less, ship more, review faster.</strong>
            </p>
          </div>

          <div className="token-compare">
            <div className="tc-side tc-side-bright">
              <div className="tc-head">
                <span className="tc-tag tc-tag-good">YAML</span>
                <span className="tc-lines">50 lines</span>
              </div>
              <pre className="tc-code">{`kind: Workflow
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
        weak:   reject`}</pre>
              <div className="tc-foot tc-foot-good">≈ 1,500 tokens</div>
            </div>

            <div className="tc-vs" aria-hidden="true">→</div>

            <div className="tc-side tc-side-dim">
              <div className="tc-head">
                <span className="tc-tag tc-tag-bad">FastAPI</span>
                <span className="tc-lines">500+ lines</span>
              </div>
              <pre className="tc-code">{`# auth_middleware.py     ~80 lines
# scope_dependencies.py  ~40 lines
# candidate_model.py     ~60 lines
# pydantic_schemas.py    ~50 lines
# workflow_router.py    ~180 lines
# sse_streaming.py       ~90 lines
# llm_client.py          ~70 lines
# tests/                ~120 lines
# alembic migration      ~30 lines

# … plus you write the prompt
# string by string into Python
# triple-quotes and remember
# to escape every brace.`}</pre>
              <div className="tc-foot tc-foot-bad">≈ 10,000 tokens</div>
            </div>
          </div>
        </article>

        {/* Card 2 — Zero hallucination surface */}
        <article className="card">
          <div className="card-icon"><ShieldIcon /></div>
          <h3>Zero hallucination surface.</h3>
          <p>
            <strong>Nine step kinds. Eleven document kinds.</strong> That's the entire engine
            surface. Your agent can't invent a method that doesn't exist or call an API that
            hallucinated itself into being — invalid YAML fails Pydantic validation before a
            single endpoint mounts.
          </p>
        </article>

        {/* Card 3 — One file teaches any agent */}
        <article className="card">
          <div className="card-icon"><ScrollIcon /></div>
          <h3>One file teaches any agent.</h3>
          <p>
            <code>docs/TUVL_AGENTIC_MANUAL.md</code> is <strong>34 KB</strong> — the complete
            engine contract in a single context window. Drop it into Cursor, Claude Code,
            Cline, Aider, or your own agent's system prompt. No codebase indexing required.
          </p>
        </article>

        {/* Card 4 — Production-grade by default */}
        <article className="card agentic-card-wide">
          <div className="card-icon card-icon-cyan"><StackIcon /></div>
          <h3>Production-grade by default.</h3>
          <p>
            Authentication, multi-tenancy, observability, versioning, audit trails — all
            pre-solved. Your agent generates a 50-line workflow; the engine wraps it in
            Biscuit auth, Postgres RLS, OTel spans, and HITL state automatically. Beta-quality
            prompts produce production-quality services.
          </p>
          <div className="agentic-stack">
            <span className="ag-pill">Biscuit auth</span>
            <span className="ag-pill">Postgres RLS</span>
            <span className="ag-pill">OTel spans</span>
            <span className="ag-pill">Token revocation</span>
            <span className="ag-pill">HITL state</span>
            <span className="ag-pill">Workflow versioning</span>
            <span className="ag-pill">Scope-gated CRUD</span>
            <span className="ag-pill">pgvector RAG</span>
            <span className="ag-pill">gRPC-Web streaming</span>
          </div>
        </article>
      </div>
    </section>
  );
}
