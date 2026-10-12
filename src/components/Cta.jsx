import { docs, installCmd } from '../data/version.js';
import { track } from '../lib/analytics.js';
import { GitHubMark } from './icons.jsx';
import Install from './Install.jsx';

export default function Cta() {
  return (
    <section className="section" id="get-started" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta rv">
          <img className="cta-feather" src="/assets/feather-paper.png" alt="" aria-hidden="true" />
          <h2>Declare it. Check it. <span className="mark">Ship it.</span></h2>
          <p>Start from the sample — a spec, a typed workflow, offline tests and a lock. Run it with <code>tuvl dev</code> and open Insight.</p>
          <Install cmd={`${installCmd()} && tuvl init my-app --sample`} location="cta" />
          <div className="cta-links">
            <a className="btn btn-lime" href="https://try.tuvl.online" rel="noopener" target="_blank"
              onClick={() => track('try_live', { location: 'cta' })}>Try it live — no install</a>
            <a className="btn btn-ghost" href="https://github.com/tuvl-io/examples" rel="noopener" target="_blank"><GitHubMark /> Examples</a>
            <a className="btn btn-ghost" href={docs('/')}>Read the docs</a>
          </div>
        </div>
      </div>
    </section>
  );
}
