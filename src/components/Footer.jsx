import { docs } from '../data/version.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img alt="" className="footer-logo" src="/assets/logo.png" />
          <div>
            <div className="footer-name">tuvl <span className="footer-mal">തൂവൽ</span></div>
            <div className="footer-tag">Featherlight AI workflows.</div>
          </div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h6>Product</h6>
            <a href="#insight">Insight portal</a>
            <a href="#features">Features</a>
            <a href="#workflows">Workflows</a>
            <a href="#sdk">SDK</a>
          </div>
          <div className="footer-col">
            <h6>Docs</h6>
            <a href={docs('/getting-started/quickstart')} rel="noopener" target="_blank">Quickstart</a>
            <a href={docs('/concepts/architecture')} rel="noopener" target="_blank">Architecture</a>
            <a href={docs('/security/iam')} rel="noopener" target="_blank">Security &amp; IAM</a>
            <a href={docs('/insight/overview')} rel="noopener" target="_blank">Insight guide</a>
          </div>
          <div className="footer-col">
            <h6>Community</h6>
            <a href="https://github.com/tuvl-io/tuvl" rel="noopener" target="_blank">GitHub</a>
            <a href="https://discord.gg/tuvl" rel="noopener" target="_blank">Discord</a>
            <a href="mailto:developer@tuvl.io">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 tuvl · MIT licensed</span>
        <span className="footer-pron">/ˈtuːvəl/ · തൂവൽ · feather</span>
      </div>
    </footer>
  );
}
