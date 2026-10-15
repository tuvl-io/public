import { useState } from 'react';
import { highlight } from '../lib/highlight.jsx';
import { usePersona } from '../hooks/usePersona.jsx';
import { docs } from '../data/version.js';
import { rich } from '../lib/rich.jsx';

const SPEC = `# Policies
- AI Engineers need 3+ years of experience —
  decided by a rule, never a model.
- A model scores skill fit; at most 800 tokens
  per application.

# Acceptance
name: a junior applicant is rejected by rule
input: { years_experience: 1, skills: [Python] }
expect:
  end: rejected
  path: [save, gate, reject]`;

const CONTRACT = `- id: gate                  # deterministic
  engine: decide
  inputs:  { years_experience: int }
  outputs: { lane: "enum[assess, reject]" }
  decide:
    rules:
      - { when: "years_experience >= 3", then: assess }
      - { when: "true", then: reject }
  routes: { assess: assess_fit, reject: reject }

- id: assess_fit            # bounded: one model call
  engine: llm
  budget: { timeout: 20s, max_tokens: 800 }
  routes: { strong: shortlist, weak: reject,
            parse_error: reject, timeout: reject }`;

const CHECK = `$ tuvl spec verify --strict
  gate        decide rules          ✓ matches the spec
  assess_fit  llm default · 800 tok ✓ matches the spec
  reject      tool db update        ✓ 1 passed
  0 mismatch(es) · steps implemented 6/6

$ tuvl test
  PASS a-junior-applicant-is-rejected-by-rule (0 tok)`;

export default function Alignment() {
  const { t } = usePersona();
  const [tab, setTab] = useState(0);
  return (
    <section className="section section-alt" id="alignment">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">{t('One source of truth', 'Say it once. See it built.')}</span>
          <h2 className="h2">
            {t(<>The spec and the code <span className="accent">can’t drift.</span></>,
               <>Your spec is the product. <span className="accent">The build is checked against it.</span></>)}
          </h2>
          <p className="lede">
            {t('A product lead writes intent, policies and examples. Your agent writes the contract. tuvl compares them on every commit — and fails the build when they disagree.',
               'You write intent, policies and acceptance examples in plain language. The engineering side writes the contract. tuvl compares them on every commit and fails the build when they disagree — so “done” is something you can verify.')}
          </p>
        </div>

        <div className="align rv">
          <div className="align-col">
            <div className="align-tag"><span>Product writes</span><code>specs/screen-candidate.md</code></div>
            <pre><code>{highlight(SPEC, 'yaml')}</code></pre>
          </div>
          <div className="align-mid" aria-hidden="true">
            <span className="align-badge">spec verify</span>
            <span className="align-arrow" />
          </div>
          <div className="align-col">
            <div className="align-tag"><span>Engineering owns</span><code>workflows/screen_candidate.yaml</code></div>
            <pre><code>{highlight(CONTRACT, 'yaml')}</code></pre>
          </div>
        </div>

        <div className="align-result rv">
          <pre><code>{highlight(CHECK, 'term')}</code></pre>
          <ul>
            <li><b>{t('Reviewable', 'Readable')}</b>{rich(t('The contract is YAML in git — a diff a person can review, not a prompt buried in code.', 'Policies and acceptance examples are prose and examples you wrote, not tickets paraphrased by an engineer.'))}</li>
            <li><b>{t('Testable', 'Verifiable')}</b>{rich(t('Examples become offline tests with mocked models: 0 tokens, deterministic, in CI.', 'Each example becomes a test that must pass before a task counts as done. Status is derived, never self-reported.'))}</li>
            <li><b>{t('Typed', 'Auditable')}</b>{rich(t('`tuvl codegen` writes the typed signatures; you write only the function bodies that need Python.', 'Every run is journaled, with who approved what — answerable without reading logs.'))}</li>
          </ul>
        </div>
        <a className="more" href={docs('/internals/spec-driven/')}>How spec-driven development works →</a>
      </div>
    </section>
  );
}
