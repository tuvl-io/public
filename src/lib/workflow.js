/* ──────────────────────────────────────────────────────────────────
   tuvl playground — tolerant parser + graph derivation for the
   closed-set Workflow schema. No external YAML dependency on purpose:
   the engine ships 0 deps, the demo that sells it shouldn't pull one.
   ──────────────────────────────────────────────────────────────── */

// closed set — mirrors the engine's step-kind catalogue (AGENT.md §3)
export const STEP_KINDS = [
  'Functional', 'Agent', 'Router', 'APICall',
  'MCP', 'ModelOp', 'Response', 'HumanInTheLoop',
];

// step kind → graph node style (reuses the existing .n-* node classes)
const KIND_NODE = {
  Agent: 'agent',
  Functional: 'func',
  ModelOp: 'model',
  Response: 'end',
  Router: 'func',
  APICall: 'func',
  MCP: 'func',
  HumanInTheLoop: 'func',
};

const KIND_TAG = { Agent: 'ai', Router: 'fork', MCP: 'mcp', HumanInTheLoop: 'hitl' };

const TERMINALS = new Set(['END', 'end', 'STOP', 'stop']);
const NEG = /^(reject|invalid|weak|fail|failed|error|errored|no|deny|denied|low|timeout)$/i;
const POS = /^(strong|valid|pass|passed|ok|yes|approve|approved|high|success|accept|accepted)$/i;

const stripComment = (line) => {
  // drop trailing comments, but not '#' inside quotes (rare in this subset)
  const i = line.indexOf('#');
  return i === -1 ? line : line.slice(0, i);
};

/**
 * Parse the tuvl Workflow subset we render. Tolerant by design: it walks
 * indentation rather than demanding a full YAML grammar, so a half-typed
 * document still yields a partial graph instead of a hard failure.
 */
export function parseWorkflow(src) {
  const lines = src.split('\n');
  let name = null;
  let inSteps = false;
  let inRoutes = false;
  let routesIndent = -1;
  let cur = null;
  const steps = [];

  const parseKV = (text, target) => {
    const m = text.match(/^([\w-]+):\s*(.*)$/);
    if (!m) return;
    const [, key, valRaw] = m;
    const val = valRaw.trim().replace(/^["']|["']$/g, '');
    if (key === 'id') target.id = val;
    else if (key === 'kind') target.kind = val;
    else if (key === 'model' || key === 'runner' || key === 'op' || key === 'tool') {
      target[key] = val;
    }
  };

  lines.forEach((raw, idx) => {
    const line = stripComment(raw);
    if (!line.trim()) return;
    const indent = line.length - line.trimStart().length;
    const t = line.trim();

    if (!inSteps) {
      const nm = t.match(/^name:\s*(.+)$/);
      if (nm) { name = nm[1].trim().replace(/^["']|["']$/g, ''); return; }
      if (/^steps:\s*$/.test(t)) { inSteps = true; return; }
      return;
    }

    // new list item → new step
    if (t.startsWith('- ')) {
      cur = { id: null, kind: null, routes: [], line: idx };
      steps.push(cur);
      inRoutes = false;
      parseKV(t.slice(2).trim(), cur);
      return;
    }
    if (t === '-') {
      cur = { id: null, kind: null, routes: [], line: idx };
      steps.push(cur);
      inRoutes = false;
      return;
    }
    if (!cur) return;

    if (/^routes:\s*$/.test(t)) { inRoutes = true; routesIndent = indent; return; }

    if (inRoutes) {
      if (indent <= routesIndent) {
        inRoutes = false; // dedented out of the routes block
      } else {
        const rm = t.match(/^([\w-]+):\s*(.+)$/);
        if (rm) {
          cur.routes.push({ signal: rm[1], target: rm[2].trim().replace(/^["']|["']$/g, ''), line: idx });
          return;
        }
        return;
      }
    }

    parseKV(t, cur);
  });

  return { name, steps };
}

const sigClass = (signal, isError) => {
  if (isError) return 'wf-sig-neg';
  if (POS.test(signal)) return 'wf-sig-pos';
  if (NEG.test(signal)) return 'wf-sig-neg';
  return '';
};

/**
 * Turn a parsed workflow into xyflow nodes/edges + validation feedback.
 * Validation enforces the same golden rules the engine does at load time:
 * closed-set kinds, mapped routes pointing at real steps.
 */
export function deriveGraph(parsed) {
  const { name, steps } = parsed;
  const errors = [];
  const ids = new Set(steps.map((s) => s.id).filter(Boolean));
  const idToKind = {};
  steps.forEach((s) => { if (s.id) idToKind[s.id] = s.kind; });

  // ── validate ──────────────────────────────────────────────
  const seen = new Set();
  steps.forEach((s, i) => {
    if (!s.id) errors.push({ line: s.line, msg: `step #${i + 1} is missing an \`id\`` });
    else if (seen.has(s.id)) errors.push({ line: s.line, msg: `duplicate step id \`${s.id}\`` });
    else seen.add(s.id);
    if (!s.kind) {
      errors.push({ line: s.line, msg: `step \`${s.id || i + 1}\` is missing a \`kind\`` });
    } else if (!STEP_KINDS.includes(s.kind)) {
      errors.push({
        line: s.line,
        msg: `\`${s.kind}\` is not a tuvl step kind — closed set is ${STEP_KINDS.join(', ')}`,
      });
    }
  });

  // ── build edges from routes ───────────────────────────────
  const edges = [];
  const virtualEnds = []; // terminal / dangling targets that aren't real steps
  steps.forEach((s, si) => {
    if (!s.id) return;
    s.routes.forEach((r, ri) => {
      let targetId = r.target;
      let isError = false;
      if (!ids.has(r.target)) {
        if (TERMINALS.has(r.target)) {
          targetId = `__end_${si}_${ri}`;
          virtualEnds.push({ id: targetId, label: r.target.toUpperCase() });
        } else {
          targetId = `__dangling_${si}_${ri}`;
          virtualEnds.push({ id: targetId, label: r.target, dangling: true });
          isError = true;
          errors.push({
            line: r.line,
            msg: `route \`${r.signal} → ${r.target}\` points to a step that doesn't exist`,
          });
        }
      }
      edges.push({
        id: `e-${si}-${ri}`,
        source: s.id,
        target: targetId,
        type: 'custom',
        data: { label: r.signal, sigClass: sigClass(r.signal, isError) },
      });
    });
  });

  // ── layered left→right layout (longest-path depth) ────────
  const allNodes = [
    ...steps.filter((s) => s.id).map((s) => ({ id: s.id, kind: s.kind })),
    ...virtualEnds.map((v) => ({ id: v.id, kind: null, end: true, label: v.label, dangling: v.dangling })),
  ];
  const depth = {};
  allNodes.forEach((n) => { depth[n.id] = 0; });
  for (let iter = 0; iter <= allNodes.length; iter++) {
    let changed = false;
    edges.forEach((e) => {
      if (depth[e.source] !== undefined && depth[e.target] !== undefined
        && depth[e.target] < depth[e.source] + 1) {
        depth[e.target] = depth[e.source] + 1;
        changed = true;
      }
    });
    if (!changed) break; // also breaks cleanly on cycles after the cap
  }

  const COL_W = 196;
  const ROW_H = 88;
  const cols = {};
  allNodes.forEach((n) => { (cols[depth[n.id]] ||= []).push(n); });
  const maxRows = Math.max(1, ...Object.values(cols).map((c) => c.length));

  const nodes = allNodes.map((n) => {
    const d = depth[n.id];
    const col = cols[d];
    const row = col.indexOf(n);
    const yOffset = ((maxRows - col.length) * ROW_H) / 2;
    let type = 'func';
    let tag;
    if (n.end) {
      type = 'end';
    } else {
      type = KIND_NODE[n.kind] || 'func';
      tag = KIND_TAG[n.kind];
    }
    return {
      id: n.id,
      type,
      position: { x: 24 + d * COL_W, y: 28 + yOffset + row * ROW_H },
      data: { label: n.label || n.id, tag, dangling: n.dangling },
    };
  });

  const routeCount = edges.length;
  const models = [...new Set(steps.map((s) => s.model).filter((m) => m && m !== 'default'))];

  return {
    name: name || 'workflow',
    nodes,
    edges,
    errors,
    valid: errors.length === 0 && steps.length > 0,
    stepCount: steps.filter((s) => s.id).length,
    routeCount,
    models,
  };
}
