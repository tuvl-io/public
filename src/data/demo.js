/* The screen_candidate sample (validated and tested with tuvl 2.0), trimmed for the page. */

export const SPEC = `---
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

export const CONTRACT = `kind: Workflow
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
    # save → stores the applicant (tool · db.create)
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
    # shortlist / reject → update the record (tool · db.update)`;

export const CHECK = `$ tuvl lint project --strict
  screen_candidate  5 agents · 4 deterministic · 1 bounded · worst-case 800 tok
  WARN [V015] 'save' has a write effect and later steps (gate) can fail —
              declare 'compensate' so a failed run can undo it

$ tuvl generate code && tuvl run tests
  + tests/screen_candidate/a-strong-applicant-is-shortlisted.yaml
  PASS a-strong-applicant-is-shortlisted (screen_candidate → END.default, 0 tok)

$ curl -X POST http://127.0.0.1:8885/api/screen-candidate \\
  -H "Content-Type: application/json" \\
  -d '{ "full_name": "Asha Menon", "email": "asha@example.com",
        "years_experience": 6, "skills": ["Python", "PyTorch", "LLMs", "RAG"] }'

HTTP/1.1 201 Created
X-Tuvl-Run-Id: 5b0d…
{ "id": "c9e2…", "status": "shortlisted", "fit_score": 88 }`;
