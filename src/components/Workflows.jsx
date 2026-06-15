import { useState } from 'react';
import WorkflowFlow from './WorkflowFlow.jsx';
import {
  agenticNodes, agenticEdges,
  functionalNodes, functionalEdges,
} from '../data/flows.js';

function AgenticYaml() {
  return (
    <pre className="code">
      <span className="kw">kind:</span>{' '}<span className="st">Workflow</span>{'\n'}
      <span className="kw">metadata:</span>{'\n'}
      {'  '}<span className="kw">name:</span>{' '}<span className="st">screen_candidate</span>{'\n'}
      <span className="kw">enabled:</span>{' '}<span className="vl">true</span>{'\n'}
      <span className="kw">spec:</span>{'\n'}
      {'  '}<span className="kw">steps:</span>{'\n'}
      {'    '}- <span className="kw">id:</span>{' '}<span className="st">save_draft</span>{'\n'}
      {'      '}<span className="kw">kind:</span>{' '}<span className="vl">model-op</span>{'\n'}
      {'      '}<span className="kw">op:</span>{' '}<span className="st">add</span>{'\n'}
      {'      '}<span className="kw">model:</span>{' '}<span className="st">Candidate</span>{'\n'}
      {'\n'}
      {'    '}- <span className="kw">id:</span>{' '}<span className="st">score_cv</span>{'\n'}
      {'      '}<span className="kw">kind:</span>{' '}<span className="vl">agent</span>{'\n'}
      {'      '}<span className="kw">agent:</span>{'\n'}
      {'        '}<span className="kw">model:</span>{' '}<span className="st">default</span>{'           '}<span className="cm"># ollama/llama3 · gpt-4o · claude-3-5</span>{'\n'}
      {'        '}<span className="kw">prompt:</span>{' '}<span className="st">|</span>{'\n'}
      {'          '}Score {'{{ full_name }} ({{ experience_years }}y).'}{'\n'}
      {'          '}Return JSON: {'{"score": int, "route": "strong|weak"}'}{'\n'}
      {'        '}<span className="kw">output:</span>{'\n'}
      {'          '}<span className="kw">format:</span>{' '}<span className="st">json</span>{'\n'}
      {'          '}<span className="kw">signal_from:</span>{' '}<span className="st">route</span>{'\n'}
      {'      '}<span className="kw">routes:</span>{'\n'}
      {'        '}<span className="kw">strong:</span>{'  '}<span className="st">fast_track</span>{'\n'}
      {'        '}<span className="kw">weak:</span>{'    '}<span className="st">reject</span>
    </pre>
  );
}

function FunctionalYaml() {
  return (
    <pre className="code">
      <span className="kw">kind:</span>{' '}<span className="st">Workflow</span>{'\n'}
      <span className="kw">metadata:</span>{'\n'}
      {'  '}<span className="kw">name:</span>{' '}<span className="st">contact_intake</span>{'\n'}
      <span className="kw">spec:</span>{'\n'}
      {'  '}<span className="kw">steps:</span>{'\n'}
      {'    '}- <span className="kw">id:</span>{' '}<span className="st">validate</span>{'\n'}
      {'      '}<span className="kw">kind:</span>{' '}<span className="vl">functional</span>{'\n'}
      {'      '}<span className="kw">runner:</span>{' '}<span className="st">validate_contact</span>{'\n'}
      {'      '}<span className="kw">routes:</span>{'\n'}
      {'        '}<span className="kw">valid:</span>{'   '}<span className="st">save</span>{'\n'}
      {'        '}<span className="kw">invalid:</span>{' '}<span className="st">END</span>{'\n'}
      {'\n'}
      {'    '}- <span className="kw">id:</span>{' '}<span className="st">save</span>{'\n'}
      {'      '}<span className="kw">kind:</span>{' '}<span className="vl">model-op</span>{'\n'}
      {'      '}<span className="kw">op:</span>{' '}<span className="st">add</span>{'\n'}
      {'      '}<span className="kw">model:</span>{' '}<span className="st">Contact</span>{'\n'}
      {'      '}<span className="kw">routes:</span>{'\n'}
      {'        '}<span className="kw">default:</span>{' '}<span className="st">notify</span>{'\n'}
      {'\n'}
      {'    '}- <span className="kw">id:</span>{' '}<span className="st">notify</span>{'\n'}
      {'      '}<span className="kw">kind:</span>{' '}<span className="vl">functional</span>{'\n'}
      {'      '}<span className="kw">runner:</span>{' '}<span className="st">send_welcome_email</span>
    </pre>
  );
}

const PANES = {
  agentic: {
    title:  'workflows/screen_candidate.yaml',
    yaml:   <AgenticYaml />,
    nodes:  agenticNodes,
    edges:  agenticEdges,
  },
  functional: {
    title:  'workflows/contact_intake.yaml',
    yaml:   <FunctionalYaml />,
    nodes:  functionalNodes,
    edges:  functionalEdges,
  },
};

export default function Workflows() {
  const [pane, setPane] = useState('agentic');
  const active = PANES[pane];

  return (
    <section className="workflows" id="workflows">
      <div className="section-head">
        <span className="eyebrow">Two flavours, one engine</span>
        <h2 className="section-title">Functional logic.<br />Agentic decisions.</h2>
        <p className="section-sub">
          Compose deterministic Python steps with LLM-routed branches in the same YAML file.
          The engine streams every transition over SSE — no extra infrastructure.
        </p>
      </div>

      <div className="wf-switch" role="tablist">
        <button
          className={`wf-btn${pane === 'agentic' ? ' active' : ''}`}
          onClick={() => setPane('agentic')}
          type="button"
        >
          Agentic pipeline
        </button>
        <button
          className={`wf-btn${pane === 'functional' ? ' active' : ''}`}
          onClick={() => setPane('functional')}
          type="button"
        >
          Pure functional
        </button>
      </div>

      <div className="wf-card">
        <div className="wf-pane active">
          <div className="wf-pane-grid">
            <div className="wf-yaml">
              <div className="wf-yaml-head"><span>{active.title}</span></div>
              {active.yaml}
            </div>
            <WorkflowFlow nodes={active.nodes} edges={active.edges} />
          </div>
        </div>
      </div>
    </section>
  );
}
