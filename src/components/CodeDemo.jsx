import { useState } from 'react';
import { VERSION_TAG } from '../data/version.js';

const TABS = [
  { key: 'ds',    num: '01',  label: 'datasources/postgres.yaml' },
  { key: 'model', num: '02',  label: 'models/candidate.yaml' },
  { key: 'wf',    num: '03',  label: 'workflows/screen.yaml' },
  { key: 'run',   num: '$',   label: 'tuvl dev', run: true },
];

function DatasourcePanel() {
  return (
    <pre className="code-pre"><code>
      <span className="y-cm"># datasources/postgres.yaml</span>{'\n'}
      <span className="y-k">kind</span><span className="y-p">:</span>{' '}<span className="y-v">DataSource</span>{'\n'}
      <span className="y-k">metadata</span><span className="y-p">:</span>{'\n'}
      {'  '}<span className="y-k">name</span><span className="y-p">:</span>{' '}<span className="y-v">main</span>{'\n'}
      <span className="y-k">spec</span><span className="y-p">:</span>{'\n'}
      {'  '}<span className="y-k">type</span><span className="y-p">:</span>{' '}<span className="y-v">postgresql</span>{'\n'}
      {'  '}<span className="y-k">connection</span><span className="y-p">:</span>{'\n'}
      {'    '}<span className="y-k">host</span><span className="y-p">:</span>{'     '}<span className="y-env">{'${POSTGRES_HOST}'}</span>{'\n'}
      {'    '}<span className="y-k">port</span><span className="y-p">:</span>{'     '}<span className="y-env">{'${POSTGRES_PORT'}<span className="y-def">:5432</span>{'}'}</span>{'\n'}
      {'    '}<span className="y-k">database</span><span className="y-p">:</span>{' '}<span className="y-env">{'${POSTGRES_DB}'}</span>{'\n'}
      {'    '}<span className="y-k">username</span><span className="y-p">:</span>{' '}<span className="y-env">{'${POSTGRES_USER}'}</span>{'\n'}
      {'    '}<span className="y-k">password</span><span className="y-p">:</span>{' '}<span className="y-env">{'${POSTGRES_PASSWORD}'}</span>
    </code></pre>
  );
}

function ModelPanel() {
  return (
    <pre className="code-pre"><code>
      <span className="y-cm"># models/candidate.yaml</span>{'\n'}
      <span className="y-k">kind</span><span className="y-p">:</span>{' '}<span className="y-v">ModelDefinition</span>{'\n'}
      <span className="y-k">metadata</span><span className="y-p">:</span>{'\n'}
      {'  '}<span className="y-k">name</span><span className="y-p">:</span>{' '}<span className="y-v">Candidate</span>{'\n'}
      <span className="y-k">spec</span><span className="y-p">:</span>{'\n'}
      {'  '}<span className="y-k">table</span><span className="y-p">:</span>{' '}<span className="y-v">candidates</span>{'\n'}
      {'  '}<span className="y-k">fields</span><span className="y-p">:</span>{'\n'}
      {'    '}<span className="y-li">-</span>{' '}<span className="y-k">name</span><span className="y-p">:</span>{'    '}<span className="y-v">full_name</span>{'\n'}
      {'      '}<span className="y-k">type</span><span className="y-p">:</span>{'    '}<span className="y-v">str</span>{'\n'}
      {'    '}<span className="y-li">-</span>{' '}<span className="y-k">name</span><span className="y-p">:</span>{'    '}<span className="y-v">email</span>{'\n'}
      {'      '}<span className="y-k">type</span><span className="y-p">:</span>{'    '}<span className="y-v">str</span>{'\n'}
      {'      '}<span className="y-k">unique</span><span className="y-p">:</span>{'  '}<span className="y-kw">true</span>{'\n'}
      {'    '}<span className="y-li">-</span>{' '}<span className="y-k">name</span><span className="y-p">:</span>{'    '}<span className="y-v">score</span>{'\n'}
      {'      '}<span className="y-k">type</span><span className="y-p">:</span>{'    '}<span className="y-v">int</span>{'\n'}
      {'      '}<span className="y-k">default</span><span className="y-p">:</span>{' '}<span className="y-num">0</span>{'\n'}
      {'\n'}
      <span className="y-cm"># → PostgreSQL table  ·  Pydantic schema  ·  CRUD REST routes</span>
    </code></pre>
  );
}

function WorkflowPanel() {
  return (
    <pre className="code-pre"><code>
      <span className="y-cm"># workflows/screen.yaml</span>{'\n'}
      <span className="y-k">kind</span><span className="y-p">:</span>{' '}<span className="y-v">Workflow</span>{'\n'}
      <span className="y-k">metadata</span><span className="y-p">:</span>{'\n'}
      {'  '}<span className="y-k">name</span><span className="y-p">:</span>{' '}<span className="y-v">screen</span>{'\n'}
      <span className="y-k">spec</span><span className="y-p">:</span>{'\n'}
      {'  '}<span className="y-k">steps</span><span className="y-p">:</span>{'\n'}
      {'    '}<span className="y-li">-</span>{' '}<span className="y-k">id</span><span className="y-p">:</span>{' '}<span className="y-v">save</span>{'\n'}
      {'      '}<span className="y-k">kind</span><span className="y-p">:</span>{' '}<span className="y-v">ModelOp</span>{'\n'}
      {'      '}<span className="y-k">op</span><span className="y-p">:</span>{'   '}<span className="y-v">add</span>{'\n'}
      {'      '}<span className="y-k">model</span><span className="y-p">:</span>{' '}<span className="y-v">Candidate</span>{'\n'}
      {'    '}<span className="y-li">-</span>{' '}<span className="y-k">id</span><span className="y-p">:</span>{' '}<span className="y-v">score</span>{'\n'}
      {'      '}<span className="y-k">kind</span><span className="y-p">:</span>{' '}<span className="y-v">agent</span>{'\n'}
      {'      '}<span className="y-k">agent</span><span className="y-p">:</span>{'\n'}
      {'        '}<span className="y-k">model</span><span className="y-p">:</span>{'  '}<span className="y-v">default</span>{'\n'}
      {'        '}<span className="y-k">prompt</span><span className="y-p">:</span>{' '}<span className="y-str">{'"Score CV of {{ full_name }}. Return JSON: {score, route}"'}</span>{'\n'}
      {'\n'}
      <span className="y-cm"># → POST /api/workflows/screen/run  (auto-mounted)</span>
    </code></pre>
  );
}

function RunPanel() {
  return (
    <div className="terminal-body" style={{ borderRadius: 0, padding: '18px 22px' }}>
      <div className="t-out t-dim"># dev — hot reload, Insight portal</div>
      <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">tuvl dev</span></div>
      <div className="t-gap" style={{ height: 6 }} />
      <div className="t-out t-dim"># production — multi-worker</div>
      <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">tuvl run --workers 4</span></div>
      <div className="t-gap" />
      <div className="t-out t-dim"># curl your new endpoint</div>
      <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">curl -X POST localhost:8000/api/workflows/screen/run \</span></div>
      <div className="t-line">     <span className="t-cmd">-d {`'{"full_name":"Jane Doe"}'`}</span></div>
      <div className="t-gap" style={{ height: 6 }} />
      <div className="t-out" style={{ color: '#a3e635' }}>{`{"route": "strong", "score": 8}`}</div>
      <div className="t-line t-dim" style={{ marginTop: 4 }}><span className="t-cursor" /></div>
    </div>
  );
}

const PANELS = {
  ds:    <DatasourcePanel />,
  model: <ModelPanel />,
  wf:    <WorkflowPanel />,
  run:   <RunPanel />,
};

export default function CodeDemo() {
  const [active, setActive] = useState('ds');

  return (
    <div className="code-demo">
      <div className="code-demo-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`code-tab${tab.run ? ' code-tab-run' : ''}${active === tab.key ? ' active' : ''}`}
            onClick={() => setActive(tab.key)}
            role="tab"
            type="button"
          >
            <span className={`code-tab-num${tab.run ? ' t-prompt-sm' : ''}`}>{tab.num}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {TABS.map((tab) => (
        <div
          key={tab.key}
          className={`code-panel${active === tab.key ? ' active' : ''}`}
        >
          {PANELS[tab.key]}
        </div>
      ))}

      <div className="code-demo-footer">
        <span className="code-demo-version">tuvl {VERSION_TAG}</span>
      </div>
    </div>
  );
}
