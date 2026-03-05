// ═══════════════════════════════════════════════════════════
// ARYAN CHAVHAN PORTFOLIO - PROPERLY FIXED
// ═══════════════════════════════════════════════════════════

// ─── MOBILE MENU ───────────────────────────────
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}

// ─── STICKY HEADER + ACTIVE NAV ────────────────
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header   = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    sections.forEach(sec => {
        const top    = window.scrollY;
        const offset = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id     = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`header nav a[href*="${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

// ─── STATS COUNTER ANIMATION ───────────────────
function formatNumber(num, target) {
    if (target >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (target >= 1000)    return (num / 1000).toFixed(0) + 'K+';
    if (target === 100)    return Math.floor(num) + '%';
    return Math.floor(num) + '+';
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const steps  = 60;
    const inc    = target / steps;
    let current  = 0, step = 0;

    const timer = setInterval(() => {
        step++;
        current += inc;
        if (step >= steps) {
            el.textContent = formatNumber(target, target);
            clearInterval(timer);
        } else {
            el.textContent = formatNumber(Math.floor(current), target);
        }
    }, 2000 / steps);
}

window.addEventListener('load', () => {
    let countersStarted = false;
    const statsBar = document.querySelector('.stats-bar');

    if (statsBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    setTimeout(() => {
                        document.querySelectorAll('.stat-number').forEach(el => {
                            animateCounter(el);
                        });
                    }, 600);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsBar);
    }
});

// ─── SCROLL REVEAL ANIMATIONS ──────────────────
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({ 
        distance: '60px', 
        duration: 1200, 
        delay: 100, 
        reset: false 
    });

    ScrollReveal().reveal('.home-content', { origin: 'left', delay: 200 });
    ScrollReveal().reveal('.home-img', { origin: 'right', delay: 200 });
    ScrollReveal().reveal('.heading', { origin: 'top' });
    ScrollReveal().reveal('.about-img', { origin: 'left' });
    ScrollReveal().reveal('.about-content', { origin: 'right' });
    
    ScrollReveal().reveal('.services-box', { 
        origin: 'bottom', 
        interval: 200, 
        distance: '50px' 
    });
    
    ScrollReveal().reveal('.stat-item', { 
        origin: 'bottom', 
        interval: 150,
        distance: '50px',
        delay: 200,
        duration: 1200
    });

    ScrollReveal().reveal('.stat-divider', { 
        origin: 'bottom', 
        distance: '20px',
        delay: 300,
        interval: 150
    });
    
    ScrollReveal().reveal('.portfolio-tab-card', { 
        origin: 'bottom', 
        interval: 150, 
        distance: '40px' 
    });
    
    ScrollReveal().reveal('.portfolio-box', { 
        origin: 'bottom', 
        interval: 150, 
        distance: '40px' 
    });
    
    ScrollReveal().reveal('.contact form', { 
        origin: 'bottom', 
        distance: '40px' 
    });
}

// ─── TYPED.JS ──────────────────────────────────
if (typeof Typed !== 'undefined') {
    const typedElement = document.querySelector('.multiple-text');
    if (typedElement) {
        const typed = new Typed('.multiple-text', {
            strings: [
                'Hook-Based Short-Form Editor',
                'High-Retention Reels & Shorts',
                'YouTube Shorts Specialist',
                '1.9M+ Subscriber Experience'
            ],
            typeSpeed: 75,
            backSpeed: 55,
            backDelay: 1800,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// ─── PORTFOLIO TABS FUNCTIONALITY ──────────────
document.addEventListener('DOMContentLoaded', () => {
    const tabCards = document.querySelectorAll('.portfolio-tab-card');
    const contentAreas = document.querySelectorAll('.portfolio-content');

    tabCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetTab = card.getAttribute('data-tab');
            
            // Remove active class from all cards
            tabCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            card.classList.add('active');
            
            // Hide all content areas
            contentAreas.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show target content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
});

// ─── SMOOTH SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ─── CONTACT FORM - EMAILJS ────────────────────
const EMAILJS_SERVICE_ID  = 'service_aubtu3r';
const EMAILJS_TEMPLATE_ID = 'template_qmtzim8';
const EMAILJS_PUBLIC_KEY  = 'jTYc4B5900yg4toK3';

(function() {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = () => {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS initialized!');
    };
    document.head.appendChild(s);
})();

const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const successMsg  = document.getElementById('form-success');
const errorMsg    = document.getElementById('form-error');

function showMsg(el, ms=5000) {
    if (el) {
        el.style.display='block';
        setTimeout(()=>{ el.style.display='none'; }, ms);
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name    = document.getElementById('inp-name').value.trim();
        const email   = document.getElementById('inp-email').value.trim();
        const mobile  = document.getElementById('inp-mobile').value.trim();
        const subject = document.getElementById('inp-subject').value.trim();
        const message = document.getElementById('inp-message').value.trim();

        if (!name || !email || !message || !subject) {
            alert('Please fill in all required fields.'); 
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.'); 
            return;
        }

        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: name, 
                from_email: email,
                phone: mobile, 
                subject: subject,
                message: message
            });
            
            console.log('✅ Email sent!');
            showMsg(successMsg);
            contactForm.reset();
            
        } catch(err) {
            console.error('❌ Error:', err);
            showMsg(errorMsg);
            
        } finally {
            if (submitBtn) {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        }
    });
}

// ─── PORTFOLIO TOUCH SUPPORT ───────────────────
document.querySelectorAll('.portfolio-box').forEach(box => {
    box.addEventListener('touchstart', function() {
        this.classList.toggle('touch-hover');
    }, { passive: true });
});

// ─── PAGE LOAD FADE IN ─────────────────────────
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.6s ease-in';
        document.body.style.opacity = '1';
    });
});

console.log('✅ Portfolio loaded - Tabs working perfectly!');