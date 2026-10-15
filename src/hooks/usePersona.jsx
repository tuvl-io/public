import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'tuvl.persona';
const Ctx = createContext({ persona: 'dev', setPersona: () => {}, t: (dev) => dev });

function stored() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'pm' || v === 'dev' ? v : null;
  } catch { return null; }
}

/** Who is reading: 'dev' or 'pm'. The pitch changes its emphasis, never its claims. */
export function PersonaProvider({ children }) {
  const [persona, setPersonaState] = useState(() => stored() || 'dev');
  useEffect(() => { document.documentElement.dataset.persona = persona; }, [persona]);
  const setPersona = useCallback((p) => {
    setPersonaState(p);
    try { localStorage.setItem(KEY, p); } catch { /* storage blocked */ }
  }, []);
  const value = useMemo(() => ({ persona, setPersona, t: (dev, pm) => (persona === 'pm' ? pm : dev) }), [persona, setPersona]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePersona = () => useContext(Ctx);
