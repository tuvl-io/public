import { usePersona } from '../hooks/usePersona.jsx';
import EngineIcon from './EngineIcon.jsx';
import { rich } from '../lib/rich.jsx';

const CASES = [
  {
    icon: 'route', n: '01',
    title: 'The agent improvised.',
    story: 'A model was handed a goal and a toolbox. It picked a step nobody planned — and it was a reasonable-sounding step.',
    dev: 'Free-text routing and unbounded tool calls: you can’t enumerate what it might do, so you can’t test it.',
    pm: 'There is no way to promise what the feature will never do — so there’s nothing to sign off.',
    fix: 'Every path is declared. A model can only pick from the routes you wrote; anything else is refused.',
  },
  {
    icon: 'shield', n: '02',
    title: 'The bill and the clock.',
    story: 'One slow, chatty run holds a request open and burns tokens. Nobody set a ceiling because nothing enforced one.',
    dev: 'No per-call token or time budget, no worst-case cost before deploy.',
    pm: 'Cost per request is a guess, so margins and SLAs are too.',
    fix: 'Every model call has a token and time budget; `tuvl lint project` prints each workflow’s worst-case cost.',
  },
  {
    icon: 'rewind', n: '03',
    title: '“What actually happened?”',
    story: 'A customer, an auditor or your own on-call asks which step decided what, and who approved it. The logs are a paragraph of prose.',
    dev: 'No durable state, so a crashed worker loses the run and a bug can’t be replayed.',
    pm: 'You can’t show compliance who decided, or why, without an engineer reading logs.',
    fix: 'Every step is journaled in your Postgres. Resume after a crash, replay for zero tokens, see who approved.',
  },
];

export default function Problem() {
  const { t } = usePersona();
  return (
    <section className="section" id="problem">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">The problem</span>
          <h2 className="h2">It worked in the demo. <span className="accent">Then it met production.</span></h2>
          <p className="lede">
            {t('Three failures you’ve either hit or are about to — each one comes from the same place: a probabilistic step with nothing around it.',
               'Three things that go wrong when an AI feature leaves the prototype — each one comes from the same place: a probabilistic step with nothing around it.')}
          </p>
        </div>
        <div className="cases">
          {CASES.map((c) => (
            <article className="case rv" key={c.n}>
              <header><span className="case-n">{c.n}</span><EngineIcon name={c.icon} size={18} /></header>
              <h3>{c.title}</h3>
              <p className="case-story">{c.story}</p>
              <p className="case-pain"><b>{t('In the code', 'For the product')}</b>{rich(t(c.dev, c.pm))}</p>
              <p className="case-fix"><b>With tuvl</b>{rich(c.fix)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
