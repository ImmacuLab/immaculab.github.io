// INTERSECTION OBSERVER FOR ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
 
  document.querySelectorAll('.stat-item, .package-card, .feature-item, .step, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
 
  // COUNTER ANIMATION
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + '+';
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + '+';
    };
    requestAnimationFrame(step);
  }
 
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target.querySelector('[data-target]');
        if (el) {
          animateCounter(el, parseInt(el.dataset.target));
          counterObserver.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });
 
  document.querySelectorAll('.stat-item').forEach(el => counterObserver.observe(el));
 
  // SMOOTH NAV ACTIVE STATE
  const sections = document.querySelectorAll('section, div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
 
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (section.id && window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--silver-bright)' : '';
    });
  });