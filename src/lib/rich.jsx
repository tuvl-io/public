/** `code` spans in plain strings. */
export function rich(text) {
  return String(text).split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part);
}
