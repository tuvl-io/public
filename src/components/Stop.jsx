import { usePersona } from '../hooks/usePersona.jsx';
import EngineIcon from './EngineIcon.jsx';
import { docs } from '../data/version.js';
import { rich } from '../lib/rich.jsx';

const ITEMS = [
  { icon: 'lock', title: 'Auth and roles', body: 'Closed by default. IAM roles and scopes per workflow; anonymous access is an explicit declaration.' },
  { icon: 'rewind', title: 'Durable runs', body: 'Checkpointed in Postgres. A crashed worker resumes from the last step; rollback compensates in reverse.' },
  { icon: 'eye', title: 'An audit trail', body: 'Every step, decision and approval is journaled. Replay a run for zero tokens.' },
  { icon: 'human', title: 'Human approvals', body: 'A person is a first-class step: who may decide, how long they have, what happens on expiry.' },
  { icon: 'shield', title: 'Cost and time caps', body: 'Token and time budgets per model call, with worst-case cost printed before you deploy.' },
  { icon: 'route', title: 'A typed API', body: 'REST, SSE and MCP generated from the contract, with a typed TypeScript client.' },
  { icon: 'code', title: 'Models and CRUD', body: 'Postgres models declared in YAML, with secure fields that never reach a model.' },
  { icon: 'terminal', title: 'A test harness', body: 'Offline tests with mocked models, fixtures from real runs, and one CI gate command.' },
];

export default function Stop() {
  const { t } = usePersona();
  return (
    <section className="section" id="stop-building">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">{t('What you stop building', 'What you get without a platform team')}</span>
          <h2 className="h2">
            {t(<>Everything around the model — <span className="accent">already there.</span></>,
               <>The boring 80% that makes AI <span className="accent">safe to ship.</span></>)}
          </h2>
          <p className="lede">
            {t('The model call is a few lines. The rest is what keeps a team busy for a quarter. tuvl ships it as one engine and one Postgres.',
               'A model call is easy. Access control, audit, approvals and cost limits are what usually delay a launch. They’re built in.')}
          </p>
        </div>
        <div className="stop-grid">
          {ITEMS.map((i) => (
            <article className="stop rv" key={i.title}>
              <span className="tile-icon"><EngineIcon name={i.icon} size={18} /></span>
              <h3>{i.title}</h3>
              <p>{rich(i.body)}</p>
            </article>
          ))}
        </div>
        <a className="more" href={docs('/why-tuvl/')}>Why tuvl, in detail →</a>
      </div>
    </section>
  );
}
