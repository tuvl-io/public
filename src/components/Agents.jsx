import { useState } from 'react';
import { docs } from '../data/version.js';
import { Check } from './icons.jsx';

const POINTS = [
  { title: 'Specs drive the work', body: 'Task status is derived from the project — an agent can’t mark its own work done.' },
  { title: 'Ask tuvl, don’t guess', body: 'Every command speaks --json, and tuvl mcp gives Claude Code, Cursor and Codex the same tools. 13 skills ship with every project.' },
  { title: 'Only the body is Python', body: 'tuvl codegen writes the typed signatures; tools, rules, models and people are a few lines of YAML.' },
  { title: 'Insight shows everything', body: 'A canvas over the same YAML, every run step by step, breakpoints, approvals and an AI-assisted code editor.' },
];

const SHOTS = [
  { key: 'workflows', label: 'Workflows', caption: 'A canvas over the same YAML — every route, end and finding.' },
  { key: 'runs', label: 'Runs', caption: 'Every run journaled: step through it, decide approvals, pin it as a fixture.' },
  { key: 'specs', label: 'Specs', caption: 'The spec, the derived task board and the build’s traceability.' },
];

export default function Agents() {
  const [shot, setShot] = useState(0);
  const s = SHOTS[shot];
  return (
    <section className="section" id="agents">
      <div className="wrap split">
        <div className="rv">
          <span className="kicker">Built for coding agents · watched by people</span>
          <h2 className="h2">Your agent writes the contract, <span className="mark">not the codebase.</span></h2>
          <ul className="points">
            {POINTS.map((p) => (
              <li key={p.title}><Check /><div><b>{p.title}</b><span>{p.body}</span></div></li>
            ))}
          </ul>
          <a className="more" href={docs('/getting-started/coding-agents/')}>Build with a coding agent →</a>
        </div>
        <figure className="shot rv" style={{ margin: 0 }}>
          <div className="shot-tabs" role="tablist" aria-label="Insight screens">
            {SHOTS.map((x, i) => (
              <button key={x.key} role="tab" aria-selected={i === shot} onClick={() => setShot(i)} type="button">{x.label}</button>
            ))}
          </div>
          <img src={`/assets/insight/insight-${s.key}.png`} alt={`Insight — ${s.label}`} loading="lazy" width="1600" height="900" />
          <figcaption className="shot-cap">{s.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
