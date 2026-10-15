import EngineIcon from './EngineIcon.jsx';
import { useTheme } from '../hooks/useTheme.js';

/** Light / dark, reachable from the first screen. */
export default function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button className="theme-toggle" type="button" onClick={toggle}
      aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
      <EngineIcon name={next === 'light' ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
