// Плавный скролл (Lenis), связанный с GSAP ScrollTrigger.
// Отключается, если у пользователя в системе включено «уменьшить движение».

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return null;

  const lenis = new Lenis({
    duration: 1.1, // длительность «доезда» скролла: больше = плавнее и тягучее
    smoothWheel: true, // на телефонах остаётся родной скролл (так и надо)
  });

  // Lenis сообщает ScrollTrigger о каждой прокрутке
  lenis.on('scroll', ScrollTrigger.update);

  // Один общий цикл анимации для GSAP и Lenis
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Плавный переход по якорным ссылкам: <a href="#contact">
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    });
  });

  return lenis;
}
