import './style.css';
import { initSmoothScroll } from './animations/smooth-scroll.js';
import { initScrollAnimations } from './animations/scroll-animations.js';
import { initHero } from './animations/hero.js';

// Чтобы убрать плавный скролл на конкретном сайте, закомментируй эту строку
initSmoothScroll();

initHero();
initScrollAnimations();

// Меню: шапка становится плотнее после прокрутки
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Год в подвале
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
