import { usePersona } from '../hooks/usePersona.jsx';
import { docs } from '../data/version.js';
import { rich } from '../lib/rich.jsx';

const STEPS = [
  { when: 'Minute 5', cmd: 'tuvl init my-app --sample && tuvl dev', dev: 'A working project with a spec, a typed workflow, tests and the Insight canvas.', pm: 'Open Insight and watch a real workflow, its runs and its spec status — before anyone writes code.' },
  { when: 'Day 1', cmd: 'your coding agent writes the contract', dev: 'Claude Code, Cursor or Codex use `tuvl serve mcp` and 14 shipped skills. You review a YAML diff.', pm: 'Your spec goes in; the task board and the dependency graph fill from the build. A blocked task says why, a failed one shows every attempt. Progress is derived, not reported.' },
  { when: 'Week 1', cmd: 'tuvl lint project --strict && tuvl run tests', dev: '36 checks, offline tests with mocked models, worst-case token cost per workflow.', pm: 'Acceptance examples pass or they don’t. Risky paths need a named approver.' },
  { when: 'Production', cmd: 'tuvl ship --push', dev: 'An image and a Helm chart carrying only the features your project uses; production mode, closed by default, JSON logs, telemetry on.', pm: 'Same behaviour as staging, with a journal for every run and an owner for every approval.' },
];

export default function Journey() {
  const { t } = usePersona();
  return (
    <section className="section section-alt" id="journey">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">From idea to production</span>
          <h2 className="h2">A path you can <span className="accent">plan around.</span></h2>
        </div>
        <ol className="journey">
          {STEPS.map((s) => (
            <li className="rv" key={s.when}>
              <span className="journey-when">{s.when}</span>
              <code>{s.cmd}</code>
              <p>{rich(t(s.dev, s.pm))}</p>
            </li>
          ))}
        </ol>
        <a className="more" href={docs('/getting-started/quickstart')}>Build it in five minutes →</a>
      </div>
    </section>
  );
}
