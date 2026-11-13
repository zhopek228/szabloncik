# Szabloncik

Шаблон для сайтов клиентов: **Vite + GSAP (ScrollTrigger, SplitText) + Lenis**.
Анимации включаются атрибутами прямо в HTML, JS писать не нужно.

## Запуск

Нужен Node.js 20+ (проверить: `node -v`).

```bash
npm install      # один раз: скачать библиотеки
npm run dev      # запустить сайт → открыть адрес из терминала (обычно http://localhost:5173)
npm run build    # собрать готовый сайт в папку dist/ для хостинга
```

## Новый сайт для клиента

1. Скопируй папку `website-starter` и переименуй, например, в `kawiarnia-pod-lipa`.
2. В новой папке: `npm install`, потом `npm run dev`.
3. Поменяй цвета и шрифты в начале `src/style.css` (блок `НАСТРОЙКИ БРЕНДА`).
4. Поменяй тексты, телефон, адрес в `index.html`.
5. Картинки клади в папку `public/` и подключай так: `<img src="/foto.jpg">`.
6. `npm run build`, и папку `dist/` заливаешь на хостинг (Netlify, Vercel, cyber_Folks и т.д.).

## Анимации — шпаргалка

Добавь атрибут к любому элементу:

| Атрибут | Что делает |
|---|---|
| `data-animate="fade-up"` | выезжает снизу и проявляется |
| `data-animate="fade-down"` | сверху |
| `data-animate="fade-left"` | слева |
| `data-animate="fade-right"` | справа |
| `data-animate="fade"` | просто проявляется |
| `data-animate="zoom"` | проявляется с лёгким увеличением |
| `data-animate="stagger"` | **дочерние** элементы появляются по очереди (для карточек, списков) |
| `data-animate="split"` | заголовок появляется по словам из-под маски |
| `data-animate="counter"` | число досчитывает до значения (`1200+`, `4.9`, `98%`) |
| `data-parallax="0.2"` | параллакс: элемент едет медленнее страницы (0.1–0.4) |
| `data-hero="1"`, `"2"`… | первый экран: появление при загрузке в этом порядке |

Дополнительно к `data-animate`:
- `data-delay="0.2"` — задержка в секундах
- `data-duration="1.2"` — длительность в секундах

Пример:

```html
<h2 data-animate="split">Nasza oferta</h2>
<p data-animate="fade-up" data-delay="0.2">Tekst pod nagłówkiem</p>
```

## Плавный скролл (Lenis)

Включён по умолчанию. Чтобы выключить на конкретном сайте, закомментируй
`initSmoothScroll();` в `src/main.js`. Совет: для «имиджевых» сайтов оставляй, для простых
сайтов-визиток, где нужно быстро найти телефон, можно выключить.

Настройка «тягучести»: параметр `duration` в `src/animations/smooth-scroll.js`.

## Доступность

Если у человека в системе включено «уменьшить движение», анимации и плавный скролл
отключаются сами, и контент сразу виден.

## Структура

```
index.html                       страница-пример (шапка, первый экран, цифры, услуги, о нас, отзывы, контакты)
src/main.js                      точка входа
src/style.css                    стили + настройки бренда
src/animations/smooth-scroll.js  Lenis + связка с ScrollTrigger
src/animations/scroll-animations.js  все data-animate эффекты
src/animations/hero.js           анимация первого экрана
public/                          картинки, favicon
```
