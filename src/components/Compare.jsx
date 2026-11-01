import { docs } from '../data/version.js';

const WHO = [
  { name: 'Langflow · Flowise · Dify', kind: 'Visual builders' },
  { name: 'LangGraph · CrewAI · Agents SDK', kind: 'Agent frameworks' },
  { name: 'tuvl', kind: 'A backend', us: true },
];

const ROWS = [
  { label: 'What it is', cells: ['A canvas you sketch on.', 'A library inside your app.', 'A backend, declared.'] },
  { label: 'What you review', cells: ['A JSON export.', 'Code only your team can review.', 'Specs and YAML in git, checked before they run.'] },
  { label: 'Data, auth, infra', cells: ['Still yours to build.', 'Around the graph, in code.', 'Typed routes, Postgres models, scoped auth and durable runs — failing closed.'] },
];

export default function Compare() {
  return (
    <section className="section section-alt" id="compare">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">Where it fits</span>
          <h2 className="h2">Not a builder. Not a framework. <span className="accent">A backend.</span></h2>
        </div>
        <div className="matrix rv" role="table" aria-label="How tuvl compares">
          <div className="matrix-row matrix-head" role="row">
            <span role="columnheader" />
            {WHO.map((w) => (
              <span key={w.name} role="columnheader" className={w.us ? 'us' : ''}>
                <small>{w.kind}</small>{w.name}
              </span>
            ))}
          </div>
          {ROWS.map((r) => (
            <div className="matrix-row" role="row" key={r.label}>
              <span role="rowheader" className="matrix-label">{r.label}</span>
              {r.cells.map((c, i) => (
                <span role="cell" key={i} className={WHO[i].us ? 'us' : ''} data-who={WHO[i].kind}>{c}</span>
              ))}
            </div>
          ))}
        </div>
        <a className="more" href={docs('/why-tuvl/#how-tuvl-compares')}>The full comparison →</a>
      </div>
    </section>
  );
}
