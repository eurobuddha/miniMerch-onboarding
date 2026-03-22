/**
 * miniMerch — Main JS
 * Handles: hamburger nav, FAQ accordion, platform cards, scroll animations
 */

document.addEventListener('DOMContentLoaded', function() {
  initHamburger();
  initFAQ();
  renderPlatformCards();
  initAnimations();
});

/* ── Hamburger nav drawer ──────────────────────────────────── */
function initHamburger() {
  const toggle  = document.querySelector('.nav-toggle');
  const drawer  = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !drawer) return;

  function openNav() {
    toggle.classList.add('open');
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeNav() {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    toggle.classList.contains('open') ? closeNav() : openNav();
  });

  // Close on overlay click
  if (overlay) overlay.addEventListener('click', closeNav);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close when a nav link is tapped (drawer navigates away)
  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close if viewport grows past the mobile breakpoint while drawer is open
  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', (e) => { if (e.matches) closeNav(); });
}

/* ── FAQ accordion ─────────────────────────────────────────── */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    // Set initial aria state
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── Platform cards (landing page) ────────────────────────── */
function renderPlatformCards() {
  const container = document.getElementById('platform-cards');
  if (!container) return;

  const platforms  = PlatformDetector.getAllPlatforms();
  const detectedOS = PlatformDetector.getOS();

  container.innerHTML = platforms.map(platform => {
    const isRecommended = platform.id === detectedOS;
    return `
      <a href="${platform.downloadUrl}" target="_blank" rel="noopener" class="platform-card">
        <span class="platform-icon">${platform.icon}</span>
        <div>
          <div class="platform-name">
            ${platform.name}
            ${isRecommended ? '<span style="color: var(--color-primary); margin-left: 8px;">★</span>' : ''}
          </div>
          <div class="platform-label">${platform.badge}</div>
        </div>
      </a>
    `;
  }).join('');
}

/* ── Scroll animations ─────────────────────────────────────── */
function initAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}
