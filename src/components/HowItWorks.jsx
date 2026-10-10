import { useState } from 'react';

/* ── Sample project — validated and tested with tuvl 2.0 ─────────── */

const SPEC = `---
name: screen-candidate
workflow: screen_candidate
---
# Intent
Screen AI Engineer applicants: store every application, shortlist strong fits, reject the rest.

# Policies
- AI Engineers need 3+ years of experience — decided by a rule, never a model.
- A model scores skill fit; at most 800 tokens per application.

# Acceptance
\`\`\`tuvl-example
name: a strong applicant is shortlisted
input: { full_name: Asha Menon, email: asha@example.com, years_experience: 6, skills: [Python, PyTorch, LLMs, RAG] }
mocks:
  assess_fit: { signal: strong, outputs: { fit_score: 88 } }
expect:
  end: default
  path: [save, gate, assess_fit, shortlist]
  output: { status: 201, body: { status: shortlisted, fit_score: 88 } }
\`\`\``;

const DATA_MODEL = `kind: ModelDefinition
metadata:
  name: Candidate
  schema_version: v1
spec:
  tablename: candidates
  fields:
    - { name: id, type: uuid, primary_key: true, input: false }
    - { name: full_name, type: string, required: true }
    - { name: email, type: string, required: true, unique: true, secure: true }
    - { name: years_experience, type: integer, required: true }
    - { name: skills, type: jsonb }
    - name: status
      type: enum
      enum_values: [applied, shortlisted, rejected]
      default: applied
    - { name: fit_score, type: integer }
    - { name: created_at, type: timestamptz, input: false }`;

const WORKFLOW = `kind: Workflow
version: tuvl/v2
metadata:
  name: screen_candidate
  description: Screen an AI Engineer applicant
spec:
  models: [Candidate]
  trigger:
    http: { path: /api/screen-candidate, method: POST }
    input: { full_name: str, email: str, years_experience: int, skills: "list[str]" }

  agents:
    - id: save                         # deterministic: a database write
      description: Store the applicant
      engine: tool
      inputs: { full_name: str, email: str, years_experience: int, skills: "list[str]" }
      outputs: { candidate: Candidate }
      tool:
        use: db
        model: Candidate
        op: create
        values: { full_name: "{{ full_name }}", email: "{{ email }}",
                  years_experience: "{{ years_experience }}", skills: "{{ skills }}" }
      routes: { default: gate, conflict: END.duplicate, error: END.failed }

    - id: gate                         # deterministic: rules, not a model
      description: AI Engineers need 3+ years
      engine: decide
      inputs: { years_experience: int }
      outputs: { lane: "enum[assess, reject]" }
      decide:
        rules:
          - { when: "years_experience >= 3", then: assess }
          - { when: "true", then: reject }
      routes: { assess: assess_fit, reject: reject, error: END.failed }

    - id: assess_fit                   # bounded: one typed model call
      description: Score skill fit for the role
      engine: llm
      inputs: { skills: "list[str]", years_experience: int }
      outputs: { fit_score: int }
      budget: { timeout: 20s, max_tokens: 800 }
      llm:
        model: default
        system: You screen AI Engineers. Required skills — Python, PyTorch, LLMs, RAG.
        prompt: Score role fit from 0 to 100, and say whether the fit is strong or weak.
      routes: { strong: shortlist, weak: reject, parse_error: reject,
                timeout: reject, budget_exceeded: reject, error: END.failed }

    - id: shortlist
      description: Mark the candidate shortlisted
      engine: tool
      inputs: { candidate: Candidate, fit_score: int }
      outputs: { result: Candidate }
      tool:
        use: db
        model: Candidate
        op: update
        where: { id: "{{ candidate.id }}" }
        values: { status: shortlisted, fit_score: "{{ fit_score }}" }
      routes: { default: END, conflict: END.failed, error: END.failed }

    - id: reject
      description: Mark the candidate rejected
      engine: tool
      inputs: { candidate: Candidate }
      outputs: { result: Candidate }
      tool:
        use: db
        model: Candidate
        op: update
        where: { id: "{{ candidate.id }}" }
        values: { status: rejected }
      routes: { default: END.rejected, conflict: END.failed, error: END.failed }

  outputs:
    default:   { status: 201, body: { id: "{{ result.id }}", status: "{{ result.status }}", fit_score: "{{ result.fit_score }}" } }
    rejected:  { status: 200, body: { id: "{{ result.id }}", status: "{{ result.status }}" } }
    duplicate: { status: 409, body: { error: this email has already applied } }
    failed:    { status: 500, body: { error: screening failed } }`;

const CHECK_CMD = `$ tuvl validate --strict
  screen_candidate  5 agents · 4 deterministic · 1 bounded · worst-case 800 tok
  WARN [V015] 'save' has a write effect and later steps (gate) can fail —
              declare 'compensate' so a failed run can undo it

$ tuvl codegen && tuvl test
  + tests/screen_candidate/a-strong-applicant-is-shortlisted.yaml
  PASS a-strong-applicant-is-shortlisted (screen_candidate → END.default, 0 tok)`;

const API_CMD = `$ curl -X POST http://127.0.0.1:8885/api/screen-candidate \\
  -H "Content-Type: application/json" \\
  -d '{ "full_name": "Asha Menon", "email": "asha@example.com",
        "years_experience": 6, "skills": ["Python", "PyTorch", "LLMs", "RAG"] }'

HTTP/1.1 201 Created
X-Tuvl-Run-Id: 5b0d…
{ "id": "c9e2…", "status": "shortlisted", "fit_score": 88 }`;

const TABS = [
  {
    key: 'spec',
    label: 'Spec',
    file: <><span>specs/</span><b>screen-candidate.md</b></>,
    lang: 'markdown',
    code: SPEC,
    caption: 'Write the intent. tuvl spec analyse proposes the contracts and a task plan; the acceptance example becomes a test.',
  },
  {
    key: 'model',
    label: 'Data Model',
    file: <><span>models/</span><b>candidate.yaml</b></>,
    lang: 'yaml',
    code: DATA_MODEL,
    caption: 'Declare the entity once — the table, typed schemas and (opt-in) CRUD routes follow. The email is secure: never sent to a model.',
  },
  {
    key: 'workflow',
    label: 'Workflow',
    file: <><span>workflows/</span><b>screen_candidate.yaml</b></>,
    lang: 'yaml',
    code: WORKFLOW,
    caption: 'Typed agents: a database write, a rule, one bounded model call. Every signal is routed — including the model failing.',
  },
  {
    key: 'check',
    label: 'Check',
    file: <b>terminal</b>,
    lang: 'shell',
    code: CHECK_CMD,
    caption: 'Checked before it runs: contracts, data flow, cost — and a test that runs offline with the model mocked, for 0 tokens.',
  },
  {
    key: 'call',
    label: 'Call API',
    file: <b>terminal</b>,
    lang: 'shell',
    code: API_CMD,
    caption: 'A durable, journaled run behind a plain REST call. Long or waiting runs answer 202 with a run id to follow over SSE.',
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
          <span className="eyebrow eyebrow-cyan">How it works</span>
          <h2 className="section-title">
            From spec<br />
            <span className="grad">to a checked, running API.</span>
          </h2>
          <p className="section-sub">
            Write the intent, declare typed agents in YAML, and let tuvl check the whole graph before anything runs. The same files drive the API, the tests and the Insight canvas.
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
