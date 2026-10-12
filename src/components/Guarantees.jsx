import { docs } from '../data/version.js';

const GUARANTEES = [
  {
    title: 'Every path is declared.',
    body: 'Agents have typed inputs, outputs and signals, and every signal must be routed. 29 checks run before anything executes and print each workflow’s worst-case token cost.',
    proof: '$ tuvl validate --strict',
  },
  {
    title: 'Models stay on a leash.',
    body: 'Rules decide first; a model is asked only when none match. Every model call has a token and time budget, and can only choose one of the routes you declared.',
    proof: 'budget: { max_tokens: 800 }',
  },
  {
    title: 'Runs survive anything.',
    body: 'Every step is journaled in your Postgres. A crashed worker resumes from the last checkpoint, a rollback compensates in reverse, and a recorded run replays for zero tokens.',
    proof: '$ tuvl runs replay',
  },
  {
    title: 'Closed by default.',
    body: 'No token, no run — anonymous access is an explicit declaration. Fields marked secure never reach a model, and every human decision is recorded with who made it.',
    proof: 'email: { secure: true }',
  },
];

export default function Guarantees() {
  return (
    <section className="section" id="guarantees">
      <div className="wrap">
        <div className="head rv">
          <span className="kicker">Four guarantees</span>
          <h2 className="h2">AI in production, without the <span className="mark">guesswork.</span></h2>
        </div>
        <div className="g-grid">
          {GUARANTEES.map((g, i) => (
            <article className="g rv" key={g.title}>
              <span className="g-num">0{i + 1}</span>
              <div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
                <code className="g-proof">{g.proof}</code>
              </div>
            </article>
          ))}
        </div>
        <a className="more" href={docs('/why-tuvl/')}>Every guarantee, in detail →</a>
      </div>
    </section>
  );
}
