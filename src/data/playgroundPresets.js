/* Starter documents for the live playground. Each is valid tuvl YAML the
   visitor can edit in place; "Guardrails" intentionally ships a mistake to
   show the closed-set validation firing. */

export const PRESETS = [
  {
    key: 'agentic',
    label: 'Agentic',
    yaml: `kind: Workflow
metadata:
  name: screen_candidate
spec:
  steps:
    - id: save_draft
      kind: model-op
      op: add
      model: Candidate
      routes:
        default: score_cv

    - id: score_cv
      kind: agent
      agent:
        model: default
      routes:
        strong: fast_track
        weak: reject

    - id: fast_track
      kind: functional
      runner: notify_recruiter

    - id: reject
      kind: response
`,
  },
  {
    key: 'functional',
    label: 'Functional',
    yaml: `kind: Workflow
metadata:
  name: contact_intake
spec:
  steps:
    - id: validate
      kind: functional
      runner: validate_contact
      routes:
        valid: save
        invalid: END

    - id: save
      kind: model-op
      op: add
      model: Contact
      routes:
        default: notify

    - id: notify
      kind: functional
      runner: send_welcome_email
`,
  },
  {
    key: 'branch',
    label: 'Multi-branch',
    yaml: `kind: Workflow
metadata:
  name: triage_ticket
spec:
  steps:
    - id: classify
      kind: agent
      agent:
        model: default
      routes:
        bug: enrich
        billing: charge
        other: ask_human

    - id: enrich
      kind: api_call
      routes:
        default: ask_human

    - id: charge
      kind: mcp
      tool: stripe.refund
      routes:
        ok: done
        fail: ask_human

    - id: ask_human
      kind: HumanInTheLoop
      routes:
        default: done

    - id: done
      kind: response
`,
  },
  {
    key: 'guardrails',
    label: 'Guardrails',
    yaml: `kind: Workflow
metadata:
  name: broken_on_purpose
spec:
  steps:
    # 'frobnicate' is not in the closed set — caught at load time
    - id: start
      kind: frobnicate
      routes:
        default: finish

    # this route points at a step that was never declared
    - id: middle
      kind: agent
      agent:
        model: default
      routes:
        done: nonexistent_step
`,
  },
];
