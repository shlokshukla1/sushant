/**
 * SUSHAN PORTFOLIO - MODERN INTERACTIVE JAVASCRIPT
 * Features:
 * - Canvas Constellation & Particle Background
 * - Typing Text Effect
 * - Interactive Cursor Glow
 * - Metric Counters Animation
 * - Skills & Projects Filter Tabs
 * - Dynamic Project Case Study Modal
 * - Full CV Modal & Printable PDF Trigger
 * - Contact Form Handler & Toast Notification
 * - Intersection Observer for Active Nav & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. CONSTANT DATA: PROJECT DETAILS FOR MODAL
     ========================================================================== */
  const projectsData = {
    1: {
      title: 'Nexus AI: Autonomous Workflow Orchestrator',
      category: 'AI Automation & Full Stack',
      image: 'assets/project1.jpg',
      overview: 'Nexus AI is a mission-critical platform designed to deploy autonomous task-oriented agent clusters. It enables organizations to streamline complex business workflows, monitor multi-step algorithmic reasoning in real time, and audit execution with sub-millisecond precision.',
      challenges: 'Handling concurrent WebSocket streams for thousands of autonomous subagent steps while maintaining zero UI stutter and instant state persistence.',
      solution: 'Architected a decoupled event bus utilizing FastAPI on Python for high-performance agent dispatch, backed by Redis queues and a reactive Next.js client interface with custom virtualized telemetry boards.',
      features: [
        'Real-time WebSocket event streaming with automatic reconnect logic',
        'Intuitive node-based DAG workflow visualizer with drag-and-drop orchestration',
        'Automated task fallback and agent self-healing loops',
        'Exportable compliance audit logs and efficiency metric heatmaps'
      ],
      stack: ['Next.js', 'Python FastAPI', 'WebSockets', 'Tailwind CSS', 'Docker', 'PostgreSQL'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    2: {
      title: 'Cryptonix: Real-Time DeFi Portfolio Tracker',
      category: 'Web3 & Financial Analytics',
      image: 'assets/project2.jpg',
      overview: 'A decentralized finance trading dashboard engineered for high-frequency crypto traders. It aggregates data across multiple Ethereum & Polygon automated market makers to display sub-second price changes, liquidity health, and cross-chain wallet balances.',
      challenges: 'Overcoming RPC rate limits and high latency when querying blockchain contract states across diverse chains.',
      solution: 'Built an optimized client-side caching tier with Ethers.js and Chart.js candlestick renderers, accompanied by web workers for processing historical time-series datasets off the main thread.',
      features: [
        'Live candlestick chart visualizations with multi-timeframe indicators',
        'Instant multi-chain wallet connection (MetaMask, WalletConnect)',
        'Gas fee volatility meter and slippage protection recommendations',
        'Automated P&L calculation across DeFi yield farms and LP positions'
      ],
      stack: ['React', 'Ethers.js', 'Chart.js', 'Tailwind CSS', 'Alchemy API', 'Vite'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    3: {
      title: 'DevSphere: Real-Time Code Collaboration Suite',
      category: 'Full Stack & Developer Tools',
      image: 'assets/project3.jpg',
      overview: 'A browser-based cloud IDE built for distributed remote engineering teams. DevSphere features low-latency operational transformation (OT) code editing, integrated bash terminal access, and team audio/video channels.',
      challenges: 'Guaranteeing deterministic concurrent text synchronization without merge conflicts or race conditions during multi-developer typing bursts.',
      solution: 'Implemented operational transformation algorithms via Socket.io channels, paired with Microsoft Monaco Editor for an authentic VS Code development feel.',
      features: [
        'Simultaneous collaborative coding with live user cursors and presence tags',
        'Syntax highlighting support for 40+ programming languages',
        'Built-in sandbox terminal environment with live container execution',
        'One-click GitHub pull request creation and branch switching'
      ],
      stack: ['Node.js', 'Socket.io', 'Monaco Editor', 'MongoDB', 'Docker', 'Express'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    4: {
      title: 'AuraStore: Cyber-Themed Headless Storefront',
      category: 'Creative E-Commerce & UI/UX',
      image: 'assets/project4.jpg',
      overview: 'An avant-garde e-commerce storefront tailored for next-generation tech gadgets and apparel. AuraStore focuses on delightful micro-interactions, near-zero load times, and an immersive dark cyberpunk aesthetic.',
      challenges: 'Delivering silky-smooth 60fps animations, floating cart transitions, and complex interactive filtering without dragging down mobile performance.',
      solution: 'Crafted with lightweight Vanilla JavaScript and pure CSS hardware-accelerated transforms, minimizing external bundle dependencies and scoring 99 on Google PageSpeed.',
      features: [
        'Instant slide-over shopping bag with real-time stock verification',
        'Interactive dark/light contrast modes with glowing accent states',
        'Integrated Stripe Payment Intent checkout workflow',
        'Granular product filter by tech category, price slider, and colorway'
      ],
      stack: ['Vanilla JavaScript', 'Modern CSS3', 'Stripe API', 'Express.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://example.com'
    }
  };

  /* ==========================================================================
     2. AMBIENT PARTICLE & CONSTELLATION BACKGROUND CANVAS
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 75);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 0.8;
        this.baseAlpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.baseAlpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  /* ==========================================================================
     3. CURSOR GLOW EFFECT
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ==========================================================================
     4. TYPING TEXT ANIMATION IN HERO
     ========================================================================== */
  const typedRoleElement = document.getElementById('typedRole');
  if (typedRoleElement) {
    const roles = [
      'Full Stack Developer',
      'Creative Software Engineer',
      'UI/UX Craftsman',
      'Frontend Architect',
      'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* ==========================================================================
     5. STATS NUMBER COUNTER ANIMATION
     ========================================================================== */
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsAnimated = false;

  function animateMetrics() {
    if (metricsAnimated) return;
    metricNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = `${target}+`;
          if (target === 100) el.textContent = `${target}%`;
          clearInterval(interval);
        } else {
          el.textContent = current;
        }
      }, 30);
    });
    metricsAnimated = true;
  }

  // Trigger metrics when hero is visible
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateMetrics();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(heroSection);
  }

  /* ==========================================================================
     6. NAVIGATION: ACTIVE LINKS & MOBILE DRAWER
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Active Link Highlighting with IntersectionObserver
  const sections = document.querySelectorAll('main section');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* ==========================================================================
     7. SKILLS MATRIX TAB SWITCHER
     ========================================================================== */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.getAttribute('data-tab');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (targetTab === 'all' || category === targetTab) {
          card.classList.remove('hidden');
          // re-trigger animation on progress bar
          const bar = card.querySelector('.skill-bar-fill');
          if (bar) {
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = 'var(--level)';
            }, 50);
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     8. PROJECTS FILTER TABS
     ========================================================================== */
  const projectFilters = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const type = card.getAttribute('data-project-type');
        if (filterValue === 'all' || type.includes(filterValue)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     9. PROJECT CASE STUDY MODAL
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectBody = document.getElementById('modalProjectBody');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    modalProjectTitle.textContent = data.title;

    let stackBadgesHtml = data.stack
      .map((item) => `<span class="tech-pill">${item}</span>`)
      .join(' ');

    let featuresHtml = data.features
      .map((feat) => `<li><i class="fas fa-check text-accent"></i> ${feat}</li>`)
      .join('');

    modalProjectBody.innerHTML = `
      <div class="project-modal-showcase">
        <div style="border-radius: 12px; overflow: hidden; margin-bottom: 20px; aspect-ratio: 16/9; max-height: 320px;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div style="margin-bottom: 16px;">
          <span class="section-badge" style="margin-bottom: 8px;">${data.category}</span>
          <h3 style="font-family: var(--font-heading); color: #fff; font-size: 1.4rem; margin: 8px 0;">${data.title}</h3>
          <p style="color: var(--text-muted); line-height: 1.7; font-size: 1rem;">${data.overview}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div style="background: rgba(255,255,255,0.03); padding: 18px; border-radius: 10px; border: 1px solid var(--glass-border);">
            <h4 style="color: #818cf8; font-family: var(--font-heading); margin-bottom: 8px;"><i class="fas fa-bolt"></i> Engineering Challenge</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">${data.challenges}</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 18px; border-radius: 10px; border: 1px solid var(--glass-border);">
            <h4 style="color: var(--accent-cyan); font-family: var(--font-heading); margin-bottom: 8px;"><i class="fas fa-microchip"></i> Architectural Solution</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">${data.solution}</p>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="color: #fff; font-family: var(--font-heading); margin-bottom: 12px;">Key Capabilities & Features</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--text-main);">
            ${featuresHtml}
          </ul>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="color: #fff; font-family: var(--font-heading); margin-bottom: 10px;">Technologies Deployed</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${stackBadgesHtml}
          </div>
        </div>

        <div style="display: flex; gap: 14px; padding-top: 16px; border-top: 1px solid var(--glass-border);">
          <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-sm">
            <i class="fas fa-external-link-alt"></i> Live Demo Preview
          </a>
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-sm">
            <i class="fab fa-github"></i> View GitHub Source
          </a>
        </div>
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      if (id) openProjectModal(id);
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ==========================================================================
     10. CV / RESUME MODAL & PRINTING
     ========================================================================== */
  const cvModal = document.getElementById('cvModal');
  const cvModalBtn = document.getElementById('cvModalBtn');
  const mobileCvBtn = document.getElementById('mobileCvBtn');
  const heroCvBtn = document.getElementById('heroCvBtn');
  const viewCvNarrativeBtn = document.getElementById('viewCvNarrativeBtn');
  const openFullCvBtn = document.getElementById('openFullCvBtn');
  const closeCvModalBtn = document.getElementById('closeCvModalBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalPrintBtn = document.getElementById('modalPrintBtn');
  const modalDownloadPdfBtn = document.getElementById('modalDownloadPdfBtn');
  const printCvDirectBtn = document.getElementById('printCvDirectBtn');

  function openCvModal() {
    if (cvModal) {
      cvModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    if (cvModal) {
      cvModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function triggerPrint() {
    openCvModal();
    setTimeout(() => {
      window.print();
    }, 300);
  }

  [cvModalBtn, mobileCvBtn, heroCvBtn, viewCvNarrativeBtn, openFullCvBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCvModal();
      });
    }
  });

  [closeCvModalBtn, modalDismissBtn].forEach((btn) => {
    if (btn) btn.addEventListener('click', closeCvModal);
  });

  if (printCvDirectBtn) {
    printCvDirectBtn.addEventListener('click', triggerPrint);
  }

  [modalPrintBtn, modalDownloadPdfBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => {
        window.print();
      });
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeCvModal();
    }
  });

  /* ==========================================================================
     11. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  let toastTimer;

  function showToast(message, icon = 'fas fa-check-circle', duration = 3800) {
    if (!toast) return;
    clearTimeout(toastTimer);

    if (toastMessage) toastMessage.textContent = message;
    if (toastIcon) toastIcon.innerHTML = `<i class="${icon}"></i>`;

    toast.classList.add('active');

    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  }

  /* ==========================================================================
     12. COPY EMAIL ACTION
     ========================================================================== */
  const emailToCopy = 'sushant.dev@example.com';
  const copyButtons = [
    document.getElementById('copyEmailQuickBtn'),
    document.getElementById('copyEmailBtn')
  ];

  copyButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(emailToCopy)
            .then(() => {
              showToast('Email copied to clipboard! (sushant.dev@example.com)', 'fas fa-envelope-circle-check');
            })
            .catch(() => {
              showToast('Email address: sushant.dev@example.com');
            });
        } else {
          showToast('Email address: sushant.dev@example.com');
        }
      });
    }
  });

  /* ==========================================================================
     13. CONTACT FORM SUBMISSION HANDLER
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const submitContactBtn = document.getElementById('submitContactBtn');

  if (contactForm && submitContactBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const subjectInput = document.getElementById('userSubject');
      const messageInput = document.getElementById('userMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'fas fa-triangle-exclamation');
        return;
      }

      // Animated loading state
      submitContactBtn.disabled = true;
      const originalText = submitContactBtn.innerHTML;
      submitContactBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Sending Message...</span>`;

      setTimeout(() => {
        // Successful mock transmission
        submitContactBtn.disabled = false;
        submitContactBtn.innerHTML = originalText;
        contactForm.reset();

        showToast(
          `Thank you ${name}! Sushant has received your message and will respond promptly.`,
          'fas fa-paper-plane'
        );
      }, 1200);
    });
  }

  /* ==========================================================================
     14. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     15. COPYRIGHT YEAR AUTO UPDATE
     ========================================================================== */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
