import { docs } from '../data/version.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="footer-brand" href="#top" aria-label="tuvl — back to top">
          <span className="brand-mark" aria-hidden="true"><span className="feather-mark" /></span>
          <b>tuvl</b>
        </a>
        <span>Deterministic execution for AI workflows. MIT licensed.</span>
        <nav className="footer-links" aria-label="Footer">
          <a href={docs('/getting-started/quickstart')}>Quickstart</a>
          <a href={docs('/why-tuvl/')}>Why tuvl</a>
          <a href={docs('/security/iam')}>Security</a>
          <a href="https://hub.tuvl.io" rel="noopener" target="_blank">Hub</a>
          <a href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank">GitHub</a>
          <a href="https://discord.tuvl.io" rel="noopener" target="_blank">Discord</a>
          <a href="mailto:developer@tuvl.io">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
