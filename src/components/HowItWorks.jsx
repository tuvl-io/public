export default function HowItWorks() {
  const YAML_SAMPLE = `kind: Workflow
metadata:
  name: customer-support
spec:
  # 1. Define your structured data context
  context:
    - TicketID: str
    - UserMessage: str
    - Category: Optional[str]
  # 2. Define your execution steps
  steps:
    - id: classify
      kind: agent
      agent:
        model: default
        output:
          format: json
          signal_from: route
      routes:
        billing: billing_flow
        technical: technical_flow`;

  const RUN_CMD = `$ tuvl run support.yaml
INFO:     Started server process [2140]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)`;

  const API_CMD = `$ curl -X POST http://127.0.0.1:8000/v1/customer-support \\
  -H "Content-Type: application/json" \\
  -d '{"UserMessage": "How do I update my payment method?"}'

{
  "Category": "billing",
  "status": "success"
}`;

  return (
    <section className="econ" id="how-it-works">
      <div className="econ-inner">
        <div className="section-head">
          <span className="eyebrow eyebrow-cyan">The "Aha!" Moment</span>
          <h2 className="section-title">
            From configuration<br />
            <span className="grad">to production API in seconds.</span>
          </h2>
          <p className="section-sub">
            There is no complex backend to write. Just define your data context and routing logic in YAML. tuvl reads your file and instantly mounts a lightning-fast, production-ready FastAPI endpoint.
          </p>
        </div>

        <div className="econ-compare" style={{ flexDirection: 'column', gap: '2rem' }}>
          
          <article className="econ-side econ-side-light" style={{ width: '100%' }}>
            <header>
              <span className="econ-tag econ-tag-good">Step 1: Define your Workflow & Data Context</span>
            </header>
            <pre className="econ-code" style={{ whiteSpace: 'pre-wrap' }}>{YAML_SAMPLE}</pre>
            <footer>
              <span className="econ-cost-lbl">Strict data models and simple routing paths validated instantly.</span>
            </footer>
          </article>

          <article className="econ-side econ-side-dim" style={{ width: '100%' }}>
            <header>
              <span className="econ-tag" style={{ color: '#fff' }}>Step 2: Run tuvl</span>
            </header>
            <pre className="econ-code">{RUN_CMD}</pre>
            <footer>
              <span className="econ-cost-lbl">Zero-compilation startup. Instantly parses YAML and mounts the ASGI app.</span>
            </footer>
          </article>

          <article className="econ-side econ-side-light" style={{ width: '100%' }}>
            <header>
              <span className="econ-tag econ-tag-good">Step 3: Call your API</span>
            </header>
            <pre className="econ-code">{API_CMD}</pre>
            <footer>
              <span className="econ-cost-lbl">Interact with your AI workflow via a standard, JSON-in/JSON-out REST API.</span>
            </footer>
          </article>

        </div>
      </div>
    </section>
  );
}
