const LOGOS = [
  ['FastAPI',         'https://fastapi.tiangolo.com'],
  ['SQLAlchemy',      'https://www.sqlalchemy.org'],
  ['LiteLLM',         'https://docs.litellm.ai'],
  ['Biscuit',         'https://www.biscuitsec.org'],
  ['Pydantic',        'https://docs.pydantic.dev'],
  ['gRPC-Web',        'https://grpc.io/docs/platforms/web'],
  ['OpenTelemetry',   'https://opentelemetry.io'],
  ['MCP',             'https://modelcontextprotocol.io'],
];

export default function Logos() {
  return (
    <section className="logos">
      <div className="logos-inner">
        <span className="logos-label">Built on the boring, reliable stuff</span>
        <div className="logos-row">
          {LOGOS.map(([name, href]) => (
            <a key={name} href={href} rel="noopener" target="_blank">{name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
