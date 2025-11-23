// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile navigation
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav a');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // Sticky header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Particles animation
  initParticles();

  // Portfolio functionality
  initPortfolio();
});

// Particles
function initParticles() {
  const heroes = document.querySelectorAll('.hero');
  heroes.forEach((hero, index) => {
    if (!hero.querySelector('.particles-canvas')) {
      const canvas = document.createElement('canvas');
      canvas.className = 'particles-canvas';
      canvas.id = `particles-${index}`;
      hero.appendChild(canvas);
      animateParticles(canvas.id);
    }
  });
}

function animateParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 80;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() * 60 + 180; // Blues/purples
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      if (Math.random() > 0.98) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = `hsl(${this.hue}, 70%, 50%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = `hsl(${this.hue}, 70%, 50%)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// Portfolio
const projects = [
  {
    id: 1,
    category: 'ai',
    title: 'AI Workflow Automation',
    img: 'https://images.unsplash.com/photo-1721800788211-9bf2a36b1d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Automated workflows for enterprise efficiency.',
    details: 'Developed a custom AI agent system that automates complex business workflows, reducing manual tasks by 70%. Utilized advanced machine learning models for predictive decision-making.'
  },
  {
    id: 2,
    category: 'web',
    title: 'E-Commerce Platform',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Scalable online store with AI recommendations.',
    details: 'Built a full-stack e-commerce solution with React, Node.js, and integrated AI for personalized product recommendations, boosting sales by 40%.'
  },
  {
    id: 3,
    category: 'mobile',
    title: 'Fitness Tracking App',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Cross-platform mobile app with real-time tracking.',
    details: 'Created a React Native app for iOS and Android, featuring AI-driven workout plans and health analytics, with 50k+ downloads.'
  },
  {
    id: 4,
    category: 'ai',
    title: 'Predictive Analytics Dashboard',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'ML-powered insights for data-driven decisions.',
    details: 'Implemented machine learning models for real-time predictive analytics, integrated into a responsive dashboard for business intelligence.'
  },
  {
    id: 5,
    category: 'web',
    title: 'Enterprise Management System',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Custom CRM and ERP solution.',
    details: 'Developed a comprehensive web-based ERP/CRM system tailored for Libyan enterprises, with seamless integration and high security standards.'
  },
  {
    id: 6,
    category: 'mobile',
    title: 'AI Chat Companion App',
    img: 'https://images.unsplash.com/photo-1687360443913-5af6250cfb2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Intelligent conversational mobile agent.',
    details: 'Built a cross-platform app featuring advanced NLP AI agents for personalized user interactions, focused on mental health support.'
  }
];

function initPortfolio() {
  const container = document.querySelector('.projects-grid');
  const filtersContainer = document.querySelector('.projects-filters');
  if (!container || !filtersContainer) return;

  // Render projects
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.category = project.category;
    card.dataset.id = project.id;
    card.style.backgroundImage = `url(${project.img})`;
    card.innerHTML = `
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.shortDesc}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(project));
    container.appendChild(card);
  });

  // Filters
  const filters = ['all', 'ai', 'web', 'mobile'];
  filters.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn btn';
    btn.dataset.category = cat;
    btn.textContent = cat.toUpperCase();
    btn.addEventListener('click', () => filterProjects(cat));
    if (cat === 'all') btn.classList.add('active');
    filtersContainer.appendChild(btn);
  });
}

function filterProjects(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  document.querySelectorAll('.project-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.classList.add('reveal');
    } else {
      card.style.display = 'none';
    }
  });
}

function openModal(project) {
  const modal = document.querySelector('.modal');
  if (!modal) {
    createModal(project);
    return;
  }
  populateModal(modal, project);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function createModal(project) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">&times;</button>
      <img class="modal-img" src="" alt="">
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4"></h2>
        <p class="mb-4"></p>
        <p></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  populateModal(modal, project);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

function populateModal(modal, project) {
  const content = modal.querySelector('.modal-content');
  content.querySelector('.modal-img').src = project.img;
  content.querySelector('.modal-img').alt = project.title;
  content.querySelector('h2').textContent = project.title;
  content.querySelector('p:nth-of-type(1)').textContent = project.shortDesc;
  content.querySelector('p:nth-of-type(2)').textContent = project.details;
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}