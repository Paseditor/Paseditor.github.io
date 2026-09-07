const translations = {
  en: {
    title: 'Arnee — Backend & Embedded Linux Developer',
    meta: 'Arnee develops backend services and applications for Embedded Linux using Go, C++17, Qt, PostgreSQL, Redis, MongoDB, React and Vue.',
    skip: 'Skip to content',
    brandAria: 'Arnee — home',
    navAria: 'Main navigation',
    navAbout: 'About',
    navSkills: 'Skills',
    navWork: 'Tasks',
    headerEmail: 'Email',
    heroAria: 'Introduction',
    heroKicker: 'Backend / Embedded Linux',
    heroTitle: 'Backend and <em>embedded systems</em>, from API to device.',
    heroRole: 'Go · C++17 · Qt · Linux',
    heroCopy: 'I develop Go services, database-backed APIs and Qt applications for Embedded Linux. I can join an existing codebase or build a small system from scratch.',
    emailMe: 'Email me',
    viewGithub: 'GitHub profile',
    skillsKicker: 'Areas of work',
    skillsTitle: 'What I work with',
    skillsLead: 'Backend services, embedded applications, databases and web interfaces.',
    backendTitle: 'Backend services',
    backendCopy: 'Go services, REST and gRPC APIs, background jobs and integrations with external systems.',
    embeddedTitle: 'Embedded Linux',
    embeddedCopy: 'C++17 and Qt applications, integration with system services and interfaces for device hardware.',
    dataTitle: 'Databases',
    dataCopy: 'Schema design, SQL queries, caching and performance work with PostgreSQL, Redis and MongoDB.',
    uiTitle: 'Interfaces',
    uiCopy: 'Qt desktop applications and React or Vue web interfaces connected to backend systems.',
    stackKicker: 'Stack',
    stackTitle: 'Languages and tools',
    stackCore: 'Core',
    stackData: 'Data',
    stackInterfaces: 'Interfaces',
    stackDelivery: 'Tools',
    tasksKicker: 'Typical tasks',
    tasksTitle: 'What I can help with',
    tasksLead: 'Development, integration and performance work in an existing project or a new one.',
    taskBackendTitle: 'API and service development',
    taskBackendCopy: 'Implement a new service, add an integration or improve the structure of an existing backend.',
    taskPerfTitle: 'Performance work',
    taskPerfCopy: 'Profile slow code, queries or UI paths, locate the bottleneck and verify the result.',
    taskEmbeddedTitle: 'Embedded application development',
    taskEmbeddedCopy: 'Build or extend a Qt application and connect it to Linux services and device hardware.',
    contactKicker: 'Contact',
    contactTitle: 'Need help with a project?',
    writeEmail: 'Write to me',
    footerRole: 'Backend and Embedded Linux Developer',
    footerEmail: 'Email',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
    languageSwitch: 'Switch to Russian'
  },
  ru: {
    title: 'Arnee — разработчик бэкенда и Embedded Linux',
    meta: 'Arnee разрабатывает бэкенд-сервисы и приложения для Embedded Linux на Go, C++17, Qt, PostgreSQL, Redis, MongoDB, React и Vue.',
    skip: 'Перейти к содержимому',
    brandAria: 'Arnee — главная',
    navAria: 'Основная навигация',
    navAbout: 'О себе',
    navSkills: 'Навыки',
    navWork: 'Задачи',
    headerEmail: 'Почта',
    heroAria: 'О разработчике',
    heroKicker: 'Бэкенд / Embedded Linux',
    heroTitle: 'Бэкенд и <em>встроенные системы</em>: от API до устройства.',
    heroRole: 'Go · C++17 · Qt · Linux',
    heroCopy: 'Разрабатываю сервисы на Go, API с базами данных и приложения на Qt для Embedded Linux. Могу подключиться к существующему коду или собрать небольшую систему с нуля.',
    emailMe: 'Написать',
    viewGithub: 'Профиль GitHub',
    skillsKicker: 'Направления',
    skillsTitle: 'С чем я работаю',
    skillsLead: 'Бэкенд-сервисы, встраиваемые приложения, базы данных и веб-интерфейсы.',
    backendTitle: 'Бэкенд-сервисы',
    backendCopy: 'Сервисы на Go, REST- и gRPC API, фоновые задачи и интеграции с внешними системами.',
    embeddedTitle: 'Embedded Linux',
    embeddedCopy: 'Приложения на C++17 и Qt, интеграция с системными сервисами и интерфейсы для устройств.',
    dataTitle: 'Базы данных',
    dataCopy: 'Проектирование схем, SQL-запросы, кэширование и оптимизация PostgreSQL, Redis и MongoDB.',
    uiTitle: 'Интерфейсы',
    uiCopy: 'Десктопные приложения на Qt и веб-интерфейсы на React или Vue, подключённые к бэкенду.',
    stackKicker: 'Стек',
    stackTitle: 'Языки и инструменты',
    stackCore: 'Основа',
    stackData: 'Данные',
    stackInterfaces: 'Интерфейсы',
    stackDelivery: 'Инструменты',
    tasksKicker: 'Типовые задачи',
    tasksTitle: 'С чем могу помочь',
    tasksLead: 'Разработка, интеграция и оптимизация в существующем или новом проекте.',
    taskBackendTitle: 'Разработка API и сервисов',
    taskBackendCopy: 'Реализовать новый сервис, добавить интеграцию или улучшить структуру существующего бэкенда.',
    taskPerfTitle: 'Оптимизация',
    taskPerfCopy: 'Профилировать медленный код, запросы или UI, найти узкое место и проверить результат.',
    taskEmbeddedTitle: 'Разработка для Embedded Linux',
    taskEmbeddedCopy: 'Создать или расширить приложение на Qt и связать его с сервисами Linux и оборудованием.',
    contactKicker: 'Контакты',
    contactTitle: 'Нужна помощь с проектом?',
    writeEmail: 'Написать мне',
    footerRole: 'Разработчик бэкенда и Embedded Linux',
    footerEmail: 'Почта',
    themeLight: 'Включить светлую тему',
    themeDark: 'Включить тёмную тему',
    languageSwitch: 'Switch to English'
  }
};

const header = document.querySelector('.site-header');
const themeToggle = document.querySelector('#themeToggle');
const languageToggle = document.querySelector('#languageToggle');
const descriptionMeta = document.querySelector('meta[name="description"]');
const savedLanguage = localStorage.getItem('arnee-language');
let currentLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en');

const updateThemeLabel = () => {
  const isDark = document.body.classList.contains('dark-mode');
  const label = translations[currentLanguage][isDark ? 'themeLight' : 'themeDark'];
  themeToggle?.setAttribute('aria-label', label);
  themeToggle?.setAttribute('title', label);
};

const applyLanguage = (language) => {
  currentLanguage = language;
  const copy = translations[language];

  document.documentElement.lang = language;
  document.title = copy.title;
  descriptionMeta?.setAttribute('content', copy.meta);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = copy[element.dataset.i18nHtml];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
  });

  const languageLabel = copy.languageSwitch;
  languageToggle.textContent = language === 'ru' ? 'EN' : 'RU';
  languageToggle.setAttribute('aria-label', languageLabel);
  languageToggle.setAttribute('title', languageLabel);
  localStorage.setItem('arnee-language', language);
  updateThemeLabel();
};

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .14, rootMargin: '0px 0px -36px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  revealObserver.observe(element);
});

const sections = [...document.querySelectorAll('section[id], article[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

const activateNav = () => {
  let current = 'about';

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

window.addEventListener('scroll', activateNav, { passive: true });
activateNav();

const storedTheme = localStorage.getItem('arnee-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
  document.body.classList.add('dark-mode');
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('arnee-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeLabel();
});

languageToggle?.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
});

applyLanguage(currentLanguage);
