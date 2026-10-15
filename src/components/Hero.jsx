import { installCmd } from '../data/version.js';
import Countdown from './Countdown.jsx';
import Persona from './Persona.jsx';
import RunDemo from './RunDemo.jsx';
import Install from './Install.jsx';
import { usePersona } from '../hooks/usePersona.jsx';
import { track } from '../lib/analytics.js';

export default function Hero() {
  const { t } = usePersona();
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-top">
          <div>
            <div className="lockup">
              <span className="lockup-mark" aria-hidden="true"><span className="feather-mark" /></span>
              <span className="lockup-name">tuvl</span>
              <span className="lockup-ml" lang="ml" title="തൂവൽ — “feather” in Malayalam">തൂവൽ · feather</span>
            </div>
            <Persona />
            <h1>
              {t(<>Stop babysitting <span className="accent">your agents.</span></>,
                 <>Ship AI features you can <span className="accent">sign off.</span></>)}
            </h1>
            <p className="hero-sub">
              {t('Declare the workflow in YAML. tuvl checks it before it runs, bounds every model call, journals every step and refuses anything the contract doesn’t declare. Python only where you need it.',
                 'Write what the feature must do, in plain language. tuvl builds the backend to that spec, shows you real status — never self-reported — and refuses anything off-script. Every decision is on record.')}
            </p>
            <div className="hero-ctas">
              <Install cmd={installCmd()} location="hero" />
              <a className="btn btn-ghost" href="https://try.tuvl.online" rel="noopener" target="_blank"
                onClick={() => track('try_live', { location: 'hero' })}>Try it live →</a>
            </div>
          </div>
          <aside className="hero-aside">
            <Countdown />
            <p className="eyebrow">Deterministic execution. Zero vibes.</p>
            <ul className="hero-facts">
              <li><b>29</b> checks before anything runs</li>
              <li><b>0</b> tokens to replay a run</li>
              <li><b>1</b> Postgres — data, runs, journal</li>
              <li><b>MIT</b> open source, self-hosted</li>
            </ul>
          </aside>
        </div>
        <RunDemo />
      </div>
    </section>
  );
}
