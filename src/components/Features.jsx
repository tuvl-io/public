export default function Features() {
  const FEATURES = [
    {
      title: 'Zero Boilerplate',
      description: 'No need to build complex Python routers or manage application state. If you can write YAML, you can build an AI backend.',
    },
    {
      title: 'Instant APIs',
      description: 'Your workflows are automatically exposed as lightning-fast FastAPI endpoints the moment you run them.',
    },
    {
      title: 'Built-in Dev Portal',
      description: 'Visualize, test, and debug your AI routing locally using the Insight dashboard before ever shipping to production.',
    },
    {
      title: 'Fully Local & Private',
      description: 'Run everything on your own machine or private cloud. No vendor lock-in, no mandatory cloud subscriptions, no black boxes.',
    },
  ];

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

      <div className="arch-stage">
        <div className="arch-rows" style={{ width: '100%' }}>
          {FEATURES.map((feature, i) => (
            <div className="arch-row" key={i}>
              <span className="arch-row-num" style={{ width: '30px' }}>0{i + 1}</span>
              <div className="arch-row-text">
                <div className="arch-row-label" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>{feature.title}</div>
                <div className="arch-row-detail" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
