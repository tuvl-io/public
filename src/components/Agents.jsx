import { useState } from 'react';
import { docs } from '../data/version.js';
import EngineIcon from './EngineIcon.jsx';

const POINTS = [
  { icon: 'spec', title: 'Specs drive the work', body: 'Task status is derived from the project — an agent can’t mark its own work done.' },
  { icon: 'terminal', title: 'Ask tuvl, don’t guess', body: 'Every command speaks --json, and tuvl mcp gives Claude Code, Cursor and Codex the same tools. 14 skills ship with every project.' },
  { icon: 'code', title: 'Only the body is Python', body: 'tuvl codegen writes the typed signatures; tools, rules, models and people are a few lines of YAML.' },
  { icon: 'eye', title: 'Insight shows everything', body: 'A canvas over the same YAML, every run step by step, breakpoints, approvals and an AI-assisted code editor.' },
];

const SHOTS = [
  { key: 'workflows', label: 'Workflows', line: 'A canvas over the same YAML — every route, end and finding.' },
  { key: 'picker', label: 'Groups', line: 'Grouped, searchable, one click. Find any workflow in a project of hundreds.' },
  { key: 'runs', label: 'Runs', line: 'Every run journaled, step by step. Pin it as a fixture, replay it for 0 tokens.' },
  { key: 'specs', label: 'Specs', line: 'The spec, the derived task board and traceability — status is never self-reported.' },
];

export default function Agents() {
  const [shot, setShot] = useState(0);
  const s = SHOTS[shot];
  return (
    <section className="section" id="agents">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">Insight · see every route, every run</span>
          <h2 className="h2">Nothing runs <span className="accent">in the dark.</span></h2>
        </div>
        <div className="insight rv">
          <div className="insight-tabs" role="tablist" aria-label="Insight screens">
            {SHOTS.map((x, i) => (
              <button key={x.key} role="tab" aria-selected={i === shot} onClick={() => setShot(i)} type="button">
                <b>{x.label}</b><span>{x.line}</span>
              </button>
            ))}
          </div>
          <div className="insight-frame">
            <div className="insight-chrome" aria-hidden="true"><i /><i /><i /><span>127.0.0.1:8885/insight</span></div>
            <img className="shot-dark" src={`/assets/insight2/${s.key}-dark.png`} alt={`Insight — ${s.label}`} loading="lazy" width="2000" height="1125" />
            <img className="shot-light" src={`/assets/insight2/${s.key}-light.png`} alt={`Insight — ${s.label}`} loading="lazy" width="2000" height="1125" />
          </div>
        </div>
        <div className="tiles tiles-4">
          {POINTS.map((p) => (
            <article className="tile tile-sm rv" key={p.title}>
              <span className="tile-icon"><EngineIcon name={p.icon} size={18} /></span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
        <a className="more" href={docs('/getting-started/coding-agents/')}>Build with a coding agent →</a>
      </div>
    </section>
  );
}
