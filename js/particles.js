(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  // Respect accessibility preferences
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    return; // Don't run particle animation
  }

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const numberOfParticles = 40;
  
  // Dynamic color sampling from CSS variables
  let accentColor = '#06b6d4';
  let primaryColor = '#3b82f6';

  function updateColors() {
    const style = getComputedStyle(document.body);
    accentColor = style.getPropertyValue('--color-accent').trim() || '#06b6d4';
    primaryColor = style.getPropertyValue('--color-primary').trim() || '#3b82f6';
  }

  // Handle Resize
  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    init();
  }

  // Particle Class
  class Particle {
    constructor(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.color = Math.random() > 0.5 ? accentColor : primaryColor;
    }

    update(width, height) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.5;
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    updateColors();
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas.width, canvas.height));
    }
  }

  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          opacityValue = 1 - (distance / 120);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = opacityValue * 0.15;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationId;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update(canvas.width, canvas.height);
      particlesArray[i].draw();
    }
    
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  // Monitor theme changes to adjust particle colors
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateColors();
        particlesArray.forEach(p => {
          p.color = Math.random() > 0.5 ? accentColor : primaryColor;
        });
      }
    });
  });
  observer.observe(document.body, { attributes: true });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
})();
