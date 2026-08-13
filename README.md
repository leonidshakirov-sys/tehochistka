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

## Деплой на GitHub Pages через `docs`

Для GitHub Pages используется отдельная сборка в папку `docs`:

```bash
npm run build:docs
```

После пуша изменений в GitHub откройте репозиторий и настройте Pages:

1. `Settings` → `Pages`.
2. В блоке `Build and deployment` выберите `Deploy from a branch`.
3. В поле `Branch` выберите `cursor/techochistka-website-0df2`.
4. В поле папки выберите `/docs`.
5. Нажмите `Save`.

Сборка `docs` настроена под собственный домен и автоматически создает `docs/CNAME`:

```text
tehochistka.ru
```

После публикации сайт должен быть доступен по адресу:

```text
https://tehochistka.ru/
```

Если позже будете публиковать из ветки `main`, сначала смержите PR, затем в настройках Pages выберите:

```text
Branch: main
Folder: /docs
```

### DNS для GitHub Pages

Для домена `tehochistka.ru` оставьте только A-записи GitHub Pages:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Удалите лишние A-записи, которые ведут не на GitHub Pages.

Для `www.tehochistka.ru` добавьте CNAME:

```text
leonidshakirov-sys.github.io
```

После обновления DNS в GitHub Pages включите `Enforce HTTPS`. Сертификат выпускается GitHub автоматически, но это может занять некоторое время после корректной DNS-настройки.

## Перед публикацией

В `scripts/build-site.mjs` при необходимости замените:

- `baseUrl` на рабочий домен;
- `phone`, `phoneHref`, `whatsappHref`, `email`, `streetAddress` на актуальные контакты;
- hero-видео на собственный ролик пескоструйной очистки, если есть фирменная съемка.

Формы отправляются через FormSubmit на `tehochistka@mail.ru` и используют `multipart/form-data` для загрузки фото объекта.
При первой заявке FormSubmit может прислать письмо для подтверждения адреса получателя.
