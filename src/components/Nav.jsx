import { useEffect, useState } from 'react';
import { docs } from '../data/version.js';
import { track } from '../lib/analytics.js';
import { GitHubMark } from './icons.jsx';
import Feather from './Feather.jsx';

export default function Nav() {
  // The hero carries the big logo; the header appears only once that logo has scrolled away,
  // so the landing view never shows two.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const lockup = document.querySelector('.lockup');
    if (!lockup || !('IntersectionObserver' in window)) {
      const onScroll = () => setShown(window.scrollY > 240);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const io = new IntersectionObserver(([entry]) => {
      setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(lockup);
    return () => io.disconnect();
  }, []);

  return (
    <header className={`nav${shown ? ' is-shown' : ''}`} aria-hidden={!shown} {...(shown ? {} : { inert: '' })}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="tuvl home">
          <span className="brand-mark" aria-hidden="true"><Feather small /></span>
          <span className="brand-name">tuvl</span>
          <span className="brand-ml" lang="ml" title="തൂവൽ — “feather” in Malayalam">തൂവൽ</span>
        </a>
        <nav className="nav-links" aria-label="Page">
          <a href="#pipeline">Idea to ship</a>
          <a href="#problem">Problem</a>
          <a href="#alignment">Spec to build</a>
          <a href="#agents">Insight</a>
          <a href="#faq">FAQ</a>
          <a href={docs('/why-tuvl/')}>Why tuvl</a>
          <a href={docs('/')}>Docs</a>
          <a href="https://hub.tuvl.io" rel="noopener" target="_blank">Hub</a>
        </nav>
        <div className="nav-actions">
          <a className="icon-link" href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank" aria-label="tuvl on GitHub">
            <GitHubMark size={20} />
          </a>
          <a className="btn btn-solid btn-sm" href="https://try.tuvl.online" rel="noopener" target="_blank"
            onClick={() => track('try_live', { location: 'nav' })}>Try it live</a>
        </div>
      </div>
    </header>
  );
}
