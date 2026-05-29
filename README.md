# Paseditor Portfolio

Готовая статическая визитка для GitHub Pages: `index.html`, `styles.css`, `script.js` и SVG-фавиконка. Сайт вдохновлён тёмным космическим портфолио: карточка героя, навыки, инструменты, проекты, контакты, анимации, звёздный canvas-фон, typed-text, tilt hover, scroll reveal, счётчики и переключение темы.

## Как изменить под себя

1. Открой `index.html`.
2. Замени ссылки:
   - `https://github.com/Paseditor`
   - `https://t.me/your_username`
   - `you@example.com`
3. В блоке `Projects` замени названия и ссылки на свои проекты.
4. В блоке `Skills` поменяй проценты в `data-percent` и `--value`.
5. В `styles.css` можно поменять цвета в `:root`.

## Как выложить на GitHub Pages

### Вариант 1: репозиторий пользователя

1. Создай репозиторий с названием `Paseditor.github.io`.
2. Загрузи все файлы из этой папки в корень репозитория.
3. Открой `https://Paseditor.github.io`.

### Вариант 2: обычный репозиторий

1. Создай любой публичный репозиторий, например `portfolio`.
2. Загрузи файлы в корень репозитория.
3. Открой **Settings → Pages**.
4. В **Build and deployment** выбери **Deploy from a branch**.
5. Branch: `main`, folder: `/root`, затем Save.
6. Сайт будет доступен по адресу вроде `https://Paseditor.github.io/portfolio/`.

## Файлы

- `index.html` — структура сайта.
- `styles.css` — дизайн и CSS-анимации.
- `script.js` — интерактив, звёзды, счётчики, typed-text.
- `assets/favicon.svg` — иконка сайта.
- `.nojekyll` — отключает Jekyll-обработку на GitHub Pages.
