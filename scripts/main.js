let portfolioData = null;

// Fetch portfolio data
async function loadPortfolioData() {
  try {
    const response = await fetch('./data/portfolio.json');
    if (!response.ok) {
      console.warn('Portfolio data could not be loaded. Using fallback HTML content.');
      return;
    }
    portfolioData = await response.json();
    renderPortfolio();
  } catch (error) {
    console.warn('Portfolio data fetch failed. Using fallback HTML content.', error);
  }
}

function renderPortfolio() {
  if (!portfolioData) return;

  // Hero section
  renderHero();

  // Projects section
  renderProjects();

  // Skills section
  renderSkills();

  // Contact section
  renderContact();

  // Footer
  renderFooter();
}

function renderHero() {
  const { name, title, intro, projectCount, focusAreas, email } = portfolioData.profile;

  const heroMain = document.querySelector('.hero-main');
  heroMain.innerHTML = `
    <p class="eyebrow">${title}</p>
    <h1>${name}</h1>
    <p class="intro">${intro}</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="#projects">View Projects</a>
      <a class="btn btn-ghost" href="mailto:${email}">Email Me</a>
    </div>
  `;

  const heroCard = document.querySelector('.hero-card');
  const focusItems = focusAreas.map((item) => `<li>${item}</li>`).join('');
  heroCard.innerHTML = `
    <div class="metric">
      <strong><span class="metric-tech">UE5</span></strong>
      <span>for <span class="metric-tech">3+ Year</span></span>
    </div>
    <div class="metric">
      <strong><span class="metric-tech">C++</span></strong>
      <span>for <span class="metric-tech">5+ Year</span></span>
    </div>
    <div class="metric">
      <strong>${projectCount}</strong>
      <span>Portfolio Projects</span>
    </div>
    <ul class="focus-list">
      ${focusItems}
    </ul>
  `;
}

function renderSkills() {
  const skillsIntro = portfolioData.skillsIntro;
  const skills = portfolioData.skills;

  const sectionHead = document.querySelector('#skills .section-head');
  sectionHead.innerHTML = `
    <h2 id="skillsTitle">Skills</h2>
    <p>${skillsIntro}</p>
  `;

  const skillColumns = document.querySelector('.skill-columns');
  skillColumns.innerHTML = skills
    .map(
      (skillGroup) => `
    <article class="skill-panel reveal">
      <h3>${skillGroup.category}</h3>
      <div class="meter-list">
        ${skillGroup.items
          .map(
            (skill) => `
          <div class="meter">
            <div class="label-row">
              <span>${skill.name}</span>
              <span>${skill.proficiency}%</span>
            </div>
            <div class="track">
              <div class="fill" style="width:${skill.proficiency}%"></div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </article>
  `
    )
    .join('');

  document.querySelectorAll('.skill-panel').forEach((el) => {
    revealObserver.observe(el);
  });
}

function renderProjects() {
  const projectsIntro = portfolioData.projectsIntro;
  const projects = portfolioData.projects;

  const sectionHead = document.querySelector('#projects .section-head');
  sectionHead.innerHTML = `
    <h2 id="projectsTitle">Projects</h2>
    <p>${projectsIntro}</p>
  `;

  const projectsGrid = document.querySelector('.projects-grid');
  projectsGrid.innerHTML = projects
    .map(
      (project) => `
    <article class="project-card reveal" data-title="${project.title}" data-video="${project.video}" data-download="${project.downloadUrl}" data-code="${project.codeUrl}" role="button" tabindex="0">
      <img class="project-thumb" src="${project.thumbnail}" alt="${project.title} screenshot" loading="lazy" />
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tag-row">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a class="link-button" href="${project.codeUrl}" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </article>
  `
    )
    .join('');

  document.querySelectorAll('.project-card').forEach((el) => {
    revealObserver.observe(el);
  });
}

function renderContact() {
  const { contactIntro, contactDescription } = portfolioData;
  const { email, social } = portfolioData.profile;

  const sectionHead = document.querySelector('#contact .section-head');
  sectionHead.innerHTML = `
    <h2 id="contactTitle">Contact</h2>
    <p>${contactIntro}</p>
  `;

  const contactShell = document.querySelector('.contact-shell');
  contactShell.innerHTML = `
    <p>${contactDescription}</p>
    <ul class="contact-list" aria-label="Social links">
      <li><a href="mailto:${email}">Email</a></li>
      <li><a href="${social.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a></li>
      <li><a href="${social.github}" target="_blank" rel="noreferrer">GitHub</a></li>
      <li><a href="${social.instagram}" target="_blank" rel="noreferrer">Instagram</a></li>
    </ul>
  `;

  revealObserver.observe(document.querySelector('.contact-shell'));
}

function renderFooter() {
  const { year, author } = portfolioData.footer;
  const footer = document.querySelector('.site-footer .container');
  footer.textContent = `© ${year} ${author}. All rights reserved.`;
}

// Navigation
function setupEventListeners() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = [...document.querySelectorAll('.nav-links a')];

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Navigation active link tracking
let sectionObserver;
function setupObservers() {
  const navAnchors = [...document.querySelectorAll('.nav-links a')];
  const sectionIds = navAnchors.map((anchor) => anchor.getAttribute('href').replace('#', ''));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((section) => section);

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute('id');
        navAnchors.forEach((anchor) => {
          const anchorId = anchor.getAttribute('href').replace('#', '');
          anchor.classList.toggle('active', anchorId === id);
        });
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function showProjectsOnInitialLoad() {
  const hash = window.location.hash;
  const shouldForceProjects = !hash || hash === '#home' || hash === '#projects';

  if (!shouldForceProjects) {
    return;
  }

  if (hash !== '#projects') {
    const nextUrl = `${window.location.pathname}${window.location.search}#projects`;
    history.replaceState(null, '', nextUrl);
  }

  const projectsSection = document.getElementById('projects');
  if (!projectsSection) {
    return;
  }

  const scrollToProjects = () => {
    const headerOffset = 95;
    const top = Math.max(0, projectsSection.offsetTop - headerOffset);
    window.scrollTo({ top, behavior: 'auto' });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(scrollToProjects);
  });

  window.addEventListener(
    'load',
    () => {
      scrollToProjects();
      setTimeout(scrollToProjects, 0);
    },
    { once: true }
  );
}

// Reveal animations
let revealObserver;
function initRevealObserver() {
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}

// Modal handling
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalVideo = document.getElementById('modalVideo');
const modalVideoSource = document.getElementById('modalVideoSource');
const modalDownload = document.getElementById('modalDownload');

function closeModal() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  modalVideo.pause();
  modalVideo.currentTime = 0;
}

function openModalFromCard(card) {
  const title = card.getAttribute('data-title') || 'Project';
  const video = card.getAttribute('data-video') || '';
  const download = card.getAttribute('data-download') || '#';

  modalTitle.textContent = title;
  modalVideoSource.src = video;
  modalVideo.load();
  modalDownload.href = download;

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
}

function initModalHandlers() {
  // Use delegation so cards work for both static and dynamically rendered content.
  document.addEventListener('click', (event) => {
    if (event.target.closest('.link-button')) {
      return;
    }

    const trigger = event.target.closest('.project-card');
    if (trigger) {
      openModalFromCard(trigger);
    }
  });

  // Support keyboard activation for accessibility
  document.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('project-card')) {
      event.preventDefault();
      openModalFromCard(event.target);
    }
  });

  modalClose.addEventListener('click', closeModal);

  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  initRevealObserver();
  setupEventListeners();
  setupObservers();
  initModalHandlers();
  loadPortfolioData();
  showProjectsOnInitialLoad();
});
