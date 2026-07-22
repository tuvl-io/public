import { docs } from '../data/version.js';

/* The field, named — no strawman wall. Each column credits what the category
   is genuinely for; tuvl's column carries the differentiation. The table rows
   are the facts a buyer checks in the adoption meeting. */

const CATEGORIES = [
  {
    role: 'Visual flow builders',
    tools: 'Langflow · Flowise · Dify',
    claim: 'A canvas a human sketches on.',
    points: [
      <>
        The <strong>canvas is the source of truth</strong>; the export is a JSON blob, not a
        contract you review in a pull request.
      </>,
      <>
        Hosted endpoints, yes — but an endpoint on the tool&apos;s runtime is not your backend:
        the data model, the auth story, and the infrastructure around it are still yours to
        assemble.
      </>,
      <>
        Open-ended component ecosystems: great for a human exploring, unbounded for a machine
        generating.
      </>,
    ],
  },
  {
    role: 'Code-first frameworks',
    tools: 'LangGraph · CrewAI · Agents SDK',
    claim: 'A library inside your app.',
    points: [
      <>
        You still own the FastAPI app, the database, the auth, the deploys — the framework is a
        <strong> fraction of the system you ship</strong>.
      </>,
      <>
        Conditional edges do constrain the graph — but <strong>the contract ends at the
        graph</strong>. The routes, models, auth, and telemetry around it live in code only your
        team can review.
      </>,
      <>
        And the surface moves: majors and deprecations land on your calendar (ask anyone who
        migrated legacy LangChain).
      </>,
    ],
  },
  {
    role: 'tuvl',
    tools: 'one engine, one contract',
    claim: 'A backend, declared.',
    points: [
      <>
        <strong>YAML in git is the source of truth</strong> — reviewed like code; Insight, the
        bundled dev portal, is a projection of the files, never the authority.
      </>,
      <>
        One contract mounts the whole backend: typed routes, Postgres models, scoped auth,
        OpenTelemetry — and <strong>fails closed</strong>: validated before run, refused at boot,
        agents route only through a declared <code>outcome.enum</code>.
      </>,
      <>
        When the closed set isn&apos;t enough, the <code>Functional</code> step drops to one
        plain-Python function — <strong>still inside the contract</strong>: its exits route
        through declared signals and its DB handle stays allowlisted. <code>tuvl ship</code>
        turns the validated project into a container and Helm chart.
      </>,
    ],
  },
];

const ROWS = [
  {
    axis: 'Source of truth',
    flow: 'The canvas; exports are JSON blobs',
    code: 'Your codebase',
    tuvl: 'YAML in git — the UI is a projection',
  },
  {
    axis: 'What you ship',
    flow: 'A flow hosted inside the tool',
    code: 'A library inside an app you still build',
    tuvl: 'A mounted API — routes, models, auth, telemetry — live the day the YAML merges',
  },
  {
    axis: 'When it breaks',
    flow: 'At runtime, inside the tool',
    code: 'Wherever the Python throws',
    tuvl: 'Invalid config is refused at boot; declared failures route as signals — an unhandled exception is still an error response',
  },
  {
    axis: 'Can the model invent a path?',
    flow: 'Components are open-ended',
    code: 'The graph constrains it; the app around it is code',
    tuvl: 'No — it picks from routes you declared',
  },
  {
    axis: 'Auth & tenancy',
    flow: 'The tool\u2019s API keys; the rest is yours',
    code: 'Bring your own',
    tuvl: 'Scoped tokens per route; row-level tenancy',
  },
  {
    axis: 'Integrations',
    flow: 'Connector catalogs',
    code: 'Ecosystems, plus whatever you write',
    tuvl: 'One protocol (MCP) for tools, plain HTTP for everything else',
  },
  {
    axis: 'Lock-in & exit',
    flow: 'Flows live in the tool\u2019s format and runtime',
    code: 'A library you can pin, fork, or vendor — the cleanest exit here',
    tuvl: 'A YAML dialect you adopt — its majors land on your calendar too. MIT engine; your data stays in your Postgres',
  },
  {
    axis: 'Path to production',
    flow: 'Export, then host around it',
    code: 'Your Dockerfile, your infra',
    tuvl: <>One command to a container and deploy chart (<code>tuvl ship</code>)</>,
  },
];

export default function Comparison() {
  return (
    <section className="arch" id="comparison">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">The field</span>
        <h2 className="section-title">
          Sketch a flow. Code a graph. <span className="grad">Or declare a backend.</span>
        </h2>
        <p className="section-sub">
          Langflow lets a human sketch an AI flow. LangGraph lets an engineer code one. tuvl lets
          a coding agent ship a production backend where a model can never invent a path.
        </p>
      </div>

      <div className="why-grid">
        {CATEGORIES.map((c) => (
          <div className={`card why-card${c.role === 'tuvl' ? ' cmp-card-tuvl' : ''}`} key={c.role}>
            <span className="why-role">{c.role}</span>
            <h3>{c.claim}</h3>
            <p className="cmp-tools">{c.tools}</p>
            <ul>
              {c.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wf-compare">
        <div className="wf-compare-table" role="table" aria-label="tuvl vs flow builders vs code-first frameworks">
          <div className="wf-row cmp-row wf-row-head" role="row">
            <span />
            <span>Flow builders</span>
            <span>Code frameworks</span>
            <span className="wf-col-tuvl">tuvl</span>
          </div>
          {ROWS.map((r) => (
            <div className="wf-row cmp-row" role="row" key={r.axis}>
              <div className="wf-axis">{r.axis}</div>
              <div className="wf-cell wf-cell-aws">{r.flow}</div>
              <div className="wf-cell wf-cell-aws">{r.code}</div>
              <div className="wf-cell wf-cell-tuvl">{r.tuvl}</div>
            </div>
          ))}
        </div>
        <p className="cmp-footnote">
          Scope, honestly: long-running replayable sagas belong in Temporal. tuvl builds
          request-shaped backends — the API your product actually serves.{' '}
          <a href={docs('/concepts/workflows')} rel="noopener" target="_blank">
            Read the contract →
          </a>
        </p>
      </div>
    </section>
  );
}
