import { VERSION_TAG } from '../data/version.js';
import { track } from '../lib/analytics.js';
import Install from './Install.jsx';

/* What the engine lets through, and the one move it refuses. */
function RouteCard() {
  return (
    <figure className="route rv" aria-label="A run of screen_candidate: every step on a declared route; an undeclared move is refused">
      <div className="route-head">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        run 5b0d · screen_candidate
      </div>
      <div className="route-req">POST /api/screen-candidate</div>
      <div className="route-row">
        <span className="id">save</span><span className="eng">tool · db.create</span>
        <span className="to">→ gate</span>
      </div>
      <div className="route-row">
        <span className="id">gate</span><span className="eng">decide · 2 rules, 0 tokens</span>
        <span className="to">→ assess_fit <em>(years ≥ 3)</em></span>
      </div>
      <div className="route-row">
        <span className="id">assess_fit</span><span className="eng">llm · ≤ 800 tokens, 20 s</span>
        <span className="to">→ shortlist <em>· strong | weak | timeout all routed</em></span>
      </div>
      <div className="route-row refused">
        <span className="id">assess_fit</span><span className="eng">“let’s also email the CEO”</span>
        <span className="to">not in enum[strong, weak]
          <br /><span className="route-verdict">refused → parse_error → reject</span>
        </span>
      </div>
      <div className="route-row">
        <span className="id">shortlist</span><span className="eng">tool · db.update</span>
        <span className="to">→ END <em>201 Created</em></span>
      </div>
      <figcaption className="route-foot"><b>Every step journaled</b> — replay this run for 0 tokens.</figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <div className="lockup">
            <span className="lockup-tile" aria-hidden="true"><img src="/assets/feather-ink.png" alt="" width="46" height="46" /></span>
            <span className="lockup-name">tuvl</span>
            <span className="lockup-meta">
              <span className="lockup-ml" lang="ml" title="തൂവൽ — “feather” in Malayalam">തൂവൽ · feather</span>
              <a className="tag" href="https://github.com/tuvl-io/tuvl/blob/main/CHANGELOG.md" rel="noopener" target="_blank">
                <span className="tag-dot" aria-hidden="true" />{VERSION_TAG} · open source · MIT
              </a>
            </span>
          </div>
          <h1>
            Deterministic execution.<br />
            <span className="mark">Zero vibes.</span>
          </h1>
          <p className="hero-sub">
            Typed workflows of agents — code, rules, models and people — checked before they run and
            journaled while they do. The engine refuses anything the contract doesn&apos;t declare.
          </p>
          <div className="hero-ctas">
            <Install cmd="uv tool install tuvl" location="hero" />
            <a className="btn btn-ghost" href="https://try.tuvl.online" rel="noopener" target="_blank"
              onClick={() => track('try_live', { location: 'hero' })}>Try it live →</a>
          </div>
          <div className="proof">
            <div><b>29</b><span>checks before anything runs</span></div>
            <div><b>0</b><span>tokens to replay a run</span></div>
            <div><b>1</b><span>Postgres for data, runs and journal</span></div>
          </div>
        </div>
        <RouteCard />
      </div>
    </section>
  );
}
