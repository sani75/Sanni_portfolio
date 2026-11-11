/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC
   Vanilla JavaScript for theme toggle, mobile navigation, project filtering,
   smooth scrolling spy, modal previews, and contact form handling.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initSmoothScrollSpy();
  initProjectFilters();
  initProjectModals();
  initContactForm();
  initCopyEmail();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light) with LocalStorage
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) return savedTheme;
    } catch (e) {
      // localStorage not accessible
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {}
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileMenuBtn || !navMenu) return;

  function toggleMenu(open) {
    const isExpanded = open !== undefined ? open : mobileMenuBtn.getAttribute('aria-expanded') !== 'true';
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    if (isExpanded) {
      navMenu.classList.add('active');
    } else {
      navMenu.classList.remove('active');
    }
  }

  mobileMenuBtn.addEventListener('click', () => {
    toggleMenu();
  });

  // Close menu when clicking on any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Smooth Scroll Spy & Active Nav Highlight
   -------------------------------------------------------------------------- */
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!window.IntersectionObserver) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Project Modals & Live Demo Previews
   -------------------------------------------------------------------------- */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalDemo = document.getElementById('modal-demo');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const demoButtons = document.querySelectorAll('.btn-demo');

  if (!modal) return;

  const demoData = {
    'cloudpulse': {
      title: 'CloudPulse — Telemetry & Metrics Simulator',
      desc: 'Interactive live telemetry simulation demonstrating CPU, memory usage, request throughput, and real-time alerts built with plain JavaScript.',
      render: () => `
        <div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <strong>System Status: <span style="color: var(--success);">HEALTHY (99.98% Uptime)</span></strong>
            <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted);">Region: us-east-1</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center; margin-bottom: 1rem;">
            <div style="padding: 0.5rem; background: var(--bg-secondary); border-radius: 6px;">
              <div style="font-size: 0.75rem; color: var(--text-muted);">CPU Utilization</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-primary);" id="demo-cpu">42%</div>
            </div>
            <div style="padding: 0.5rem; background: var(--bg-secondary); border-radius: 6px;">
              <div style="font-size: 0.75rem; color: var(--text-muted);">RAM In Use</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: #8b5cf6;" id="demo-ram">3.4 GB</div>
            </div>
            <div style="padding: 0.5rem; background: var(--bg-secondary); border-radius: 6px;">
              <div style="font-size: 0.75rem; color: var(--text-muted);">Active Requests</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--success);" id="demo-req">1,240/s</div>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Tip: This simulation uses native JavaScript state manipulation to update metrics in real-time.</p>
        </div>
      `
    },
    'flowboard': {
      title: 'FlowBoard — Interactive Task Organizer',
      desc: 'Interactive agile Kanban board interface with instant task creation and category tracking.',
      render: () => `
        <div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--border-color);">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <input type="text" id="flowboard-input" placeholder="Type a new task and press Add..." style="flex: 1; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-secondary); color: var(--text-primary);">
            <button id="flowboard-add-btn" class="btn btn-primary btn-sm">Add Task</button>
          </div>
          <ul id="flowboard-list" style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
            <li style="padding: 0.5rem 0.75rem; background: var(--bg-secondary); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
              <span>🚀 Finish internship portfolio deployment</span>
              <span style="font-size: 0.75rem; background: var(--success-bg); color: var(--success); padding: 2px 6px; border-radius: 4px;">Ready</span>
            </li>
            <li style="padding: 0.5rem 0.75rem; background: var(--bg-secondary); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
              <span>💻 Review semantic HTML & CSS grid responsiveness</span>
              <span style="font-size: 0.75rem; background: var(--accent-light); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px;">Done</span>
            </li>
          </ul>
        </div>
      `
    },
    'nexusmarket': {
      title: 'NexusMarket — Mini Storefront & Cart',
      desc: 'Client-side product catalog with instant price calculation and interactive cart drawer.',
      render: () => `
        <div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <strong>Featured Gadgets</strong>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-primary);">Cart Items: <span id="cart-count">0</span></span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: var(--bg-secondary); border-radius: 6px;">
              <span>🎧 Studio Noise-Canceling Headphones ($149)</span>
              <button class="btn btn-secondary btn-sm cart-add-btn" data-item="Headphones">Add to Cart</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: var(--bg-secondary); border-radius: 6px;">
              <span>⌚ Smart Health Watch Ultra ($199)</span>
              <button class="btn btn-secondary btn-sm cart-add-btn" data-item="Smart Watch">Add to Cart</button>
            </div>
          </div>
        </div>
      `
    }
  };

  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = demoData[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalDemo.innerHTML = data.render();
      modal.classList.add('active');

      // Setup specific demo listeners
      if (projectId === 'flowboard') {
        const addBtn = document.getElementById('flowboard-add-btn');
        const input = document.getElementById('flowboard-input');
        const list = document.getElementById('flowboard-list');
        if (addBtn && input && list) {
          addBtn.addEventListener('click', () => {
            const val = input.value.trim();
            if (val) {
              const li = document.createElement('li');
              li.style.cssText = "padding: 0.5rem 0.75rem; background: var(--bg-secondary); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;";
              li.innerHTML = `<span>⚡ ${val}</span><span style="font-size: 0.75rem; background: var(--accent-light); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px;">New</span>`;
              list.appendChild(li);
              input.value = '';
            }
          });
        }
      } else if (projectId === 'nexusmarket') {
        const cartBtns = modalDemo.querySelectorAll('.cart-add-btn');
        const countSpan = document.getElementById('cart-count');
        let count = 0;
        cartBtns.forEach(cBtn => {
          cBtn.addEventListener('click', () => {
            count++;
            if (countSpan) countSpan.textContent = count;
            cBtn.textContent = 'Added ✓';
            setTimeout(() => { cBtn.textContent = 'Add to Cart'; }, 1000);
          });
        });
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!form) return;

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Simple validation helper
    function validateField(input, condition) {
      const group = input.closest('.form-group');
      if (!condition) {
        if (group) group.classList.add('has-error');
        isValid = false;
      } else {
        if (group) group.classList.remove('has-error');
      }
    }

    if (nameInput) validateField(nameInput, nameInput.value.trim().length >= 2);
    if (emailInput) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(emailInput, emailPattern.test(emailInput.value.trim()));
    }
    if (subjectInput) validateField(subjectInput, subjectInput.value.trim().length >= 3);
    if (messageInput) validateField(messageInput, messageInput.value.trim().length >= 10);

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        showToast('Thank you! Your message has been sent successfully.');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }, 600);
    }
  });
}

/* --------------------------------------------------------------------------
   7. Copy Email Helper
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'Sannikumarkhg2002@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    let copied = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        copied = true;
        updateBtnState();
      }).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      try {
        const temp = document.createElement('textarea');
        temp.value = emailText;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copied = true;
        updateBtnState();
      } catch (err) {}
    }

    function updateBtnState() {
      copyBtn.textContent = 'Copied! ✓';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Email';
      }, 2000);
    }
  });
}

/* --------------------------------------------------------------------------
   8. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}