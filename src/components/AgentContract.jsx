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
    icon: <FileCheckIcon />,
    title: 'Specs drive the work',
    description: 'Write the intent in a spec. tuvl spec analyse proposes the contracts and a task plan whose statuses are derived from the project — an agent can’t mark its own work done.',
  },
  {
    icon: <TargetIcon />,
    title: 'Right on the first try',
    description: '26 validation rules report file, line and fix before anything runs, and tuvl test runs offline with mocks and recorded runs. The agent iterates against facts, not guesses.',
  },
  {
    icon: <CoinsIcon />,
    title: 'Ask tuvl, don’t infer',
    description: 'Every command speaks --json, and tuvl mcp hands Claude Code, Cursor or Codex the same tools: validate, spec status, contracts, codegen, tests. 13 skills ship with every project.',
  },
  {
    icon: <FeatherIcon />,
    title: 'Only the body is Python',
    description: 'tuvl codegen writes typed signatures and schemas; the agent fills in function bodies for code agents only. Everything else — tools, rules, models, people — is a few lines of YAML.',
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
          Give your coding agent a spec, a closed schema and a validator that answers in JSON. It
          writes small typed contracts; tuvl checks, tests and runs them. Less to write, less to
          get wrong, less to review.
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
