export const INSIGHT_TABS = [
  {
    key: 'workflows',
    path: 'workflows',
    shot: 'workflows',
    label: 'Workflows',
    caption:
      'Edit any workflow YAML in the browser. Visual graph, live versioning, hot reload — no IDE required.',
  },
  {
    key: 'models',
    path: 'models',
    shot: 'models',
    label: 'Models',
    caption:
      'ModelDefinition files auto-generate PostgreSQL tables, Pydantic schemas, and full CRUD REST routes at startup.',
  },
  {
    key: 'datasources',
    path: 'datasources',
    shot: 'datasources',
    label: 'Datasources',
    caption:
      'PostgreSQL connection configs with ${ENV_VAR:default} substitution. Health-checked on startup.',
  },
  {
    key: 'agent-models',
    path: 'agent-models',
    shot: 'ai-models',
    label: 'AI Models',
    caption:
      'One YAML config per LLM. LiteLLM under the hood — Ollama, OpenAI, Anthropic, Gemini, Groq, all 100+ providers.',
  },
  {
    key: 'embeddings',
    path: 'embeddings',
    shot: 'embeddings',
    label: 'Embeddings',
    caption:
      'EmbeddingModel definitions for vector search. Supports Ollama, OpenAI, Cohere, and any LiteLLM embedding provider.',
  },
  {
    key: 'collections',
    path: 'collections',
    shot: 'collections',
    label: 'Collections',
    caption:
      'Named pgvector tables with configurable dimensions and distance metrics. Powers the auto-registered rag_search node.',
  },
  {
    key: 'iam',
    path: 'iam',
    shot: 'iam',
    label: 'IAM',
    caption:
      'Users, roles, and resource:action scopes — backed by Biscuit Ed25519 tokens. Bootstrap the first superadmin in one curl.',
  },
  {
    key: 'federation',
    path: 'federation',
    shot: 'federation',
    label: 'Federation',
    caption:
      'OAuth2 / OIDC social login. Google, GitHub, Microsoft, or any OIDC-compliant provider — managed entirely from the portal.',
  },
  {
    key: 'api-docs',
    path: 'api-docs',
    shot: 'api-docs',
    label: 'API Docs',
    caption:
      'Live Swagger UI for every auto-generated CRUD route, workflow execution endpoint, and auth route. Try requests from the browser.',
  },
  {
    key: 'spectrum',
    path: 'spectrum',
    shot: 'spectrum',
    label: 'Spectrum',
    caption:
      'Trigger workflows with custom JSON. Watch nodes glow as they execute. Click any node for input, output, duration, and stack trace.',
  },
  {
    key: 'settings',
    path: 'settings',
    shot: 'settings',
    label: 'Settings',
    caption:
      'Redis for multi-worker state. OpenTelemetry for tracing. LLM Judge for tuvl test — all configured from YAML or this UI.',
  },
];
