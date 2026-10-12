import { useEffect, useState } from 'react';
import { BETA_VERSION, RELEASE_AT, VERSION_TAG, isReleased } from '../data/version.js';

const pad = (n) => String(n).padStart(2, '0');

function remaining(now) {
  const ms = Math.max(0, Date.parse(RELEASE_AT) - now);
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

const RELEASE_DAY = new Date(RELEASE_AT).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });

/** Days to 2.0.0, with the beta to try meanwhile; once released it becomes the version badge. */
export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => {
      const next = Date.now();
      setNow(next);
      if (isReleased(next)) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  if (isReleased(now)) {
    return (
      <a className="tag" href="https://github.com/tuvl-io/tuvl/blob/main/CHANGELOG.md" rel="noopener" target="_blank">
        <span className="tag-dot" aria-hidden="true" />{VERSION_TAG} · open source · MIT
      </a>
    );
  }
  const r = remaining(now);
  const cells = [['d', r.d], ['h', r.h], ['m', r.m], ['s', r.s]];
  return (
    <div className="countdown" role="timer" aria-label={`tuvl 2.0.0 releases on ${RELEASE_DAY}: ${plural(r.d, 'day')}, ${plural(r.h, 'hour')} and ${plural(r.m, 'minute')} to go`}>
      <div className="countdown-label">
        <b>2.0.0 lands {RELEASE_DAY}</b>
        <span>Public beta {BETA_VERSION} — try it now</span>
      </div>
      <div className="countdown-cells" aria-hidden="true">
        {cells.map(([unit, v]) => (
          <span className="cd-cell" key={unit}><b>{pad(v)}</b><i>{unit}</i></span>
        ))}
      </div>
    </div>
  );
}
