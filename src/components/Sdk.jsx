import { docs } from '../data/version.js';

export default function Sdk() {
  return (
    <section className="sdk" id="sdk">
      <div className="sdk-grid">
        <div className="sdk-info">
          <span className="eyebrow">TypeScript SDK</span>
          <h2 className="section-title section-title-sm">@tuvl/client.<br />Zero plumbing.</h2>
          <p className="section-sub" style={{ margin: '0 0 28px' }}>
            Auth lifecycle, workflow execution, and SSE streaming — all from one npm package.
            Biscuit parsed server-side, no WASM in your bundle.
          </p>
          <ul className="sdk-list">
            <li>
              <span className="sdk-tick">✓</span>
              <div><b>TuvlAuth</b> — password, OAuth2 PKCE, refresh, revoke, <code>getMe()</code></div>
            </li>
            <li>
              <span className="sdk-tick">✓</span>
              <div><b>TuvlClient</b> — one <code>execute()</code> call; REST · SSE · gRPC-Web auto-negotiated</div>
            </li>
            <li>
              <span className="sdk-tick">✓</span>
              <div><b>Live step streaming</b> — <code>onProgress</code> fires per engine event with signal &amp; duration</div>
            </li>
            <li>
              <span className="sdk-tick">✓</span>
              <div><b>Full TypeScript types</b> — <code>StepEvent</code>, <code>WorkflowResult</code>, <code>MeResponse</code></div>
            </li>
          </ul>
          <div className="sdk-cta">
            <a className="btn btn-primary btn-sm" href={docs('/sdk/quickstart')} rel="noopener" target="_blank">
              SDK Quickstart →
            </a>
            <a className="btn btn-ghost btn-sm" href={docs('/sdk/api-reference')} rel="noopener" target="_blank">
              API reference →
            </a>
          </div>
        </div>

        <div className="sdk-code">
          <div className="terminal terminal-sm">
            <div className="terminal-bar">
              <span className="t-dots"><i /><i /><i /></span>
              <span className="t-title">app.ts</span>
              <span className="t-meta">TypeScript</span>
            </div>
            <div className="terminal-body">
              <pre className="code">
                <span className="cm">{'// npm install @tuvl/client'}</span>{'\n'}
                <span className="pkw">import</span> {'{ TuvlAuth, TuvlClient }'} <span className="pkw">from</span>{' '}<span className="st">"@tuvl/client"</span>;{'\n'}
                {'\n'}
                <span className="pkw">const</span> auth = <span className="pkw">new</span> TuvlAuth({'{ baseUrl }'});{'\n'}
                {'\n'}
                <span className="cm">{'// password login → Biscuit bearer token'}</span>{'\n'}
                <span className="pkw">const</span> {'{ access_token }'} = <span className="pkw">await</span> auth.loginWithPassword({'\n'}
                {'  '}<span className="st">"me@example.com"</span>, <span className="st">"secret"</span>{'\n'}
                );{'\n'}
                {'\n'}
                <span className="cm">{'// roles + scopes — no Biscuit internals'}</span>{'\n'}
                <span className="pkw">const</span> me = <span className="pkw">await</span> auth.getMe(access_token);{'\n'}
                <span className="cm">{'// { user_id, groups: ["hr_manager"], scopes: [...] }'}</span>{'\n'}
                {'\n'}
                <span className="cm">{'// execute a workflow — streams live step events'}</span>{'\n'}
                <span className="pkw">const</span> client = <span className="pkw">new</span> TuvlClient({'{ baseUrl, token: access_token }'});{'\n'}
                <span className="pkw">const</span> result = <span className="pkw">await</span> client.execute(<span className="st">"screen_candidate"</span>, {'{'}{'\n'}
                {'  '}payload:    {'{ candidate_id: '}<span className="vl">42</span>{' }'},{'\n'}
                {'  '}onProgress: (ev) =&gt; console.log({'\n'}
                {'    '}<span className="st">{'`[${ev.step_id}] ${ev.signal} (${ev.duration_ms}ms)`'}</span>{'\n'}
                {'  '}),{'\n'}
                {'}'});
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
