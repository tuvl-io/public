// tuvl Portal — Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
    initStepTabs();
    initWorkflowTabs();
    initWorkflowCodeTabs();
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
 * Waitlist signup handler
 */
function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const btn  = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled    = true;
    btn.textContent = 'Joining...';

    // Simulate async submission
    setTimeout(() => {
        btn.textContent      = '✓ You\'re on the list!';
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

        setTimeout(() => {
            form.reset();
            btn.disabled         = false;
            btn.textContent      = originalText;
            btn.style.background = '';
        }, 3500);
    }, 1000);
}

// Console branding
console.log(
    '%ctuvl  %c// Featherlight AI Workflows',
    'color: #8b5cf6; font-size: 20px; font-weight: 900; font-family: monospace;',
    'color: #6b7280; font-size: 13px; font-family: monospace;'
);

