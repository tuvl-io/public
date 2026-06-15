import { useState } from 'react';
import { VERSION_TAG } from '../data/version.js';

export default function AnnounceBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="announce-bar">
      <span className="announce-pulse" />
      <span className="announce-text">
        <strong>{VERSION_TAG}</strong> dropped.
      </span>
      <button
        aria-label="Dismiss"
        className="announce-close"
        onClick={() => setDismissed(true)}
        type="button"
      >
        ×
      </button>
    </div>
  );
}
