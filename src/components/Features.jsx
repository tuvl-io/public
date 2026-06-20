import { useEffect, useRef } from 'react';

function CardGlowBinder({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll('.card'));
    const handlers = cards.map((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      };
      card.addEventListener('mousemove', onMove);
      return [card, onMove];
    });
    return () => handlers.forEach(([c, h]) => c.removeEventListener('mousemove', h));
  }, []);
  return <div ref={ref}>{children}</div>;
}

function Icon({ children }) {
  return (
    <div className="card-icon">
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function CyanIcon({ children }) {
  return (
    <div className="card-icon card-icon-cyan">
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="section-head">
        <span className="eyebrow">Core engine</span>
        <h2 className="section-title">Eleven primitives.<br />Infinite workflows.</h2>
        <p className="section-sub">
          Every capability is a first-class primitive in the YAML. No glue code. No SDK lock-in.
          Mix functional Python with agentic LLM steps in the same pipeline.
        </p>
      </div>

      <CardGlowBinder>
        <div className="bento">
          <article className="card card-wide card-feature">
            <div className="card-glow" />
            <div className="card-body">
              <div className="card-kind">workflow</div>
              <h3>YAML → Live API.</h3>
              <p>
                Define a workflow. Run <code>tuvl dev</code>. Your HTTP endpoint is live.
                No controllers, no boilerplate, no serialisation code — ever.
              </p>
            </div>
            <div className="card-art card-art-yaml">
              <pre>
                <span className="kw">kind:</span>{' '}<span className="st">Workflow</span>{'\n'}
                <span className="kw">metadata:</span>{'\n'}
                {'  '}<span className="kw">name:</span>{' '}<span className="st">screen_candidate</span>{'\n'}
                <span className="kw">spec:</span>{'\n'}
                {'  '}<span className="kw">steps:</span>{'\n'}
                {'    '}- <span className="kw">id:</span>{' '}<span className="st">save</span>{'\n'}
                {'      '}<span className="kw">kind:</span>{' '}<span className="vl">model-op</span>{'\n'}
                {'    '}- <span className="kw">id:</span>{' '}<span className="st">score</span>{'\n'}
                {'      '}<span className="kw">kind:</span>{' '}<span className="vl">agent</span>{'\n'}
                {'      '}<span className="kw">routes:</span>{'\n'}
                {'        '}<span className="kw">strong:</span>{'  '}<span className="st">fast_track</span>{'\n'}
                {'        '}<span className="kw">weak:</span>{'    '}<span className="st">reject</span>
              </pre>
            </div>
          </article>

          <article className="card">
            <Icon>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4" />
            </Icon>
            <h3>Any LLM, any provider.</h3>
            <p>One <code>model:</code> string unlocks 100+ providers via LiteLLM — Ollama, OpenAI, Anthropic, Gemini, Groq, Azure.</p>
          </article>

          <article className="card">
            <Icon>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </Icon>
            <h3>Signal-driven routing.</h3>
            <p>Steps return signals. Routes are explicit YAML maps. Tracing your pipeline doesn't require reading a single line of code.</p>
          </article>

          <article className="card">
            <Icon>
              <rect height="11" rx="2" width="18" x="3" y="11" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </Icon>
            <h3>Biscuit-secured.</h3>
            <p>Ed25519-signed Datalog tokens carry identity, group membership, and fine-grained <code>resource:action</code> scopes.</p>
          </article>

          <article className="card card-tall">
            <CyanIcon>
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </CyanIcon>
            <h3>LLM-as-a-Judge testing.</h3>
            <p>
              Write YAML test cases with stub data. Run <code>tuvl test</code>.
              A judge model replays the trace and verifies each step against
              natural-language assertions. No real LLM, DB, or HTTP calls needed.
            </p>
            <pre
              className="card-mini-term"
              style={{
                margin: 0,
                whiteSpace: 'pre',
                overflow: 'hidden',
              }}
            >
              <span className="t-prompt" style={{ marginRight: 0 }}>$</span>{' '}
              <span className="t-cmd">tuvl test</span>{'\n'}
              <span className="t-ok" style={{ marginRight: 0 }}>✓</span>{' '}
              test_screen_pass{'\n'}
              <span className="t-ok" style={{ marginRight: 0 }}>✓</span>{' '}
              test_screen_reject{'\n'}
              {'  '}<span className="t-dim">2 passed · 1.4s</span>
            </pre>
          </article>

          <article className="card">
            <Icon>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </Icon>
            <h3>Dynamic models.</h3>
            <p>YAML schemas auto-generate PostgreSQL tables, Pydantic schemas and full CRUD REST routes at startup.</p>
          </article>

          <article className="card">
            <Icon>
              <circle cx="12" cy="12" r="10" />
              <path d="M10 15l-3-3 3-3" />
              <path d="M14 9l3 3-3 3" />
            </Icon>
            <h3>Human-in-the-loop.</h3>
            <p>Pause any workflow for a human decision. Redis-backed state, timeouts, and a built-in review queue in the portal.</p>
          </article>

          <article className="card">
            <Icon>
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
            </Icon>
            <h3>MCP &amp; tool calls.</h3>
            <p>Model Context Protocol is a first-class step kind. Connect LLMs to any external tool or API as a workflow node.</p>
          </article>

          <article className="card">
            <Icon>
              <circle cx="12" cy="12" r="3" />
              <path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
              <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" />
            </Icon>
            <h3>OTel observability.</h3>
            <p>
              Structured logs + distributed traces. Every log carries <code>trace_id</code>,
              every node a span, every LLM call its <code>gen_ai.*</code> attributes.
            </p>
          </article>

          <article className="card">
            <Icon>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </Icon>
            <h3>pgvector RAG.</h3>
            <p>Embedding models and vector collections are first-class YAML. Auto-registered <code>rag_search</code> node ready to use.</p>
          </article>

          <article className="card card-wide card-spectrum">
            <div className="card-body">
              <div className="card-kind card-kind-warm">spectrum · debugging</div>
              <h3>Watch every step fire.</h3>
              <p>
                Trigger a workflow with custom JSON. See nodes glow as they execute.
                Click any completed node for its input, output, duration, and stack trace.
                Set breakpoints to pause mid-execution.
              </p>
              <div className="spectrum-nodes">
                <span className="sn sn-done">save_draft</span>
                <span className="sn-arr">→</span>
                <span className="sn sn-done">score_cv</span>
                <span className="sn-arr">→</span>
                <span className="sn sn-running">fast_track</span>
                <span className="sn-arr">→</span>
                <span className="sn sn-pending">notify</span>
              </div>
            </div>
          </article>
        </div>
      </CardGlowBinder>
    </section>
  );
}
