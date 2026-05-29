const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];
let width = 0;
let height = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars();
}

function createStars() {
  const count = Math.round((width * height) / 8500);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.5 + .25,
    alpha: Math.random() * .7 + .2,
    twinkle: Math.random() * .02 + .003,
    direction: Math.random() > .5 ? 1 : -1
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(width * .72, height * .15, 0, width * .72, height * .15, width * .8);
  gradient.addColorStop(0, 'rgba(223, 208, 184, 0.08)');
  gradient.addColorStop(1, 'rgba(223, 208, 184, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    star.alpha += star.twinkle * star.direction;
    if (star.alpha > 1 || star.alpha < .15) star.direction *= -1;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(223, 208, 184, ${star.alpha})`;
    ctx.fill();
  }

  if (Math.random() < .008 && shootingStars.length < 2) {
    shootingStars.push({
      x: Math.random() * width,
      y: Math.random() * height * .45,
      len: Math.random() * 80 + 90,
      speed: Math.random() * 5 + 7,
      life: 1
    });
  }

  shootingStars = shootingStars.filter((meteor) => {
    meteor.x += meteor.speed;
    meteor.y += meteor.speed * .42;
    meteor.life -= .014;
    ctx.save();
    ctx.globalAlpha = Math.max(meteor.life, 0);
    const grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.len, meteor.y - meteor.len * .42);
    grad.addColorStop(0, 'rgba(223, 208, 184, .95)');
    grad.addColorStop(1, 'rgba(223, 208, 184, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(meteor.x - meteor.len, meteor.y - meteor.len * .42);
    ctx.stroke();
    ctx.restore();
    return meteor.life > 0;
  });

  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener('resize', resizeCanvas);

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');

    if (entry.target.classList.contains('skill-card') && !entry.target.dataset.done) {
      entry.target.dataset.done = 'true';
      const target = Number(entry.target.dataset.percent || 0);
      entry.target.style.setProperty('--percent', `${target}%`);
      const counter = entry.target.querySelector('.counter');
      let start = null;
      const duration = 1200;
      const tick = (time) => {
        if (!start) start = time;
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  });
}, { threshold: .18 });

document.querySelectorAll('.reveal, .skill-card').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 50, 350)}ms`;
  observer.observe(el);
});

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - .5) * -5;
    const rotateY = ((x / rect.width) - .5) * 5;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

const sections = [...document.querySelectorAll('section[id], header[id], footer[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
function activateNav() {
  let current = 'home';
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', activateNav);
activateNav();

const themeToggle = document.querySelector('#themeToggle');
const savedMode = localStorage.getItem('arnee-mode');
if (savedMode === 'warm') document.body.classList.add('warm-mode');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('warm-mode');
  localStorage.setItem('arnee-mode', document.body.classList.contains('warm-mode') ? 'warm' : 'default');
});
