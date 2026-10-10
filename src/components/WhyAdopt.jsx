import { docs } from '../data/version.js';

/* The closing argument: one card per person who has to say yes.
   Engineers respond to mechanism, product to outcome, the business to risk —
   each card speaks only its reader's language. */

const CASES = [
  {
    role: 'For engineers',
    claim: 'A mechanism you can audit.',
    points: [
      <>
        Typed agent contracts and seven engines, a <strong>closed set</strong> — checked by 26
        validation rules before anything runs, with a determinism profile and worst-case token
        cost for every workflow.
      </>,
      <>
        When the closed set isn&apos;t enough, a <code>code</code> agent drops to plain Python —
        a typed function whose signature is generated from its contract.
      </>,
      <>
        FastAPI, Postgres + pgvector, LiteLLM, OpenTelemetry. Durable runs are rows in your
        Postgres — no extra workflow server, no torch, no langchain. <code>tuvl dev</code> on a
        laptop; <code>tuvl ship</code> to a container and Helm chart.
      </>,
    ],
    linkLabel: 'Read the engine contract →',
    href: docs('/internals/tuvl-agentic-manual/'),
  },
  {
    role: 'For product managers',
    claim: 'Scope that ships this sprint.',
    points: [
      <>
        Start from a spec in plain language: analysis proposes the contracts and a task board
        whose progress is <strong>derived from the project</strong>, not self-reported.
      </>,
      <>
        <code>human</code> agents put sign-off <em>inside</em> the workflow — the run waits,
        durably, for days if needed — so features legal or finance would veto become shippable,
        with the approval on record.
      </>,
      <>
        Every run is journaled step by step. When someone asks{' '}
        <em>&ldquo;why did the AI do that?&rdquo;</em> — you open the run and show them.
      </>,
    ],
    linkLabel: 'See what teams build →',
    href: 'https://github.com/tuvl-io/examples',
  },
  {
    role: 'For stakeholders',
    claim: 'Risk with a fence around it.',
    points: [
      <>
        <strong>MIT-licensed, open source.</strong> No per-seat or per-call platform fee — the
        only spend is your own infra and model tokens.
      </>,
      <>
        Local-first: your data stays in <strong>your Postgres</strong>, PII marked secure never
        reaches a model, and decisions can run on a self-hosted model in your own cluster. Every model call has a budget; loops have a supervisor and calibrated
        judges that fail closed.
      </>,
      <>
        Exit costs near zero: the business logic is portable YAML, the runtime a standard Python
        wheel. Adopting tuvl doesn&apos;t strand you in it.
      </>,
    ],
    linkLabel: 'Install from PyPI →',
    href: 'https://pypi.org/project/tuvl/',
  },
];

export default function WhyAdopt() {
  return (
    <section className="arch why" id="why-tuvl">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">The adoption case</span>
        <h2 className="section-title">
          Built to survive<br />
          <span className="grad">the adoption meeting.</span>
        </h2>
        <p className="section-sub">
          Engineers ask how it works. Product asks when it ships. The business asks what it
          risks. Each gets a first-class answer — on this page, not in a sales call.
        </p>
      </div>

      <div className="why-grid">
        {CASES.map((c) => (
          <div className="card why-card" key={c.role}>
            <span className="why-role">{c.role}</span>
            <h3>{c.claim}</h3>
            <ul>
              {c.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <a className="why-link" href={c.href} rel="noopener" target="_blank">
              {c.linkLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
