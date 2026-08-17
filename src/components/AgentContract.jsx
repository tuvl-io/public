function CoinsIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function FileCheckIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" x2="2" y1="8" y2="22" />
      <line x1="17.5" x2="9" y1="15" y2="15" />
    </svg>
  );
}

const ADVANTAGES = [
  {
    icon: <CoinsIcon />,
    title: 'Fewer tokens, faster generations',
    description: 'Your agent emits a ~34 KB YAML contract against a closed schema — not thousands of lines of Python. Less to generate means cheaper runs and quicker turnarounds.',
  },
  {
    icon: <TargetIcon />,
    title: 'Right on the first try',
    description: 'The closed set is validated by Pydantic at load time. The agent can’t invent a method or hallucinate an API — invalid YAML fails before a single endpoint mounts, so the debug loops disappear.',
  },
  {
    icon: <FileCheckIcon />,
    title: 'Reviewable in one screen',
    description: 'You audit a small declarative contract at a glance, not a sprawling generated codebase you never wrote. Diffs stay tiny and the intent stays obvious.',
  },
  {
    icon: <FeatherIcon />,
    title: 'No bloat, no lock-in',
    description: 'The runtime is fixed and dependency-light — the agent never drags in langchain or torch. The same contract runs locally or anywhere you deploy.',
  },
];

export default function AgentContract() {
  return (
    <section className="arch" id="agent-contract">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">Built for coding agents</span>
        <h2 className="section-title">
          Let your agent write the contract,<br />
          <span className="grad">not the codebase.</span>
        </h2>
        <p className="section-sub">
          Point any LLM at tuvl&apos;s closed-set schema and it generates a compact YAML
          contract — the engine handles the rest. Less to write, less to get wrong, less to review.
        </p>
      </div>

      <div className="feat-grid">
        {ADVANTAGES.map((adv) => (
          <div className="card feat-card" key={adv.title}>
            <div className="feat-icon">{adv.icon}</div>
            <h3>{adv.title}</h3>
            <p>{adv.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
