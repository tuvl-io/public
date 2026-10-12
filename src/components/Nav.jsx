import { useEffect, useState } from 'react';
import { docs } from '../data/version.js';
import { track } from '../lib/analytics.js';
import { GitHubMark } from './icons.jsx';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="tuvl home">
          <img src="/assets/logo.png" alt="" width="30" height="30" />
          <span className="brand-name">tuvl</span>
          <span className="brand-ml" lang="ml" title="തൂവൽ — “feather” in Malayalam">തൂവൽ</span>
        </a>
        <nav className="nav-links" aria-label="Page">
          <a href="#guarantees">Guarantees</a>
          <a href="#how-it-works">How it works</a>
          <a href="#agents">Insight</a>
          <a href={docs('/why-tuvl/')}>Why tuvl</a>
          <a href={docs('/')}>Docs</a>
        </nav>
        <div className="nav-actions">
          <a className="icon-link" href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank" aria-label="tuvl on GitHub">
            <GitHubMark size={20} />
          </a>
          <a className="btn btn-lime btn-sm" href="https://try.tuvl.online" rel="noopener" target="_blank"
            onClick={() => track('try_live', { location: 'nav' })}>Try it live</a>
        </div>
      </div>
    </header>
  );
}
