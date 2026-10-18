import { docs } from '../data/version.js';
import { rich } from '../lib/rich.jsx';

const QA = [
  { q: 'Is this another agent framework?', a: 'No. Frameworks are libraries inside your app; visual builders are canvases that export JSON. tuvl is a backend you declare: specs and YAML in git mount typed routes, Postgres models, scoped auth and durable runs, and fail closed.' },
  { q: 'Which models can I use?', a: 'OpenAI, Anthropic, Gemini, Azure OpenAI, Bedrock, Vertex AI, Cohere and Ollama are built in, and any OpenAI-compatible endpoint or gateway works too — plus Laya, an open-weight typed-decision model you can self-host as a container. Models are configured per workflow, with budgets.' },
  { q: 'What if the model says something unexpected?', a: 'A model can only choose from the routes you declared. An answer outside the declared enum is refused and routed to parse_error, which you wrote a handler for. It can’t invent a step.' },
  { q: 'Where does my data live?', a: 'In your PostgreSQL: your models, the runs and the journal. tuvl is open source (Apache 2.0) and self-hosted; secure fields never reach a model.' },
  { q: 'Do I have to write Python?', a: 'Only for function bodies that need it. Tools, rules, models and human approvals are a few lines of YAML, and `tuvl codegen` writes the typed signatures.' },
  { q: 'Can I list my application?', a: 'Yes. `tuvl init` gives every project an id and a `.tuvl/project.yaml`; `tuvl project register` (or Register in Insight) lists it in the open catalogue at hub.tuvl.io. You see the exact payload first, your email stays private unless you opt in, and only the GitHub account that registered it can update it.' },
  { q: 'Is it ready?', a: 'tuvl 2.0.0 is released on 20 October 2026. The public beta, 2.0.0b4, is on PyPI today, with seven runnable examples.' },
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
