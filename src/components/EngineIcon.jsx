const PATHS = {
  code: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  tool: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z'],
  decide: ['M6 3v12', 'M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 9a9 9 0 0 1-9 9'],
  llm: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 17v4', 'M17 19h4'],
  loop: ['M17 2l4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'M7 22l-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
  human: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
  route: ['M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z', 'M18 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z', 'M8 6h5a4 4 0 0 1 0 8h-2a4 4 0 0 0 0 8'],
  rewind: ['M3 12a9 9 0 1 0 3-6.7', 'M3 4v5h5', 'M12 8v4l3 2'],
  lock: ['M6 11h12v9H6z', 'M8 11V8a4 4 0 0 1 8 0v3'],
  spec: ['M6 3h9l4 4v14H6z', 'M14 3v5h5', 'M9 13h7', 'M9 17h5'],
  terminal: ['M4 5h16v14H4z', 'M8 10l3 2-3 2', 'M13 14h3'],
  yaml: ['M4 6h4', 'M4 12h8', 'M4 18h6', 'M14 6h6', 'M16 12h4', 'M13 18h7'],
  eye: ['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
  moon: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
};

export default function EngineIcon({ name, size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(PATHS[name] || []).map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
