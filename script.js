const root = document.documentElement;
const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menu = document.querySelector('[data-menu]');
const loader = document.querySelector('[data-loader]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const toTop = document.querySelector('[data-to-top]');
const clock = document.querySelector('[data-clock]');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('is-hidden'), 350);
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

menu?.addEventListener('click', () => {
  menu.classList.toggle('is-open');
  nav.classList.toggle('is-open');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    menu?.classList.remove('is-open');
    nav?.classList.remove('is-open');
  });
});

const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 20);
  toTop?.classList.toggle('is-visible', y > 520);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mouse glow
window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

// Typed text
const typedEl = document.querySelector('[data-typed]');
const phrases = [
  'Frontend developer',
  'UI animation enjoyer',
  'Creator of beautiful web pages',
  'GitHub Pages ready portfolio'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeLoop() {
  if (!typedEl) return;
  const phrase = phrases[phraseIndex];
  typedEl.textContent = phrase.slice(0, charIndex);
  if (!isDeleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(typeLoop, 70);
  } else if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 34);
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

// Scroll reveal and counters
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');

    if (entry.target.matches('.skill-card')) {
      const counter = entry.target.querySelector('.counter');
      const target = Number(entry.target.dataset.percent || 0);
      animateCounter(counter, target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal, .skill-card').forEach(el => revealObserver.observe(el));

function animateCounter(el, target) {
  if (!el || el.dataset.done) return;
  el.dataset.done = 'true';
  const duration = 1100;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Active nav links
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav__link')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
sections.forEach(section => activeObserver.observe(section));

// Magnetic tilt cards
const magneticItems = document.querySelectorAll('.magnetic');
magneticItems.forEach(card => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y / rect.height) - .5) * -8;
    const ry = ((x / rect.width) - .5) * 8;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

// Button ripple
for (const btn of document.querySelectorAll('.btn')) {
  btn.addEventListener('click', (event) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}

// Footer clock
function updateClock() {
  if (!clock) return;
  const date = new Date();
  clock.textContent = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 1000 * 30);

// Starfield canvas
const canvas = document.querySelector('#stars');
const ctx = canvas?.getContext('2d');
let stars = [];
let shootingStars = [];
let width = 0;
let height = 0;
let dpr = 1;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(190, Math.floor(width * height / 6500)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.7 + .25,
    alpha: Math.random() * .7 + .25,
    speed: Math.random() * .16 + .03,
    twinkle: Math.random() * Math.PI * 2
  }));
}

function spawnShootingStar() {
  if (Math.random() < .018) {
    shootingStars.push({
      x: Math.random() * width * .8,
      y: Math.random() * height * .35,
      vx: Math.random() * 5 + 7,
      vy: Math.random() * 2 + 3,
      life: 0,
      maxLife: 55 + Math.random() * 35
    });
  }
}

function drawStars() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const isLight = root.classList.contains('light');
  for (const star of stars) {
    star.twinkle += .015;
    star.y += star.speed;
    if (star.y > height) {
      star.y = -4;
      star.x = Math.random() * width;
    }
    const alpha = Math.max(.15, star.alpha + Math.sin(star.twinkle) * .22);
    ctx.beginPath();
    ctx.fillStyle = isLight ? `rgba(40, 103, 255, ${alpha * .45})` : `rgba(220, 230, 255, ${alpha})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }

  spawnShootingStar();
  shootingStars = shootingStars.filter(s => s.life < s.maxLife);
  for (const s of shootingStars) {
    s.x += s.vx;
    s.y += s.vy;
    s.life += 1;
    const opacity = 1 - s.life / s.maxLife;
    const gradient = ctx.createLinearGradient(s.x, s.y, s.x - 80, s.y - 45);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - 90, s.y - 48);
    ctx.stroke();
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();
