import { track } from '../lib/analytics.js';

// A filled play triangle — the "run it" symbol.
function PlayIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Persistent floating CTA pinned to the lower-right — an icon + caption that
// stays in view as you scroll. Links to the live browser sandbox.
export default function TryLiveFab() {
  return (
    <a
      className="try-fab"
      href="https://try.tuvl.online"
      rel="noopener"
      target="_blank"
      aria-label="Try tuvl live in a browser sandbox"
      onClick={() => track('try_live', { location: 'fab' })}
    >
      <span className="try-fab-ico">
        <PlayIcon />
      </span>
      <span className="try-fab-label">Try live</span>
    </a>
  );
}
