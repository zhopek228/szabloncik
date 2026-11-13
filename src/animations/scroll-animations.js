// Анимации через атрибуты в HTML — код писать не нужно.
//
//   data-animate="fade-up"      блок выезжает снизу и проявляется
//   data-animate="fade-down"    сверху
//   data-animate="fade-left"    слева
//   data-animate="fade-right"   справа
//   data-animate="fade"         просто проявляется
//   data-animate="zoom"         проявляется с лёгким увеличением
//   data-animate="stagger"      дочерние элементы появляются по очереди
//   data-animate="split"        заголовок появляется по строкам/словам
//   data-animate="counter"      число «досчитывает» до значения в тексте
//   data-parallax="0.2"         параллакс: элемент едет медленнее страницы
//
// Дополнительно:  data-delay="0.2"  (задержка в секундах)
//                 data-duration="1" (длительность в секундах)

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const DISTANCE = 40; // на сколько пикселей «выезжает» блок
const EASE = 'power3.out';

const presets = {
  'fade-up': { y: DISTANCE },
  'fade-down': { y: -DISTANCE },
  'fade-left': { x: -DISTANCE },
  'fade-right': { x: DISTANCE },
  fade: {},
  zoom: { scale: 0.94 },
};

function opts(el) {
  return {
    delay: parseFloat(el.dataset.delay) || 0,
    duration: parseFloat(el.dataset.duration) || 0.9,
  };
}

function trigger(el) {
  return { trigger: el, start: 'top 85%', once: true };
}

function initPresets() {
  Object.entries(presets).forEach(([name, from]) => {
    gsap.utils.toArray(`[data-animate="${name}"]`).forEach((el) => {
      gsap.from(el, { ...from, autoAlpha: 0, ease: EASE, ...opts(el), scrollTrigger: trigger(el) });
    });
  });
}

function initStagger() {
  gsap.utils.toArray('[data-animate="stagger"]').forEach((parent) => {
    gsap.from(parent.children, {
      y: DISTANCE,
      autoAlpha: 0,
      ease: EASE,
      stagger: 0.12,
      ...opts(parent),
      scrollTrigger: trigger(parent),
    });
  });
}

function initSplit() {
  gsap.utils.toArray('[data-animate="split"]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines,words',
      mask: 'lines', // слова «выплывают» из-под невидимой маски
      autoSplit: true, // пересобирается при смене ширины экрана
      onSplit(self) {
        return gsap.from(self.words, {
          yPercent: 110,
          ease: EASE,
          stagger: 0.04,
          ...opts(el),
          scrollTrigger: trigger(el),
        });
      },
    });
  });
}

function initCounters() {
  gsap.utils.toArray('[data-animate="counter"]').forEach((el) => {
    const raw = el.textContent.trim();
    const num = raw.replace(/[^\d.,]/g, '').replace(',', '.');
    const end = parseFloat(num) || 0;
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    const suffix = raw.replace(/[\d.,\s]/g, '');
    const obj = { value: 0 };
    gsap.to(obj, {
      value: end,
      ease: 'power2.out',
      duration: parseFloat(el.dataset.duration) || 1.6,
      scrollTrigger: trigger(el),
      onUpdate: () => {
        el.textContent =
          obj.value.toLocaleString('pl-PL', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;
      },
    });
  });
}

function initParallax() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

export function initScrollAnimations() {
  const mm = gsap.matchMedia();

  // Анимации включаются только если пользователь не просил их отключить
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    initPresets();
    initStagger();
    initSplit();
    initCounters();
    initParallax();
  });

  // После загрузки картинок и шрифтов пересчитываем позиции
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
