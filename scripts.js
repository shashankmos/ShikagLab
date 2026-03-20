/* ===================================================
   SHIKAG'S ENGINEERING LABS - INTERACTIVE SCRIPTS
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== DYNAMIC YEARS & COPYRIGHT =====
  const currentYear = new Date().getFullYear();
  const yearsOfExcellence = currentYear - 1999;
  const mdExperience = 35 + (currentYear - 1999);
  
  const copyrightYearEl = document.getElementById('copyright-year');
  const yearsExcellenceEl = document.getElementById('years-excellence');
  const mdExperienceEl = document.getElementById('md-experience');
  const dynamicYearsText = document.querySelectorAll('.dynamic-years-text');
  const dynamicYearsVal = document.querySelectorAll('.dynamic-years-val');

  if (copyrightYearEl) copyrightYearEl.textContent = currentYear;
  if (yearsExcellenceEl) yearsExcellenceEl.textContent = yearsOfExcellence;
  if (mdExperienceEl) mdExperienceEl.textContent = mdExperience;
  
  dynamicYearsText.forEach(el => el.textContent = yearsOfExcellence);
  dynamicYearsVal.forEach(el => el.textContent = yearsOfExcellence + "+");

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksList.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ===== SCROLL REVEAL ANIMATIONS =====
  const fadeElements = document.querySelectorAll('.service-card, .calib-card, .misc-card, .vm-card, .accred-badge, .contact-card, .highlight, .detail-block, .civil-test-group');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in', 'visible');
        }, 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  // Add initial fade-in class and observe
  fadeElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    revealObserver.observe(el);
  });

  // ===== COUNTER ANIMATION FOR HERO STATS =====
  const statNumbers = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/^(\d+)(\+?)(.*)$/);
      if (match) {
        const target = parseInt(match[1]);
        const suffix = match[2] + match[3];
        let current = 0;
        const duration = 1500;
        const steps = 50;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target + suffix;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + suffix;
          }
        }, stepTime);
      }
    });
    statsAnimated = true;
  };

  // Observe hero section for stats animation
  const heroSection = document.getElementById('home');
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        setTimeout(animateStats, 800);
      }
    });
  }, { threshold: 0.3 });

  if (heroSection) heroObserver.observe(heroSection);

  // ===== TICKER PAUSE ON HOVER =====
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }

  // ===== SERVICE CARD TILT EFFECT =====
  document.querySelectorAll('.service-card, .calib-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * 4;
      const tiltY = ((centerX - x) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== NAVBAR ACTIVE STYLE =====
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active-nav {
      color: #f5b942 !important;
      background: rgba(232, 160, 32, 0.1) !important;
    }
  `;
  document.head.appendChild(style);

  // ===== PRELOAD ANIMATION =====
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

});
