import { docs } from '../data/version.js';

const COLS = [
  { who: 'Langflow · Flowise · Dify', title: 'A canvas you sketch on.', body: 'Great for exploring. The export is a JSON blob, and the data, auth and infrastructure around it are still yours to build.' },
  { who: 'LangGraph · CrewAI · Agents SDK', title: 'A library inside your app.', body: 'The graph is constrained; the routes, models, auth and telemetry around it live in code only your team can review.' },
  { who: 'tuvl', title: 'A backend, declared.', body: 'Specs and YAML in git mount typed routes, Postgres models, scoped auth and durable runs — and fail closed. Custom logic is a typed Python function, still inside the contract.', us: true },
];

export default function Compare() {
  return (
    <section className="section section-alt" id="compare">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">Where it fits</span>
          <h2 className="h2">Not a builder. Not a framework. <span className="mark">A backend.</span></h2>
        </div>
        <div className="cmp">
          {COLS.map((c) => (
            <article className={`cmp-col rv${c.us ? ' us' : ''}`} key={c.title}>
              <small>{c.who}</small>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
        <a className="more" href={docs('/why-tuvl/#how-tuvl-compares')}>The full comparison →</a>
      </div>
    </section>
  );
}
