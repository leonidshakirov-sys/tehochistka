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

## Перед публикацией

В `scripts/build-site.mjs` замените:

- `baseUrl` на рабочий домен;
- `phone`, `phoneHref`, `email` на реальные контакты;
- hero-видео на собственный ролик пескоструйной очистки, если есть фирменная съемка.

Формы подготовлены для Netlify Forms (`data-netlify="true"`) и используют `multipart/form-data` для загрузки фото объекта.
