import { useMemo, useRef, useState } from 'react';
import WorkflowFlow from './WorkflowFlow.jsx';
import { parseWorkflow, deriveGraph } from '../lib/workflow.js';
import { PRESETS } from '../data/playgroundPresets.js';

const LITERAL = /^(true|false|null|\d+(\.\d+)?)$/;

/* Tokenise one line into {text, cls} runs that mirror the source exactly,
   so the highlight layer lines up character-for-character with the textarea. */
function highlightLine(line) {
  if (!line) return [];
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

  let rest = code.slice(indent.length + dash.length);
  const kv = rest.match(/^([\w-]+)(:)(\s*)(.*)$/);
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

export default function Playground() {
  const [src, setSrc] = useState(PRESETS[0].yaml);
  const [activeKey, setActiveKey] = useState(PRESETS[0].key);
  const preRef = useRef(null);
  const gutterRef = useRef(null);

  const result = useMemo(() => deriveGraph(parseWorkflow(src)), [src]);
  const lines = src.split('\n');

  const loadPreset = (p) => { setSrc(p.yaml); setActiveKey(p.key); };

  const onEdit = (e) => { setSrc(e.target.value); setActiveKey(null); };

  const onScroll = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = scrollTop;
  };

  return (
    <div className="pg">
      <div className="pg-bar">
        <span className="pg-bar-lbl">load an example</span>
        <div className="pg-presets">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`pg-chip${activeKey === p.key ? ' active' : ''}${p.key === 'guardrails' ? ' pg-chip-warn' : ''}`}
              onClick={() => loadPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <span className="pg-bar-hint">edit freely — the backend re-renders as you type</span>
      </div>

      <div className="pg-grid">
        {/* ── editor ── */}
        <div className="pg-editor">
          <div className="pg-editor-head">
            <span className="pg-dot" />
            <span className="pg-file">workflows/{result.name}.yaml</span>
          </div>
          <div className="pg-code-wrap">
            <div className="pg-gutter" ref={gutterRef} aria-hidden="true">
              {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="pg-code-stack">
              <pre className="pg-highlight" ref={preRef} aria-hidden="true">
                {lines.map((ln, i) => (
                  <span key={i}>
                    {highlightLine(ln).map((r, j) => (
                      r.cls ? <span key={j} className={r.cls}>{r.text}</span> : r.text
                    ))}
                    {i < lines.length - 1 ? '\n' : ''}
                  </span>
                ))}
              </pre>
              <textarea
                className="pg-input"
                value={src}
                onChange={onEdit}
                onScroll={onScroll}
                spellCheck="false"
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="Workflow YAML editor"
              />
            </div>
          </div>
        </div>

        {/* ── live backend ── */}
        <div className="pg-out">
          <div className="pg-out-head">
            <span className={`pg-status${result.valid ? ' is-valid' : ' is-invalid'}`}>
              <span className="pg-status-dot" />
              {result.valid ? 'mounted' : 'rejected at load'}
            </span>
            <code className="pg-endpoint">POST /run/{result.name}</code>
          </div>

          <div className="pg-graph">
            {result.nodes.length > 0
              ? <WorkflowFlow nodes={result.nodes} edges={result.edges} />
              : <div className="pg-empty">add a step to see the graph</div>}
          </div>

          {result.valid ? (
            <div className="pg-meta">
              <span><strong>{result.stepCount}</strong> steps</span>
              <span><strong>{result.routeCount}</strong> routes</span>
              <span>
                <strong>{result.models.length}</strong>{' '}
                {result.models.length === 1 ? 'model' : 'models'}
              </span>
              <span className="pg-meta-ok">validated by Pydantic at load time</span>
            </div>
          ) : (
            <div className="pg-console" role="status">
              {result.errors.slice(0, 4).map((err, i) => (
                <div key={i} className="pg-console-line">
                  <span className="pg-console-tag">PermissionError</span>
                  {err.line != null && <span className="pg-console-loc">L{err.line + 1}</span>}
                  <span className="pg-console-msg">{err.msg}</span>
                </div>
              ))}
              {result.errors.length === 0 && (
                <div className="pg-console-line pg-console-line-dim">
                  waiting for a valid step…
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
