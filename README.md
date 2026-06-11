# Техочистка

Статический сайт компании по пескоструйной обработке металла, фасадов, кирпича и дерева.

## Что внутри

- Главная страница с hero-блоком, CTA и формой заявки с загрузкой фото.
- Страницы услуг:
  - `/services/metal.html`
  - `/services/facades.html`
  - `/services/wood.html`
- Страница «Портфолио и контакты»: `/portfolio.html`.
- Отдельные SEO-страницы городов в `/cities/`.
- Schema.org микроразметка: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, canonical URL, Open Graph и Twitter Card.
- Адаптивный дизайн в стиле industrial premium.

## Запуск

```bash
npm run build
npm run serve
```

После сборки готовый сайт находится в папке `dist`.

## Деплой

- Netlify: конфигурация уже задана в `netlify.toml`, publish directory — `dist`.
- Vercel: конфигурация уже задана в `vercel.json`, output directory — `dist`.
- Любой статический хостинг: в качестве корня сайта нужно публиковать папку `dist`, а не корень репозитория.
- GitHub Pages без отдельного workflow не читает `dist` как корень сайта автоматически; для Pages нужно настроить GitHub Actions или публиковать содержимое `dist`.

## Перед публикацией

В `scripts/build-site.mjs` при необходимости замените:

- `baseUrl` на рабочий домен;
- `phone`, `phoneHref`, `email`, `streetAddress` на актуальные контакты;
- hero-видео на собственный ролик пескоструйной очистки, если есть фирменная съемка.

Формы подготовлены для Netlify Forms (`data-netlify="true"`) и используют `multipart/form-data` для загрузки фото объекта.
