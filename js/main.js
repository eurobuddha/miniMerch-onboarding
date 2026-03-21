/**
 * Main Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
  renderPlatformCards();
  initAnimations();
});

function renderPlatformCards() {
  const container = document.getElementById('platform-cards');
  if (!container) return;

  const platforms = PlatformDetector.getAllPlatforms();
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

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Close all others
        faqItems.forEach(i => i.classList.remove('open'));
        
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
