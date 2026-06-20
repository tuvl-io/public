import Playground from './Playground.jsx';

export default function Workflows() {
  return (
    <section className="workflows" id="workflows">
      <div className="section-head">
        <span className="eyebrow">live validation · instant feedback</span>
        <h2 className="section-title">
          Strict schema.<br />
          <span className="grad">Instant validation.</span>
        </h2>
        <p className="section-sub">
          This is the exact contract your AI agent targets. It is a finite, closed-set
          schema. Break the YAML below on purpose—watch the engine reject invalid routes
          and unknown node kinds in milliseconds. No silent failures.
        </p>
      </div>

      <Playground />

      <div className="wf-compare">
        <div className="wf-compare-head">
          <span className="eyebrow eyebrow-cyan">serverless orchestration · without the latency</span>
          <h3 className="wf-compare-title">
            Serverless orchestration, declared in YAML — and{' '}
            <span className="grad">portable.</span>
          </h3>
        </div>

        <div className="wf-compare-table">
          <div className="wf-row wf-row-head">
            <span />
            <span className="wf-col-aws">Standard Cloud Serverless</span>
            <span className="wf-col-tuvl">tuvl</span>
          </div>
          <div className="wf-row">
            <span className="wf-axis">graph definition</span>
            <span className="wf-cell wf-cell-aws">Proprietary Cloud JSON</span>
            <span className="wf-cell wf-cell-tuvl"><code>kind: Workflow</code> YAML</span>
          </div>
          <div className="wf-row">
            <span className="wf-axis">step execution</span>
            <span className="wf-cell wf-cell-aws">Isolated function containers over network</span>
            <span className="wf-cell wf-cell-tuvl">single Python process · shared <code>context</code> dict</span>
          </div>
          <div className="wf-row">
            <span className="wf-axis">inter-step latency</span>
            <span className="wf-cell wf-cell-aws">~100–500ms cold start &amp; network overhead</span>
            <span className="wf-cell wf-cell-tuvl">~0ms · in-process function call</span>
          </div>
          <div className="wf-row">
            <span className="wf-axis">auth surface</span>
            <span className="wf-cell wf-cell-aws">Cloud IAM evaluated on every network hop</span>
            <span className="wf-cell wf-cell-tuvl">one Biscuit, verified once at the edge</span>
          </div>
          <div className="wf-row">
            <span className="wf-axis">portability</span>
            <span className="wf-cell wf-cell-aws">Vendor-locked · re-platforming = rewrite</span>
            <span className="wf-cell wf-cell-tuvl">anywhere FastAPI runs · laptop → k8s, unchanged</span>
          </div>
        </div>
      </div>
    </section>
  );
}
