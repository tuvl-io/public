import { useState } from 'react';
import { docs } from '../data/version.js';
import { track } from '../lib/analytics.js';
import { rich } from '../lib/rich.jsx';

// Who does the work at each node, in the colours of Insight's workflow canvas.
const KINDS = {
  you: { label: 'you', note: 'a person decides' },
  agent: { label: 'your agent', note: 'spends your coding agent’s tokens' },
  tuvl: { label: 'tuvl', note: 'deterministic, no tokens' },
  human: { label: 'approval', note: 'a named person signs off' },
};

const NODES = [
  {
    id: 'import', short: 'import idea', title: 'Import', kind: 'you', cmd: 'tuvl import idea brief.pdf', out: 'IDEA-SK-0004',
    does: 'Copies the brief (Markdown, PDF or Word) into `idea/` as a numbered, immutable record and extracts its text.',
    checked: 'File hashes. Secrets, hidden files and links are skipped. An edited idea is flagged later (S021).',
  },
  {
    id: 'draft', short: 'generate spec', title: 'Draft', kind: 'agent', cmd: 'tuvl generate spec --idea IDEA-SK-0004', out: 'SPEC-SK-0004-01 · draft',
    does: 'Your installed coding agent (Claude Code, Codex, Gemini CLI) writes the spec on its own branch and opens a draft pull request.',
    checked: 'It may change only that spec file. `tuvl lint spec` must pass, or the findings go back to the agent (3 tries).',
  },
  {
    id: 'approve', short: 'approve spec', title: 'Approve', kind: 'human', cmd: 'tuvl approve spec SPEC-SK-0004-01', out: 'approved_by · approved_at · hash',
    does: 'A person reads the spec and approves it. Who, when and a hash of the body go into the spec itself.',
    checked: 'An agent cannot approve its own draft. Edit the body later and the approval is stale (S017): it is a draft again.',
  },
  {
    id: 'tasks', short: 'generate tasks', title: 'Tasks', kind: 'tuvl', cmd: 'tuvl generate tasks SPEC-SK-0004-01', out: 'TASK-SK-0004-01-001 …',
    does: 'Derives the task list from the approved spec: one task per new model, step and example, a manual task for each external system.',
    checked: 'No model is involved. Re-running keeps ids and marks removed work obsolete.',
  },
  {
    id: 'build', short: 'generate code', title: 'Build', kind: 'agent', cmd: 'tuvl generate code --spec SPEC-SK-0004-01 --all', out: 'one branch + draft PR per task',
    does: 'tuvl first writes what needs no tokens: models from the spec’s data, and workflow skeletons of `pending` steps. Then your agent implements each task on its own stacked branch.',
    checked: 'The step must be implemented, `lint project` and `verify spec` must agree, and the Python must pass review. Out-of-scope edits are reverted. Pull requests are never merged for you.',
  },
  {
    id: 'review', short: 'review code', title: 'Review', kind: 'tuvl', cmd: 'tuvl review code', out: 'C-rule + ruff findings',
    does: 'Checks the Python of every code agent against the rules (no shell, no raw SQL, no swallowed errors…), free. `--agent` asks an agent for a second opinion.',
    checked: 'Errors fail the build; the agent’s opinion is advisory unless you make it blocking.',
  },
  {
    id: 'ship', short: 'ship', title: 'Ship', kind: 'tuvl', cmd: 'tuvl ship --format both', out: 'image · runnable archive',
    does: 'Re-runs the whole gate, then builds the container image and a reproducible archive you can run with `uv`.',
    checked: 'Specs approved and unchanged, tasks done, generated files current, lock current, tree clean. Otherwise nothing ships.',
  },
];

// The canvas is a 700 x 190 box: seven 100-wide columns, cards 76 wide and 118 tall.
const X = (i, edge) => i * 100 + (edge === 'out' ? 88 : 12);
const HANDLE_Y = 71;
const edge = (a, b) => `M${X(a, 'out')} ${HANDLE_Y} C${X(a, 'out') + 6} ${HANDLE_Y} ${X(b, 'in') - 6} ${HANDLE_Y} ${X(b, 'in')} ${HANDLE_Y}`;
const loop = (a, b) => `M${a * 100 + 50} 130 C${a * 100 + 50} 188 ${b * 100 + 50} 188 ${b * 100 + 50} 130`;

export default function Pipeline() {
  const [active, setActive] = useState('draft');
  const node = NODES.find((n) => n.id === active);
  const pick = (id) => { setActive(id); track('pipeline_node', { node: id }); };

  return (
    <section className="section" id="pipeline">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">Idea to ship</span>
          <h2 className="h2">Your agent proposes. <span className="accent">tuvl decides.</span></h2>
          <p className="lede">
            Authoring is free: bring your own coding agent, or none. Acceptance is not: the same checks, with no model
            in the loop, say yes or no at every step.
          </p>
        </div>

        <div className="pipe rv">
          <div className="pipe-legend" aria-hidden="true">
            {Object.entries(KINDS).map(([k, v]) => (
              <span key={k} className={`pk pk-${k}`}><i />{v.label}</span>
            ))}
          </div>
          <div className="pipe-canvas">
            <svg className="pipe-edges" viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="pipe-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0 0 L8 4 L0 8 z" />
                </marker>
              </defs>
              {NODES.slice(0, -1).map((_, i) => (
                <path key={i} className="pe" d={edge(i, i + 1)} markerEnd="url(#pipe-arrow)" />
              ))}
              <path className="pe pe-loop" d={loop(2, 1)} markerEnd="url(#pipe-arrow)" />
              <path className="pe pe-loop" d={loop(5, 4)} markerEnd="url(#pipe-arrow)" />
            </svg>
            <span className="pipe-edge-label" style={{ left: '21.4%', top: '88%' }}>send back</span>
            <span className="pipe-edge-label" style={{ left: '64.3%', top: '88%' }}>findings</span>
            <ol className="pipe-nodes">
              {NODES.map((n, i) => (
                <li key={n.id}>
                  <button
                    type="button"
                    className={`pn pn-${n.kind}${n.id === active ? ' on' : ''}`}
                    aria-pressed={n.id === active}
                    onClick={() => pick(n.id)}
                  >
                    <span className="pn-top"><b>{i + 1}</b><em>{KINDS[n.kind].label}</em></span>
                    <span className="pn-title">{n.title}</span>
                    <code className="pn-cmd">{n.short}</code>
                    <span className="pn-out">{n.out}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="pipe-panel" role="region" aria-live="polite" aria-label={`${node.title} details`}>
            <div className="pipe-panel-head">
              <span className={`pk pk-${node.kind}`}><i />{KINDS[node.kind].label}</span>
              <span className="pipe-note">{KINDS[node.kind].note}</span>
            </div>
            <code className="pipe-cmd">{node.cmd}</code>
            <div className="pipe-cols">
              <p><b>What happens</b>{rich(node.does)}</p>
              <p><b>What is checked</b>{rich(node.checked)}</p>
              <p><b>What it leaves behind</b><code>{node.out}</code> and a line in the local audit ledger.</p>
            </div>
          </div>
        </div>

        <p className="pipe-foot rv">
          Every step is a verb you can read: <code>import</code>, <code>generate</code>, <code>approve</code>,{' '}
          <code>verify</code>, <code>review</code>, <code>ship</code>. Everything is recorded: <code>tuvl show audit</code> or
          the Audit page in Insight, and <code>tuvl dev</code> shows this same path as a tree you can act on.
        </p>
        <a className="more" href={docs('/internals/authoring')}>How authoring with a coding agent works →</a>
      </div>
    </section>
  );
}
