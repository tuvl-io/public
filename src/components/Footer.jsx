import { docs } from '../data/version.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="bigmark" aria-hidden="true">
          <span className="bigmark-tile"><img src="/assets/feather-ink.png" alt="" /></span>
          <span className="bigmark-name">tuvl</span>
        </div>
      </div>
      <div className="wrap footer-inner">
        <span>tuvl — deterministic execution for AI workflows. MIT licensed.</span>
        <nav className="footer-links" aria-label="Footer">
          <a href={docs('/getting-started/quickstart')}>Quickstart</a>
          <a href={docs('/why-tuvl/')}>Why tuvl</a>
          <a href={docs('/security/iam')}>Security</a>
          <a href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank">GitHub</a>
          <a href="https://discord.tuvl.io" rel="noopener" target="_blank">Discord</a>
          <a href="mailto:developer@tuvl.io">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
