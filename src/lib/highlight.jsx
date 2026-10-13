/* Just enough colour for YAML, Markdown front matter and terminal output. */

function yamlLine(line, i) {
  const hash = line.search(/\s#\s|^\s*#/);
  const body = hash >= 0 ? line.slice(0, hash) : line;
  const comment = hash >= 0 ? line.slice(hash) : '';
  const parts = [];
  const key = body.match(/^(\s*-?\s*)([A-Za-z_][\w.]*)(:)(.*)$/);
  const rest = key ? key[4] : body;
  if (key) parts.push(key[1], <span className="tok-k" key="k">{key[2]}</span>, key[3]);
  rest.split(/("[^"]*")/).forEach((chunk, k) =>
    parts.push(chunk.startsWith('"') ? <span className="tok-s" key={`s${k}`}>{chunk}</span> : chunk),
  );
  if (comment) parts.push(<span className="tok-c" key="c">{comment}</span>);
  return <span key={i}>{parts}{'\n'}</span>;
}

function termLine(line, i) {
  if (line.startsWith('$')) return <span key={i} className="tok-k">{line}{'\n'}</span>;
  if (/^\s*PASS\b/.test(line) || /^HTTP\/1\.1 2/.test(line)) return <span key={i} className="tok-ok">{line}{'\n'}</span>;
  if (/^\s*WARN\b/.test(line)) return <span key={i} className="tok-warn">{line}{'\n'}</span>;
  return <span key={i}>{line}{'\n'}</span>;
}

export function highlight(text, kind) {
  const lines = text.split('\n');
  if (kind === 'term') return lines.map(termLine);
  return lines.map(yamlLine);
}
