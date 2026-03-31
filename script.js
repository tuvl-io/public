// tuvl Portal - Interactive scripts

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initScrollAnimations();
});

// Tab switching for code preview
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const codeBlocks = document.querySelectorAll('.code-block');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            
            // Update tab states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update code block visibility
            codeBlocks.forEach(block => {
                block.classList.remove('active');
                if (block.id === targetId) {
                    block.classList.add('active');
                }
            });
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe stats
    document.querySelectorAll('.stat').forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(stat);
    });
}

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Newsletter form handler
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<span>Sending...</span>';
    button.disabled = true;
    
    // Simulate API call (replace with actual endpoint)
    setTimeout(() => {
        // Success state
        button.innerHTML = '<span>✓ You\'re on the list!</span>';
        button.style.background = '#4caf50';
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            form.reset();
        }, 3000);
        
        // Log for now (replace with actual API call)
        console.log('Newsletter signup:', email);
    }, 1000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to orbs on mouse move
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Console easter egg
console.log(`
%c ████████╗██╗   ██╗██╗   ██╗██╗     
%c ╚══██╔══╝██║   ██║██║   ██║██║     
%c    ██║   ██║   ██║██║   ██║██║     
%c    ██║   ██║   ██║╚██╗ ██╔╝██║     
%c    ██║   ╚██████╔╝ ╚████╔╝ ███████╗
%c    ╚═╝    ╚═════╝   ╚═══╝  ╚══════╝
                                      
%c Featherlight workflow orchestration
%c https://github.com/tuvl/tuvl
`, 
'color: #673ab7; font-weight: bold;',
'color: #7e57c2; font-weight: bold;',
'color: #9575cd; font-weight: bold;',
'color: #b39ddb; font-weight: bold;',
'color: #d1c4e9; font-weight: bold;',
'color: #ede7f6; font-weight: bold;',
'color: #ffc107; font-weight: bold;',
'color: #888;'
);
