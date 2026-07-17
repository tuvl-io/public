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
        Nine step kinds, a <strong>closed set</strong> — validated by Pydantic before a single
        route mounts. Invalid config can&apos;t boot. The entire contract spec is{' '}
        <strong>34&nbsp;KB</strong>.
      </>,
      <>
        When the closed set isn&apos;t enough, the <code>Functional</code> step drops to plain
        Python — one decorated function per file, no framework in the way.
      </>,
      <>
        FastAPI, Postgres + pgvector, Redis, LiteLLM, OpenTelemetry. No torch, no langchain,
        nothing exotic to operate — <code>tuvl dev</code> on a laptop, one wheel anywhere ASGI
        runs.
      </>,
    ],
    linkLabel: 'Read the engine contract →',
    href: docs('/concepts/workflows'),
  },
  {
    role: 'For product managers',
    claim: 'Scope that ships this sprint.',
    points: [
      <>
        An endpoint is a YAML file: idea → reviewed → live API in a <strong>day</strong>, not a
        quarter — and any coding agent generates it valid on the first try.
      </>,
      <>
        <code>HumanInTheLoop</code> steps put sign-off <em>inside</em> the workflow — features
        that legal or finance would veto become shippable, with the approval on record.
      </>,
      <>
        Every run leaves a step-by-step trace. When someone asks{' '}
        <em>&ldquo;why did the AI do that?&rdquo;</em> — you show them, you don&apos;t guess.
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
        Local-first: your data stays in <strong>your Postgres</strong>. Agents run supervised —
        budget caps, iteration caps, and an automatic circuit breaker with a human override API.
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
