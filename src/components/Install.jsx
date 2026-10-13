import { useState } from 'react';
import { track } from '../lib/analytics.js';

/** A copyable install command. */
export default function Install({ cmd, location }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      track('install_copy', { location, command: cmd });
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <button className="install" onClick={copy} type="button" aria-label={`Copy: ${cmd}`}>
      <span className="prompt">$</span>
      <code>{cmd}</code>
      <span className="copy" aria-live="polite">{copied ? 'copied' : 'copy'}</span>
    </button>
  );
}
