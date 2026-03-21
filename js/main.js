/**
 * Main Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', async function() {
  initFAQ();
  await checkNodeStatus();
  renderPlatformCards();
  initAnimations();
});

async function checkNodeStatus() {
  const statusCard = document.getElementById('node-status-card');
  const statusIcon = document.getElementById('node-status-icon');
  const statusTitle = document.getElementById('node-status-title');
  const statusSubtitle = document.getElementById('node-status-subtitle');
  const statusBody = document.getElementById('node-status-body');
  const primaryAction = document.getElementById('node-primary-action');
  const secondaryAction = document.getElementById('node-secondary-action');

  if (!statusCard) return;

  // Set checking state
  statusIcon.className = 'node-status-icon checking';
  statusIcon.innerHTML = '⏳';
  statusTitle.textContent = 'Checking for node...';
  statusSubtitle.textContent = 'Looking for Minima running on your device';
  statusBody.classList.remove('visible');

  try {
    const result = await NodeDetector.detect();

    if (result.status === 'ready') {
      // Node is running
      statusIcon.className = 'node-status-icon detected';
      statusIcon.innerHTML = '✓';
      statusTitle.textContent = 'Node Detected!';
      statusSubtitle.textContent = result.address 
        ? `${result.address.substring(0, 20)}...`
        : 'Connected to the Minima network';
      
      primaryAction.href = 'guides/mini-merch.html';
      primaryAction.textContent = 'Setup miniMerch';
      primaryAction.style.display = 'inline-flex';
      
      secondaryAction.href = 'guides/index.html';
      secondaryAction.textContent = 'View Guides';
      secondaryAction.style.display = 'inline-flex';
      
    } else if (result.status === 'syncing') {
      // Node is syncing
      statusIcon.className = 'node-status-icon checking';
      statusIcon.innerHTML = '🔄';
      statusTitle.textContent = 'Node Syncing...';
      statusSubtitle.textContent = 'Please wait for your node to fully sync';
      
      primaryAction.href = '#';
      primaryAction.textContent = 'Check Again';
      primaryAction.style.display = 'inline-flex';
      primaryAction.onclick = () => location.reload();
      
      secondaryAction.style.display = 'none';
      
    } else {
      // No node detected
      statusIcon.className = 'node-status-icon not-detected';
      statusIcon.innerHTML = '✗';
      statusTitle.textContent = 'No Node Detected';
      statusSubtitle.textContent = 'Install Minima to get started selling';
      
      primaryAction.href = '#platforms';
      primaryAction.textContent = 'Get Started';
      primaryAction.style.display = 'inline-flex';
      
      secondaryAction.href = 'guides/index.html';
      secondaryAction.textContent = 'View Setup Guides';
      secondaryAction.style.display = 'inline-flex';
    }

    statusBody.classList.add('visible');

  } catch (error) {
    console.error('Node detection error:', error);
    statusIcon.className = 'node-status-icon not-detected';
    statusIcon.innerHTML = '?';
    statusTitle.textContent = 'Unable to Check';
    statusSubtitle.textContent = 'There may be a browser restriction';
    statusBody.classList.add('visible');
  }
}

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
