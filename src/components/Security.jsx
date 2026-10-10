/* Security posture: every point is an engine refusal — a mount that doesn't
   happen, a 401 by default, a boot that exits — never a convention. */

const FENCES = [
  {
    fence: 'Callers',
    claim: 'No accidental public endpoints.',
    points: [
      <>
        <strong>Deny by default.</strong> In production every way to start a run — the
        workflow&apos;s route, the run API, MCP export — requires a verified token, even when the
        YAML declares no scope or group. Forgetting auth config doesn&apos;t open an endpoint; it
        locks one.
      </>,
      <>
        <strong>Public is a declaration,</strong> not an omission: <code>trigger.http.public: true</code>{' '}
        is the only way to serve anonymous traffic, and combining it with a required scope or
        group is a validation error — the engine enforces the scope and fails closed.
      </>,
      <>
        <strong>No self-approval.</strong> A person approving a run must hold{' '}
        <code>approvals:decide</code> and the required group — and can never be the one who
        started it. Every decision is journaled with who made it.
      </>,
    ],
  },
  {
    fence: 'Data',
    claim: 'Read and write are separate grants.',
    points: [
      <>
        <strong>CRUD is opt-in.</strong> A model gets REST routes only for the operations it lists
        in <code>spec.api.crud</code>; <code>read</code>, <code>write</code> and{' '}
        <code>delete</code> are independent grants, carried as signed facts in offline-verifiable
        Biscuit tokens. No session store to breach, no DB lookup to race.
      </>,
      <>
        <strong>Group-pinned models.</strong> <code>spec.access</code> can restrict a model to
        named IAM groups per tier — a caller needs the scope <em>and</em> the membership, and the
        only bypass is the explicit <code>iam:admin</code> grant.
      </>,
      <>
        <strong>Restrictions cascade down, never up.</strong> Declare who may read and the write
        and delete tiers inherit that fence unless you narrow them further — mutations can&apos;t
        end up more public than reads.
      </>,
    ],
  },
  {
    fence: 'Surface',
    claim: "The API you don't declare doesn't exist.",
    points: [
      <>
        <strong>Kill the CRUD plane entirely.</strong> One <code>SystemConfig</code> line unmounts
        every auto-generated <code>/models/*</code> route — absent from the router and the OpenAPI
        schema, not hiding behind a 403 — leaving only the workflows you wrote.
      </>,
      <>
        <strong>No signing key, no boot.</strong> A production engine without its Biscuit key
        refuses to start rather than falling back to anything weaker.
      </>,
      <>
        <strong>Dev conveniences can&apos;t leak.</strong> The dev-mode superuser shortcut
        hard-exits the process if it&apos;s ever enabled in a production environment — a leaked
        env var becomes a crash, not a backdoor.
      </>,
    ],
  },
];

export default function Security() {
  return (
    <section className="arch" id="security">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">Fail closed, by construction</span>
        <h2 className="section-title">
          Deny by default. <span className="grad">Public by declaration.</span>
        </h2>
        <p className="section-sub">
          Auth is not a middleware you remember to add. Every route ships token-required in
          production; opening one is a single reviewed line of YAML, and a contradictory config
          fails closed — never open.
        </p>
      </div>

      <div className="why-grid">
        {FENCES.map((f) => (
          <div className="card why-card" key={f.fence}>
            <span className="why-role">{f.fence}</span>
            <h3>{f.claim}</h3>
            <ul>
              {f.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
