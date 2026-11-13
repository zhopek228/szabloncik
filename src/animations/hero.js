// Анимация первого экрана при загрузке страницы (не по скроллу).
// Элементы с data-hero появляются по очереди в порядке data-hero="1", "2", "3"...

import { gsap } from 'gsap';

export function initHero() {
  const items = gsap.utils
    .toArray('[data-hero]')
    .sort((a, b) => (+a.dataset.hero || 0) - (+b.dataset.hero || 0));
  if (!items.length) return;

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from(items, {
      y: 30,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.1,
    });
  });
}
