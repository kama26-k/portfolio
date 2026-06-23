document.addEventListener('DOMContentLoaded', () => {
  // --- Ambient Cursor Glow Tracking ---
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let activeTimeout;
  document.addEventListener('mousemove', (e) => {
    // Center the radial glow on cursor coordinates
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    
    if (!cursorGlow.classList.contains('active')) {
      cursorGlow.classList.add('active');
    }

    clearTimeout(activeTimeout);
    activeTimeout = setTimeout(() => {
      cursorGlow.classList.remove('active');
    }, 1000);
  });

  document.addEventListener('mouseenter', () => {
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });

  // --- 1. Sticky Navbar & Back-to-Top Button ---
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 2. Active Nav Link Highlighting ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserverOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies the middle of viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
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
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  // --- 3. Sidebar Drawer Navigation ---
  const hamburger = document.getElementById('hamburger');
  const sidebarClose = document.getElementById('sidebar-close');
  const navOverlay = document.getElementById('nav-overlay');
  const sidebarNavbar = document.getElementById('navbar');

  function openSidebar() {
    sidebarNavbar.classList.add('open');
    navOverlay.classList.add('active');
    document.body.classList.add('nav-open');
    if (hamburger) {
      hamburger.innerHTML = '✕';
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  function closeSidebar() {
    sidebarNavbar.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.classList.remove('nav-open');
    if (hamburger) {
      hamburger.innerHTML = '☰';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = sidebarNavbar.classList.contains('open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar drawer when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });

  // --- 4. Theme Toggle (Dark / Light) ---
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Apply initial theme
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  });

  // --- 5. Typing Effect for Hero Section ---
  const typedTextSpan = document.getElementById('typed-text');
  const roles = [
    'Security Analyst Intern',
    'Ethical Hacker',
    'Cloud Enthusiast',
    'Network Engineer'
  ];
  
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newTextDelay = 2000; // Delay between roles
  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < roles[roleIndex].length) {
      typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, typingSpeed + 500);
    }
  }

  // Start typing animation
  if (typedTextSpan) {
    setTimeout(type, newTextDelay);
  }

  // --- 6. Form Validation ---
  // Form removed; no validation required.

  // --- 7. Certificate Lightbox Modal ---
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const modalDownload = document.getElementById('modal-download');
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');

  function openModal(certPath, certTitle) {
    modalTitle.textContent = certTitle;
    
    // Check if certificate path is provided
    if (certPath && certPath.trim() !== '') {
      // Show image, hide placeholder if any, set download link
      modalImg.src = certPath;
      modalImg.style.display = 'block';
      modalDownload.href = certPath;
      modalDownload.style.display = 'inline-flex';
      
      // Remove any existing placeholder
      const placeholder = certModal.querySelector('.cert-placeholder');
      if (placeholder) placeholder.remove();
    } else {
      // Hide image and download button
      modalImg.style.display = 'none';
      modalDownload.style.display = 'none';
      
      // Remove existing placeholder to avoid duplicates
      const existingPlaceholder = certModal.querySelector('.cert-placeholder');
      if (existingPlaceholder) existingPlaceholder.remove();
      
      // Create and append placeholder content
      const placeholder = document.createElement('div');
      placeholder.className = 'cert-placeholder';
      placeholder.innerHTML = `
        <div class="cert-placeholder-icon">🛡️</div>
        <div class="cert-placeholder-text">This certificate credential is pending upload or verification. It will be available shortly!</div>
      `;
      // Insert placeholder before modal action buttons
      const wrapper = certModal.querySelector('.modal-image-wrapper');
      wrapper.appendChild(placeholder);
    }
    
    certModal.classList.add('active');
    document.body.classList.add('modal-open');
    certModal.setAttribute('aria-hidden', 'false');
    
    // Focus close button for accessibility
    modalClose.focus();
  }

  function closeModal() {
    certModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    certModal.setAttribute('aria-hidden', 'true');
    
    // Reset image after animation to avoid flashing
    setTimeout(() => {
      modalImg.src = '';
      const placeholder = certModal.querySelector('.cert-placeholder');
      if (placeholder) placeholder.remove();
    }, 400);
  }

  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certPath = btn.getAttribute('data-cert');
      const certTitle = btn.getAttribute('data-title');
      openModal(certPath, certTitle);
    });
  });

  // Close triggers
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeModal();
    }
  });
});

