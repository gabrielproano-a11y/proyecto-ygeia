/**
 * YGEIA — SCRIPT.JS
 * Consultorio Médico & Estético
 * Interactions: Navbar, Particles, Counters, Flip Cards,
 *               Scroll Reveal, Mobile Menu, Form, Back-to-top
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
============================================================ */
function debounce(fn, wait = 20) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

/* ============================================================
   NAVBAR — SCROLL EFFECT + MOBILE MENU
============================================================ */
(function initNavbar() {
    const navbar      = document.getElementById('navbar');
    const menuToggle  = document.getElementById('menuToggle');
    const mobileMenu  = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link, .mobile-cta');

    // Scroll → add 'scrolled' class
    const onScroll = debounce(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu toggle
    function toggleMenu(open) {
        mobileMenu.classList.toggle('open', open);
        menuToggle.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        toggleMenu(!isOpen);
    });

    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
})();

/* ============================================================
   SMOOTH SCROLL — All anchor links
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ============================================================
   PARTICLE SYSTEM
============================================================ */
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const COUNT = 50;

    for (let i = 0; i < COUNT; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left              = `${Math.random() * 100}%`;
        p.style.top               = `${Math.random() * 100}%`;
        p.style.width             = `${2 + Math.random() * 3}px`;
        p.style.height            = p.style.width;
        p.style.animationDelay    = `${Math.random() * 20}s`;
        p.style.animationDuration = `${15 + Math.random() * 15}s`;
        container.appendChild(p);
    }
})();

/* ============================================================
   ANIMATED COUNTER
============================================================ */
function animateCounter(el, target, duration = 1800) {
    let start = null;
    const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        // Ease out quart
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
}

/* ============================================================
   INTERSECTION OBSERVER — Scroll reveal + Counter trigger
============================================================ */
(function initObservers() {

    // ---- Reveal sections / cards ----
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Stagger for .reveal-card siblings
                if (el.classList.contains('reveal-card')) {
                    const siblings = [...el.parentElement.children].filter(c =>
                        c.classList.contains('reveal-card')
                    );
                    const index = siblings.indexOf(el);
                    el.style.transitionDelay = `${index * 0.1}s`;
                }
                el.classList.add('visible');
                revealObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal-section, .reveal-card').forEach(el => {
        revealObserver.observe(el);
    });

    // ---- Counters ----
    const countersDone = new WeakSet();

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersDone.has(entry.target)) {
                countersDone.add(entry.target);
                const el     = entry.target;
                const target = parseInt(el.dataset.target, 10);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => {
        counterObserver.observe(el);
    });
})();

/* ============================================================
   FLIP CARDS — Touch / Click toggle on mobile
============================================================ */
(function initFlipCards() {
    const cards = document.querySelectorAll('.service-card-flip');

    // Detect touch device
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (isTouch) {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Close any other open cards first
                cards.forEach(other => {
                    if (other !== card) other.classList.remove('flipped');
                });
                card.classList.toggle('flipped');
            });
        });

        // Close on outside tap
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.service-card-flip')) {
                cards.forEach(c => c.classList.remove('flipped'));
            }
        });
    }
})();

/* ============================================================
   BACK TO TOP
============================================================ */
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const onScroll = debounce(() => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, 15);

    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ============================================================
   CONTACT FORM — Submit handler → n8n Webhook
============================================================ */
(function initForm() {
    const WEBHOOK_URL = 'https://practiceac.app.n8n.cloud/webhook/b30f5799-1996-47ed-aedf-c867aaa415dc';

    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const btn     = document.getElementById('submitBtn');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Loading state
        const originalHTML = btn.innerHTML;
        btn.innerHTML = 'Enviando... <span style="opacity:0.7">⏳</span>';
        btn.disabled = true;

        // Collect all form data
        const payload = {
            nombre:   form.nombre.value.trim(),
            email:    form.email.value.trim(),
            telefono: form.telefono.value.trim(),
            servicio: form.servicio.value,
            mensaje:  form.mensaje.value.trim(),
            fecha:    new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' }),
            origen:   'Formulario Web — Ygeia'
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload)
            });

            if (response.ok || response.status === 200) {
                // Success
                form.style.display = 'none';
                success.style.display = 'block';
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (err) {
            console.error('Error al enviar al webhook:', err);
            // Restore button and show error
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.background = 'linear-gradient(135deg, #7f1d1d, #dc2626)';
            btn.textContent = '⚠️ Error al enviar — Intenta de nuevo';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 3500);
        }
    });
})();

/* ============================================================
   PARALLAX — Subtle hero blob movement on mouse
============================================================ */
(function initParallax() {
    const blob = document.querySelector('.hero-bg-blob');
    if (!blob) return;

    // Only on desktop (non-touch)
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', debounce((e) => {
            const x = (e.clientX / window.innerWidth  - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        }, 16));
    }
})();

/* ============================================================
   ACTIVE NAV LINK — Highlight based on scroll position
============================================================ */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const onScroll = debounce(() => {
        const navH = document.getElementById('navbar').offsetHeight + 30;
        let current = '';

        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            if (top <= navH) current = sec.id;
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary-300)';
            }
        });
    }, 20);

    window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ============================================================
   FORM INPUT — Floating label / focus ring polish
============================================================ */
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
    .forEach(el => {
        el.addEventListener('focus', () => {
            el.parentElement.classList.add('focused');
        });
        el.addEventListener('blur', () => {
            el.parentElement.classList.remove('focused');
        });
    });

/* ============================================================
   INITIALIZE ON DOM READY
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🏥 Ygeia — Consultorio Médico & Estético cargado con éxito ✨', 
        'color: #03a0a0; font-size: 14px; font-weight: bold;');
});
