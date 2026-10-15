import { useCallback, useEffect, useState } from 'react';

const KEY = 'tuvl.theme';
const systemDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

function stored() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

/** 'light' | 'dark'. Follows the system until the visitor picks one. */
export function useTheme() {
  const [theme, setTheme] = useState(() => stored() || (systemDark() ? 'dark' : 'light'));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
  }, [theme]);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const on = () => { if (!stored()) setTheme(mq.matches ? 'dark' : 'light'); };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch { /* storage blocked */ }
      return next;
    });
  }, []);
  return [theme, toggle];
}
