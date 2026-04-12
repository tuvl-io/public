// tuvl Teaser — minimal interactive logic

document.addEventListener('DOMContentLoaded', () => {
    animateContrast();
});

/**
 * Stagger the contrast column items in on scroll
 */
function animateContrast() {
    if (!('IntersectionObserver' in window)) return;

    const items = document.querySelectorAll(
        '.vibe-block, .flow-step, .flow-arrow-down, .chaos-tags, .control-tags'
    );
    items.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    items.forEach(el => observer.observe(el));
}

/**
 * Waitlist form
 */
function handleWaitlist(event) {
    event.preventDefault();
    const form = event.target;
    const btn  = form.querySelector('.wl-btn');

    btn.disabled    = true;
    btn.textContent = 'Joining...';

    setTimeout(() => {
        btn.textContent      = '✓ You\'re on the list!';
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

        setTimeout(() => {
            form.reset();
            btn.disabled         = false;
            btn.textContent      = 'Secure My Spot';
            btn.style.background = '';
        }, 4000);
    }, 900);
}

console.log(
    '%ctuvl  %c// Something featherlight is coming.',
    'color: #8b5cf6; font-size: 18px; font-weight: 900; font-family: monospace;',
    'color: #6b7280; font-size: 12px; font-family: monospace;'
);
