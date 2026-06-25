function CodeIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function PortalIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <rect height="18" rx="2" width="18" x="3" y="3" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <rect height="11" rx="2" width="18" x="3" y="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: <CodeIcon />,
    title: 'Zero Boilerplate',
    description: 'No need to build complex Python routers or manage application state. If you can write YAML, you can build an AI backend.',
  },
  {
    icon: <ZapIcon />,
    title: 'Instant APIs',
    description: 'Your workflows are automatically exposed as lightning-fast FastAPI endpoints the moment you run them.',
  },
  {
    icon: <PortalIcon />,
    title: 'Built-in Dev Portal',
    description: 'Visualize, test, and debug your AI routing locally using the Insight dashboard before ever shipping to production.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Fully Local & Private',
    description: 'Run everything on your own machine or private cloud. No vendor lock-in, no mandatory cloud subscriptions, no black boxes.',
  },
  {
    icon: <LockIcon />,
    title: 'Secure by Default',
    description: 'Cryptographic Biscuit token auth with scope-based access control on every endpoint. Fails closed in production—no signing key, no boot.',
  },
  {
    icon: <ActivityIcon />,
    title: 'Observable by Default',
    description: 'Native OpenTelemetry tracing on every step, route decision, and LLM call—stream spans straight to your APM with zero extra config.',
  },
];

export default function Features() {
  return (
    <section className="arch" id="features">
      <div className="section-head">
        <span className="eyebrow">Core Benefits</span>
        <h2 className="section-title">
          Designed for <span className="grad">simplicity and speed.</span>
        </h2>
        <p className="section-sub">
          tuvl takes the heavy lifting out of orchestrating AI workflows, letting you focus entirely on the logic and data instead of plumbing.
        </p>
      </div>

      <div className="feat-grid">
        {FEATURES.map((feature) => (
          <div className="card feat-card" key={feature.title}>
            <div className="feat-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
