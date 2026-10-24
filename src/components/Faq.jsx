import { docs } from '../data/version.js';
import { rich } from '../lib/rich.jsx';

const QA = [
  { q: 'Is this another agent framework?', a: 'No. Frameworks are libraries inside your app; visual builders are canvases that export JSON. tuvl is a backend you declare: specs and YAML in git mount typed routes, Postgres models, scoped auth and durable runs, and fail closed.' },
  { q: 'Do I need a coding agent?', a: 'No. tuvl works from a spec and YAML you write yourself. If you have Claude Code, Codex or Gemini CLI installed, tuvl can also drive it: it numbers your idea, has the agent draft the spec on a branch, waits for a person to approve it, then has the agent build each task on its own pull request. The agent only proposes; the same checks, with no model in the loop, decide what is accepted.' },
  { q: 'Which models can I use?', a: 'OpenAI, Anthropic, Gemini, Azure OpenAI, Bedrock, Vertex AI, Cohere and Ollama are built in, and any OpenAI-compatible endpoint or gateway works too — plus Laya, an open-weight typed-decision model you can self-host as a container. Models are configured per workflow, with budgets.' },
  { q: 'Can an agent remember a customer between sessions?', a: 'Yes, with a few lines of YAML (`llm.memory` or `loop.memory`). The owner is the signed-in user, the tenant or a field you name, and the model never chooses it. What comes back is put in the prompt as data, never as instructions; secure fields are refused; the recalled tokens count against the workflow’s cost cap; and every recall is journaled. You can forget one memory or one person from Insight or with `tuvl prune memory`, and set a retention period.' },
  { q: 'Can answers stream to the user?', a: 'Yes. Set `stream_tokens: true` on an `llm` agent and the text of one output field reaches the run’s event stream, and `@tuvl/client`, while the model writes it. The validated result is unchanged, and the validator refuses streaming next to an output guardrail.' },
  { q: 'What if the model says something unexpected?', a: 'A model can only choose from the routes you declared. An answer outside the declared enum is refused and routed to parse_error, which you wrote a handler for. It can’t invent a step.' },
  { q: 'Where does my data live?', a: 'In your PostgreSQL: your models, the runs and the journal. tuvl is open source (Apache 2.0) and self-hosted; secure fields never reach a model.' },
  { q: 'How heavy is it to run?', a: 'A bare install is about 65 MB of Python packages, down from 320 MB in 2.0.0b4. Optional features such as MCP, Redis and vector search are extras, and `tuvl ship` installs only the ones your project uses into the image.' },
  { q: 'Is there a hosted version?', a: 'A hosted, managed tuvl engine that runs your backend services is planned, with `tuvl deploy` as the command for it. It isn’t available yet. Today you run tuvl yourself: `tuvl ship` builds an image and a Helm chart.' },
  { q: 'Do I have to write Python?', a: 'Only for function bodies that need it. Tools, rules, models and human approvals are a few lines of YAML, and `tuvl generate code` writes the typed signatures.' },
  { q: 'Can I list my application?', a: 'Yes. `tuvl init` gives every project an id and a `.tuvl/project.yaml`; `tuvl register project` (or Register in Insight) lists it in the open catalogue at nest.tuvl.io. You see the exact payload first, your email stays private unless you opt in, and only the GitHub account that registered it can update it.' },
  { q: 'Is it ready?', a: 'tuvl 2.0.0 is the next stable release. The public beta, 2.0.0b9, is on PyPI, with seven runnable examples.' },
];

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap faq-wrap">
        <div className="head rv">
          <span className="kicker">Questions you’d ask in the room</span>
          <h2 className="h2">The honest <span className="accent">answers.</span></h2>
          <a className="more" href={docs('/why-tuvl/')}>Why tuvl →</a>
        </div>
        <div className="faq rv">
          {QA.map((x) => (
            <details key={x.q}><summary>{x.q}</summary><p>{rich(x.a)}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}
