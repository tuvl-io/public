import { docs, examplesUrl, insightInstallCmd } from '../data/version.js';
import { track } from '../lib/analytics.js';
import { GitHubMark } from './icons.jsx';
import Install from './Install.jsx';

const SHARE = 'mailto:?subject=' + encodeURIComponent('tuvl — worth a look') +
  '&body=' + encodeURIComponent('Typed, journaled AI workflows that refuse what the contract doesn’t declare. Try it live: https://try.tuvl.online — details: https://tuvl.io');

export default function Cta() {
  return (
    <section className="section" id="get-started" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">Next</span>
          <h2 className="h2">Pick your way in.</h2>
        </div>
        <div className="paths">
          <article className="path rv">
            <span className="path-who">Developers</span>
            <h3>Run it in five minutes.</h3>
            <p>Start from the sample: a spec, a typed workflow, offline tests and a lock.</p>
            <Install cmd={`${insightInstallCmd()} && tuvl init my-app --sample`} location="cta" />
            <div className="cta-links">
              <a className="btn btn-solid" href={docs('/getting-started/quickstart')}>Quickstart</a>
              <a className="btn btn-ghost" href={examplesUrl()} rel="noopener" target="_blank"><GitHubMark /> Examples</a>
            </div>
          </article>
          <article className="path rv">
            <span className="path-who">Product &amp; leads</span>
            <h3>See it before you decide.</h3>
            <p>Seven live sandboxes — no install, no account. Open Insight and watch a workflow run.</p>
            <div className="cta-links">
              <a className="btn btn-solid" href="https://try.tuvl.online" rel="noopener" target="_blank"
                onClick={() => track('try_live', { location: 'cta' })}>Try it live</a>
              <a className="btn btn-ghost" href={SHARE} onClick={() => track('share_engineer', {})}>Send to your engineer</a>
              <a className="btn btn-ghost" href={docs('/why-tuvl/')}>Why tuvl</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
