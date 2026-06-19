document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal with IntersectionObserver
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // If the revealed element contains skill fill bars, animate them
        const skillFills = entry.target.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
          const percentage = fill.getAttribute('style').match(/--pct:\s*([0-9%]+)/);
          if (percentage && percentage[1]) {
            fill.style.width = percentage[1];
          }
        });
        
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver(revealCallback, revealOptions);

  // Select and observe all revealable elements
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach(el => observer.observe(el));
});
