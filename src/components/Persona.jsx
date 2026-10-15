import { usePersona } from '../hooks/usePersona.jsx';
import { track } from '../lib/analytics.js';

/** "I build it" / "I own it" — the same pitch, told to the reader in front of it. */
export default function Persona() {
  const { persona, setPersona } = usePersona();
  const pick = (p) => { if (p !== persona) { track('persona', { persona: p }); setPersona(p); } };
  return (
    <div className="persona" role="radiogroup" aria-label="Who is reading?">
      <span className="persona-label">I’m a</span>
      <button type="button" role="radio" aria-checked={persona === 'dev'} onClick={() => pick('dev')}>Developer</button>
      <button type="button" role="radio" aria-checked={persona === 'pm'} onClick={() => pick('pm')}>Product lead</button>
    </div>
  );
}
