document.addEventListener('DOMContentLoaded', () => {
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

  // --- 3. Hamburger Menu with Scroll Lock ---
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  function toggleMenu() {
    const isOpen = navLinksContainer.classList.contains('open');
    if (isOpen) {
      navLinksContainer.classList.remove('open');
      document.body.classList.remove('nav-open');
      hamburger.innerHTML = '☰';
    } else {
      navLinksContainer.classList.add('open');
      document.body.classList.add('nav-open');
      hamburger.innerHTML = '✕';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('open')) {
        toggleMenu();
      }
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
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const successMsg = document.getElementById('form-success');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateForm(e) {
    e.preventDefault();
    let isValid = true;

    // Reset error messages and success
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    successMsg.hidden = true;

    // Name Validation
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Name is required.';
      isValid = false;
    }

    // Email Validation
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Message Validation
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Message is required.';
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        successMsg.hidden = false;
        form.reset();
      }, 1500);
    }
  }

  if (form) {
    form.addEventListener('submit', validateForm);

    // Optional: Real-time validation clear on input
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim() !== '') nameError.textContent = '';
    });
    emailInput.addEventListener('input', () => {
      if (emailRegex.test(emailInput.value.trim())) emailError.textContent = '';
    });
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim() !== '') messageError.textContent = '';
    });
  }
});
