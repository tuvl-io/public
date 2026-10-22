import { docs } from '../data/version.js';
import Feather from './Feather.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="footer-brand" href="#top" aria-label="tuvl — back to top">
          <span className="brand-mark" aria-hidden="true"><Feather small /></span>
          <b>tuvl</b>
        </a>
        <span>Intelligent Workflows. Deterministic Execution. Apache 2.0 licensed.</span>
        <nav className="footer-links" aria-label="Footer">
          <a href={docs('/getting-started/quickstart')}>Quickstart</a>
          <a href={docs('/why-tuvl/')}>Why tuvl</a>
          <a href={docs('/security/iam')}>Security</a>
          <a href="https://nest.tuvl.io" rel="noopener" target="_blank">Nest</a>
          <a href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank">GitHub</a>
          <a href="https://discord.tuvl.io" rel="noopener" target="_blank">Discord</a>
          <a href="mailto:developer@tuvl.io">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
