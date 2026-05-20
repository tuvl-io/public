// tuvl Portal — Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
    initStepTabs();
    initWorkflowTabs();
    initWorkflowCodeTabs();
    initNavReveal();
    initAnalytics();
});

/**
 * 3-Step "Get Started" tabs
 */
function initStepTabs() {
    const tabs  = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.code-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = tab.dataset.step;
            tabs.forEach(t  => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(`pane-${step}`);
            if (target) target.classList.add('active');
        });
    });
}

/**
 * Workflow showcase — functional vs agentic toggle
 */
function initWorkflowTabs() {
    const wfTabs   = document.querySelectorAll('.wf-tab');
    const wfPanels = document.querySelectorAll('.wf-panel');

    wfTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.wf;
            wfTabs.forEach(t   => t.classList.remove('active'));
            wfPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(`wf-${target}`);
            if (panel) panel.classList.add('active');
        });
    });
}

/**
 * Workflow inner code tabs (workflow.yaml / nodes/*.py)
 * Works for both functional and agentic panels independently.
 */
function initWorkflowCodeTabs() {
    const wfCodeTabs = document.querySelectorAll('.wf-code-tab');

    wfCodeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const subId  = tab.dataset.sub;
            // Scope to the nearest .wf-code-window
            const window = tab.closest('.wf-code-window');
            if (!window) return;

            window.querySelectorAll('.wf-code-tab').forEach(t  => t.classList.remove('active'));
            window.querySelectorAll('.wf-code-pane').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const pane = document.getElementById(`wc-${subId}`);
            if (pane) pane.classList.add('active');
        });
    });
}

/**
 * GA4 event tracking
 */
function initAnalytics() {
    if (typeof gtag !== 'function') return;

    // Outbound link tracking — docs and GitHub
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const isDocs   = href.includes('tuvl.dev');
        const isGitHub = href.includes('github.com');
        if (!isDocs && !isGitHub) return;

        link.addEventListener('click', () => {
            gtag('event', 'outbound_click', {
                destination:  isDocs ? 'docs' : 'github',
                link_url:     href,
                link_text:    link.textContent.trim() || link.getAttribute('aria-label') || href,
            });
        });
    });

    // CTA button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const label = btn.textContent.trim() || btn.getAttribute('aria-label') || 'unknown';
            const href  = btn.getAttribute('href') || '';
            gtag('event', 'cta_click', { cta_label: label, cta_href: href });
        });
    });

    // Nav link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'nav_click', { nav_label: link.textContent.trim() });
        });
    });

    // Scroll depth milestones (25 / 50 / 75 / 100%)
    const milestones = new Set();
    window.addEventListener('scroll', () => {
        const pct = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        [25, 50, 75, 100].forEach(m => {
            if (pct >= m && !milestones.has(m)) {
                milestones.add(m);
                gtag('event', 'scroll_depth', { depth_percent: m });
            }
        });
    }, { passive: true });
}

/**
 * Early Access signup — submits to Formspree.
 * Replace YOUR_EARLYACCESS_FORM_ID in index.html with your real Formspree form ID.
 */
function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const btn  = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled    = true;
    btn.textContent = 'Joining...';

    const formId = form.querySelector('[name="_formspree_id"]')?.value;
    const email  = form.querySelector('[name="email"]')?.value;

    fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(() => {
        if (typeof gtag === 'function') gtag('event', 'early_access_signup', { form: 'newsletter' });
        btn.textContent      = '✓ You\'re on the list!';
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        setTimeout(() => {
            form.reset();
            btn.disabled         = false;
            btn.textContent      = originalText;
            btn.style.background = '';
        }, 3500);
    })
    .catch(() => {
        btn.disabled    = false;
        btn.textContent = 'Try again';
        setTimeout(() => { btn.textContent = originalText; }, 2500);
    });
}

/**
 * Contact form — submits to Formspree.
 * Replace YOUR_FORM_ID in index.html with your real Formspree form ID.
 */
function handleContact(event) {
    event.preventDefault();
    const form    = event.target;
    const btn     = document.getElementById('contactBtn');
    const success = document.getElementById('contactSuccess');
    const formId  = form.querySelector('[name="_formspree_id"]')?.value;

    btn.disabled    = true;
    btn.textContent = 'Sending...';

    const data = {
        name:         form.querySelector('[name="name"]')?.value,
        email:        form.querySelector('[name="email"]')?.value,
        enquiry_type: form.querySelector('[name="enquiry_type"]')?.value,
        message:      form.querySelector('[name="message"]')?.value,
    };

    fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(() => {
        if (typeof gtag === 'function') gtag('event', 'contact_form_submit', { enquiry_type: data.enquiry_type });
        form.style.display    = 'none';
        success.style.display = 'flex';
    })
    .catch(() => {
        btn.disabled    = false;
        btn.textContent = 'Send Message';
        btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
        setTimeout(() => { btn.style.background = ''; }, 2500);
    });
}

// Console branding
console.log(
    '%ctuvl  %c// Featherlight AI Workflows',
    'color: #8b5cf6; font-size: 20px; font-weight: 900; font-family: monospace;',
    'color: #6b7280; font-size: 13px; font-family: monospace;'
);

/**
 * Reveal nav when the hero brand mark scrolls out of view.
 * Uses IntersectionObserver for performance — no scroll event polling.
 */
function initNavReveal() {
    const nav   = document.querySelector('.nav');
    const brand = document.querySelector('.hero-brand');
    if (!nav || !brand) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                nav.classList.remove('nav--visible');
            } else {
                nav.classList.add('nav--visible');
            }
        },
        { threshold: 0 }
    );

    observer.observe(brand);
}
