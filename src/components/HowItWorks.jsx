import { useState } from 'react';
import { CHECK, CONTRACT, SPEC } from '../data/demo.js';
import { docs } from '../data/version.js';
import { highlight } from '../lib/highlight.jsx';

const STEPS = [
  { title: 'Write the intent', note: 'Plain language, policies and acceptance examples.', file: 'specs/screen-candidate.md', text: SPEC, kind: 'yaml' },
  { title: 'Declare the contract', note: 'Your coding agent writes it; rules before models.', file: 'workflows/screen_candidate.yaml', text: CONTRACT, kind: 'yaml' },
  { title: 'Check it, test it, call it', note: 'Validated, tested offline, served as an API.', file: 'terminal', text: CHECK, kind: 'term' },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  return (
    <section className="section section-alt" id="how-it-works">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">How it works</span>
          <h2 className="h2">From a spec to a <span className="mark">production API.</span></h2>
          <p className="lede">An applicant-screening API: a database write, a rule, one bounded model call. The spec is the source of truth; tuvl checks the build against it.</p>
        </div>
        <div className="how">
          <div className="steps" role="tablist" aria-label="Steps">
            {STEPS.map((s, i) => (
              <button key={s.title} className="step rv" role="tab" aria-selected={i === active} aria-controls="how-panel"
                onClick={() => setActive(i)} type="button">
                <span className="step-n">{i + 1}</span>
                <b>{s.title}</b>
                <span>{s.note}</span>
              </button>
            ))}
            <a className="more" href={docs('/getting-started/quickstart')}>Build it in five minutes →</a>
          </div>
          <div className="code rv" id="how-panel" role="tabpanel">
            <div className="code-bar"><span className="file">{step.file}</span></div>
            <pre><code>{highlight(step.text, step.kind)}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
