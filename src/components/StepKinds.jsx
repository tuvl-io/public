/* The complete, closed set of workflow step kinds (docs/concepts/workflows.md
   → Step Properties). Fixed by design, validated by Pydantic at load time. */

function BracesIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
      <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <rect height="11" rx="2" width="18" x="3" y="10" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v3" />
      <path d="M8 15h.01M16 15h.01" />
    </svg>
  );
}

function AutonomousIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <path d="M12 22v-5" />
      <path d="M9 8V2M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function HumanIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="19">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

const KINDS = [
  { icon: <BracesIcon />, name: 'Functional', desc: 'Run a registered Python node — your escape hatch for any custom logic.' },
  { icon: <BotIcon />, name: 'Agent', desc: 'Call any LLM with a prompt template and route on its structured output.' },
  { icon: <AutonomousIcon />, name: 'AutonomousAgent', desc: 'Hand an LLM its steering, tools, and skills — it runs a bounded tool-calling loop (capped iterations & token budget) until it reaches a declared outcome. Optionally watched by a workflow supervisor that can pause, steer, or abort it live.', experimental: true },
  { icon: <BranchIcon />, name: 'Router', desc: 'Evaluate a condition on the context and branch to a named route.' },
  { icon: <GlobeIcon />, name: 'APICall', desc: 'Make an outbound HTTP request and map the response into context.' },
  { icon: <PlugIcon />, name: 'MCP', desc: 'Invoke a tool over the Model Context Protocol — stdio or SSE.' },
  { icon: <DatabaseIcon />, name: 'ModelOp', desc: 'Create, read, update, or delete a data model — no Python required.' },
  { icon: <SendIcon />, name: 'Response', desc: 'Shape and return the final HTTP response from the context.' },
  { icon: <HumanIcon />, name: 'HumanInTheLoop', desc: 'Pause for human approval, then resume exactly where it left off.' },
];

export default function StepKinds() {
  return (
    <section className="kinds" id="building-blocks">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">Composable primitives</span>
        <h2 className="section-title">
          Workflows, curated from<br />
          <span className="grad">nine building blocks.</span>
        </h2>
        <p className="section-sub">
          Every tuvl workflow is composed from a small, closed set of step kinds — fixed by
          design and validated by Pydantic at load time, so any LLM gets the contract right
          on the first try.
        </p>
      </div>

      <div className="kinds-grid">
        {KINDS.map((kind) => (
          <div className="card kind-card" key={kind.name}>
            <div className="kind-icon">{kind.icon}</div>
            <div className="kind-name-row">
              <code className="kind-name">{kind.name}</code>
              {kind.experimental && <span className="kind-tag">experimental</span>}
            </div>
            <p className="kind-desc">{kind.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
