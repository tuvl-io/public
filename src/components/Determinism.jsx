/* Proof for the hero claim: each point is a load-time validation or a runtime
   raise, split across the two planes — execution and data. */

const PLANES = [
  {
    plane: 'Workflow execution',
    claim: 'Every path is declared.',
    points: [
      <>
        <strong>Seven engines, one contract.</strong> Every agent declares typed{' '}
        <code>inputs</code>, <code>outputs</code> and the signals it emits; its engine is{' '}
        <code>code</code>, <code>tool</code>, <code>decide</code>, <code>llm</code>,{' '}
        <code>loop</code>, <code>human</code> or <code>pending</code>. Custom logic drops into a{' '}
        <code>code</code> agent — a typed Python function — not into the framework.
      </>,
      <>
        <strong>Checked before it runs.</strong> <code>tuvl validate</code> applies 26 rules —
        routes, data flow, types, expressions, policy — and prints each workflow&apos;s
        determinism profile and worst-case token cost. Every signal must be routed; there are no
        implicit edges.
      </>,
      <>
        <strong>Rules before models.</strong> A <code>decide</code> agent evaluates its rules
        first and asks a decision model only when none match. An unavailable model is an{' '}
        <code>error</code> — never a silent fallback — and a doubtful one routes{' '}
        <code>low_confidence</code>.
      </>,
      <>
        <strong>Models stay bounded.</strong> <code>llm</code> and <code>loop</code> agents must
        declare token, time and iteration budgets; a model can only pick one of the routes you
        declared; every abnormal exit (<code>max_iterations</code>, <code>budget_exceeded</code>,{' '}
        <code>timeout</code>, <code>aborted</code>) is a routable signal.
      </>,
      <>
        <strong>Loops are governed.</strong> Tools are agents, child workflows or allow-listed MCP
        tools with schemas derived from contracts. A risky call pauses for a person&apos;s
        approval; a supervisor can pause, steer or abort; calibrated judges fail closed.
      </>,
    ],
  },
  {
    plane: 'Data and state',
    claim: 'Every access is fenced.',
    points: [
      <>
        <strong>Agents see only their inputs.</strong> Undeclared context is invisible, and an
        output that doesn&apos;t match the contract is a <code>contract_violation</code>, not a
        surprise downstream.
      </>,
      <>
        <strong>Model allowlist.</strong> A workflow can read and write only the models listed in{' '}
        <code>spec.models</code> — checked by the validator and at runtime.
      </>,
      <>
        <strong>Durable by default.</strong> Each step&apos;s writes commit with its checkpoint;
        a crashed worker&apos;s run resumes from the last one, and a rollback end compensates
        completed agents in reverse order.
      </>,
      <>
        <strong>PII never reaches a model.</strong> Fields marked <code>secure: true</code> are
        refused as model inputs at validation and redacted in the journal and exports.
      </>,
      <>
        <strong>Reproducible.</strong> <code>tuvl.lock</code> pins model ids, artifact hashes and
        MCP tool schemas; <code>tuvl ship</code> refuses a stale lock and pins the engine version.
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
          None of this lives in a system prompt. It is static validation and runtime enforcement —
          the engine refuses what the contract doesn&apos;t declare.
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
