/* Proof for the hero claim: each point is a load-time validation or a runtime
   raise, split across the two planes — execution and data. */

const PLANES = [
  {
    plane: 'Workflow execution',
    claim: 'Every path is declared.',
    points: [
      <>
        <strong>Closed set of nine step kinds</strong> — <code>Functional</code>,{' '}
        <code>Agent</code>, <code>AutonomousAgent</code>, <code>Router</code>,{' '}
        <code>APICall</code>, <code>MCP</code>, <code>ModelOp</code>, <code>Response</code>,{' '}
        <code>HumanInTheLoop</code> — validated by Pydantic at load. An invalid workflow never
        mounts; custom logic drops into <code>Functional</code>, not into the framework.
      </>,
      <>
        <strong>No hidden routing defaults.</strong> Every signal a step can emit must be mapped
        in <code>routes:</code> — an unmapped transition raises, it doesn&apos;t improvise.
      </>,
      <>
        <strong>Branching stays out of the model.</strong> <code>Router</code> steps match on
        data — an LLM never decides what a lookup table should.
      </>,
      <>
        <strong>Agents run bounded:</strong> a closed tool set, hard iteration caps and token
        budgets — and every abnormal exit (<code>max_iterations</code>,{' '}
        <code>budget_exceeded</code>, <code>error</code>, <code>aborted</code>) is a routable
        signal with a fallback branch.
      </>,
      <>
        <strong>Supervised, not trusted.</strong> A live supervisor can pause, steer, or abort an
        agent at every iteration boundary; <code>HumanInTheLoop</code> steps gate irreversible
        actions behind a real approval — enforced again on resume.
      </>,
    ],
  },
  {
    plane: 'Data context',
    claim: 'Every access is fenced.',
    points: [
      <>
        <strong>Model allowlist.</strong> A workflow can only touch models enumerated in its
        context — anything else raises <code>PermissionError</code> at the first repository
        call.
      </>,
      <>
        <strong>Reserved keys are runtime-owned.</strong> Steps can&apos;t overwrite the session,
        the DB handle, or the audit trail the engine keeps about its own execution.
      </>,
      <>
        <strong>Typed, versioned schemas.</strong> Payloads are validated and coerced against
        declared columns — not whatever JSON showed up.
      </>,
      <>
        <strong>PII masked at the source.</strong> Fields marked <code>secure: true</code> never
        reach logs or OpenTelemetry spans in the clear.
      </>,
      <>
        <strong>Scoped access per model</strong> via cryptographic Biscuit tokens — read, write,
        and delete are separate grants, checked on every endpoint. Fails closed in production:
        no signing key, no boot.
      </>,
    ],
  },
];

export default function Determinism() {
  return (
    <section className="arch" id="determinism">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">Zero vibes, by construction</span>
        <h2 className="section-title">
          Determinism is <span className="grad">enforced, not prompted.</span>
        </h2>
        <p className="section-sub">
          None of this lives in a system prompt. Guardrails are load-time validations and runtime
          raises — the engine refuses what the contract doesn&apos;t declare.
        </p>
      </div>

      <div className="det-grid">
        {PLANES.map((p) => (
          <div className="card why-card" key={p.plane}>
            <span className="why-role">{p.plane}</span>
            <h3>{p.claim}</h3>
            <ul>
              {p.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
