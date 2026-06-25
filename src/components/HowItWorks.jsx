import { useState } from 'react';

/* ── Sample tuvl config (schema per the create-database-model skill +
   docs/concepts/models.md & workflows.md) ─────────────────────────── */

const DATA_MODEL = `kind: ModelDefinition
metadata:
  name: Candidate
  schema_version: v1
enabled: true
spec:
  tablename: candidates
  fields:
    - name: id
      type: uuid
      primary_key: true
      default: uuid4
      input: false

    - name: full_name
      type: string
      required: true

    - name: email
      type: string
      unique: true
      required: true

    - name: role_applied
      type: string
      default: AI Engineer

    - name: years_experience
      type: numeric
      required: true

    - name: skills
      type: jsonb            # ["Python", "PyTorch", "LLMs"]

    - name: resume_text
      type: text

    - name: status
      type: enum
      enum_values: [applied, screening, shortlisted, rejected]
      default: applied

    - name: fit_score
      type: float
      input: false           # written by the screening agent

    - name: created_at
      type: timestamp
      input: false`;

const WORKFLOW = `kind: Workflow
metadata:
  name: screen_candidate
  description: Screen an AI Engineer applicant
spec:
  trigger:
    path: /v1/screen-candidate
    method: POST
    input_schema: context
    response_schema: context

  context: Candidate

  steps:
    # 1. Persist the incoming applicant
    - id: save
      kind: ModelOp
      model: Candidate
      operation: create
      payload: "{{ candidate }}"
      output: candidate
      routes:
        default: gate_experience

    # 2. Hard gate — AI Engineers need 3+ years
    - id: gate_experience
      kind: Router
      condition:
        field: years_experience
        operator: gte
        value: 3
      routes:
        "true": assess_fit
        "false": reject

    # 3. Score skill fit for the role with an LLM
    - id: assess_fit
      kind: Agent
      agent:
        model: default
        system: |
          You screen AI Engineer candidates. Required skills:
          Python, PyTorch, LLMs, RAG, vector databases.
        prompt: |
          Skills: {{ skills }}
          Experience: {{ years_experience }} years
          Score role fit 0-100, then decide.
          Return JSON: {"fit_score": int, "decision": "strong|weak"}
        output:
          format: json
          map:
            fit_score: fit_score
          signal_from: decision
      routes:
        strong: shortlist
        weak: reject

    # 4a. Strong fit -> shortlist
    - id: shortlist
      kind: ModelOp
      model: Candidate
      operation: update
      record_id: "{{ candidate.id }}"
      payload: { status: shortlisted }
      routes:
        default: respond

    # 4b. Otherwise -> reject
    - id: reject
      kind: ModelOp
      model: Candidate
      operation: update
      record_id: "{{ candidate.id }}"
      payload: { status: rejected }
      routes:
        default: respond

    # 5. Return the decision
    - id: respond
      kind: Response`;

const RUN_CMD = `$ tuvl run
INFO   loaded models/candidate.yaml          -> Candidate
INFO   loaded workflows/screen_candidate.yaml
INFO   POST /v1/screen-candidate mounted
INFO   Uvicorn running on http://127.0.0.1:8000`;

const API_CMD = `$ curl -X POST http://127.0.0.1:8000/v1/screen-candidate \\
  -H "Content-Type: application/json" \\
  -d '{
        "full_name": "Asha Menon",
        "email": "asha@example.com",
        "years_experience": 6,
        "skills": ["Python", "PyTorch", "LLMs", "RAG"]
      }'

{
  "status": "shortlisted",
  "fit_score": 88
}`;

const TABS = [
  {
    key: 'model',
    label: 'Data Model',
    file: <><span>models/</span><b>candidate.yaml</b></>,
    lang: 'yaml',
    code: DATA_MODEL,
    caption: 'Declare the Candidate entity once — tuvl generates the table, schemas, and CRUD API automatically.',
  },
  {
    key: 'workflow',
    label: 'Workflow',
    file: <><span>workflows/</span><b>screen_candidate.yaml</b></>,
    lang: 'yaml',
    code: WORKFLOW,
    caption: 'Gate on experience, then let an agent score skill fit for the AI Engineer role — pure declarative routing.',
  },
  {
    key: 'run',
    label: 'Run',
    file: <b>terminal</b>,
    lang: 'shell',
    code: RUN_CMD,
    caption: 'Zero-compilation startup. tuvl parses the YAML and mounts a production-ready FastAPI endpoint.',
  },
  {
    key: 'call',
    label: 'Call API',
    file: <b>terminal</b>,
    lang: 'shell',
    code: API_CMD,
    caption: 'Standard JSON-in / JSON-out REST. The agent screened the candidate and returned the decision.',
  },
];

/* Lightweight read-only YAML highlighter — mirrors the playground tokeniser
   so keys / values / comments line up with the source character-for-character. */
const LITERAL = /^(true|false|null|-?\d+(\.\d+)?)$/;
function highlightYaml(line) {
  if (!line) return [{ text: '' }];
  const hashAt = line.indexOf('#');
  let code = line;
  let comment = null;
  if (hashAt !== -1) {
    code = line.slice(0, hashAt);
    comment = line.slice(hashAt);
  }
  const runs = [];
  const lead = code.match(/^(\s*)(-\s+)?/);
  const indent = lead[1];
  const dash = lead[2] || '';
  if (indent) runs.push({ text: indent });
  if (dash) runs.push({ text: dash });
  const rest = code.slice(indent.length + dash.length);
  const kv = rest.match(/^([\w.-]+)(:)(\s*)(.*)$/);
  if (kv) {
    const [, key, colon, gap, value] = kv;
    runs.push({ text: key, cls: 'kw' });
    runs.push({ text: colon });
    if (gap) runs.push({ text: gap });
    if (value) runs.push({ text: value, cls: LITERAL.test(value.trim()) ? 'vl' : 'st' });
  } else if (rest) {
    runs.push({ text: rest, cls: 'st' });
  }
  if (comment) runs.push({ text: comment, cls: 'cm' });
  return runs;
}

export default function HowItWorks() {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const active = TABS.find((t) => t.key === activeKey) ?? TABS[0];
  const lines = active.code.split('\n');

  return (
    <section className="econ" id="how-it-works">
      <div className="econ-inner">
        <div className="section-head">
          <span className="eyebrow eyebrow-cyan">The &quot;Aha!&quot; Moment</span>
          <h2 className="section-title">
            From configuration<br />
            <span className="grad">to production API in seconds.</span>
          </h2>
          <p className="section-sub">
            There is no complex backend to write. Define your data model and routing logic in YAML — tuvl reads your files and instantly mounts a lightning-fast, production-ready FastAPI endpoint.
          </p>
        </div>

        <div className="hiw">
          <div className="hiw-tabs" role="tablist">
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={tab.key === activeKey}
                className={`hiw-tab${tab.key === activeKey ? ' active' : ''}`}
                onClick={() => setActiveKey(tab.key)}
              >
                <span className="hiw-tab-idx">{i + 1}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hiw-window">
            <div className="hiw-window-head">
              <span className="t-dots"><i /><i /><i /></span>
              <span className="hiw-file">{active.file}</span>
              <span className="hiw-lang">{active.lang}</span>
            </div>

            <pre className="hiw-code" key={active.key}>
              {lines.map((ln, i) => (
                <div className="hiw-line" key={i}>
                  {active.lang === 'yaml'
                    ? highlightYaml(ln).map((r, j) =>
                        r.cls ? <span key={j} className={r.cls}>{r.text}</span> : <span key={j}>{r.text}</span>,
                      )
                    : ln || ' '}
                </div>
              ))}
            </pre>

            <p className="hiw-cap">{active.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
