import { useState } from 'react';
import { INSIGHT_TABS } from '../data/insightTabs.js';

const icons = {
  specs: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  runs: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
  artifacts: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  workflows: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="18" r="3" />
      <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
    </svg>
  ),
  models: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  ),
  'agent-models': (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  iam: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'api-docs': (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  settings: (
    <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" width="13">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

function LockIcon() {
  return (
    <svg fill="none" height="11" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="11">
      <rect height="11" rx="2" width="18" x="3" y="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function Insight() {
  const [activeKey, setActiveKey] = useState(INSIGHT_TABS[0].key);
  const active = INSIGHT_TABS.find((t) => t.key === activeKey) ?? INSIGHT_TABS[0];

  return (
    <section className="insight" id="insight">
      <div className="section-head">
        <span className="eyebrow eyebrow-cyan">Insight</span>
        <h2 className="section-title">Build, run and debug <br /><span className="grad">in one place.</span></h2>
        <p className="section-sub">
          Specs and the task board, a canvas over the same YAML, journaled runs with breakpoints, step mode and approvals, and judge calibration — served by your dev engine, never in production.
        </p>
      </div>

      <div className="insight-app">
        <div className="insight-chrome">
          <span className="t-dots"><i /><i /><i /></span>
          <div className="insight-url">
            <LockIcon />
            <span>127.0.0.1:8885<b>/insight/</b>{active.path}</span>
          </div>
          <span className="insight-badge">dev</span>
        </div>

        <div className="insight-stage">
          <div className="insight-tabs" role="tablist">
            {INSIGHT_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`i-tab${tab.key === activeKey ? ' active' : ''}`}
                onClick={() => setActiveKey(tab.key)}
                role="tab"
                type="button"
              >
                {icons[tab.key]}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="insight-screen">
            <img
              alt={`tuvl Insight — ${active.label}`}
              id="insight-img"
              src={`/assets/insight/insight-${active.shot}.png`}
            />
            <div className="insight-caption">{active.caption}</div>
          </div>
        </div>
      </div>

      <div className="insight-grid">
        <div className="i-cell">
          <div className="i-cell-num">1<span className="hl"> file</span></div>
          <div className="i-cell-text">source of truth. The canvas, the forms and your editor all write the same YAML — round-trip safe, comments kept.</div>
        </div>
        <div className="i-cell">
          <div className="i-cell-num">Step<span className="hl"> &amp; break</span></div>
          <div className="i-cell-text">pause any run before an agent, inspect what it will see, edit its inputs, then continue — or approve a waiting step.</div>
        </div>
        <div className="i-cell">
          <div className="i-cell-num">0<span className="hl"> tok</span></div>
          <div className="i-cell-text">to replay a pinned run. Change an agent&apos;s engine and check it against your fixtures before you save.</div>
        </div>
        <div className="i-cell">
          <div className="i-cell-num">dev<span className="hl"> only</span></div>
          <div className="i-cell-text">never served in production. Zero attack surface added to your deployed engine.</div>
        </div>
      </div>
    </section>
  );
}
