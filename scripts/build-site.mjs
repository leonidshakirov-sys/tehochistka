import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const dist = path.join(root, "dist");
const baseUrl = "https://tehochistka.ru";
const phone = "+7 (916) 265-92-62";
const phoneHref = "tel:+79162659262";
const email = "tehochistka@mail.ru";
const streetAddress = "32-й км МКАД, владение 15";
const addressLocality = "Москва";
const fullAddress = `${addressLocality}, ${streetAddress}`;

const images = {
  hero: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=82",
  metal: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=82",
  facade: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=82",
  wood: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=82",
  hangar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82",
  fence: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=82",
  height: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=82",
  compressor: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=82",
  before: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=1000&q=80",
  after: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
};

const heroVideo = "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a9/Angle_Grinder_cutting_a_steel_chain_-_Video.webm/Angle_Grinder_cutting_a_steel_chain_-_Video.webm.360p.webm";

const cities = [
  ["domodedovo", "Домодедово"],
  ["podolsk", "Подольск"],
  ["vidnoe", "Видное"],
  ["chekhov", "Чехов"],
  ["serpukhov", "Серпухов"],
  ["stupino", "Ступино"],
  ["kashira", "Кашира"],
  ["ozery", "Озеры"],
  ["kolomna", "Коломна"],
  ["bronnitsy", "Бронницы"],
  ["ramenskoe", "Раменское"],
  ["zhukovsky", "Жуковский"],
  ["lyubertsy", "Люберцы"],
  ["dzerzhinsky", "Дзержинский"],
  ["moskva", "Москва"],
].map(([slug, name]) => ({ slug, name, path: `/cities/${slug}.html` }));

const services = [
  {
    slug: "metal",
    title: "Пескоструйная обработка металла",
    nav: "Металл",
    path: "/services/metal.html",
    image: images.metal,
    description: "Удаление ржавчины, окалины, старой краски и подготовка металлоконструкций к грунту и окраске.",
    keywords: "пескоструйная обработка металла, удаление ржавчины, пескоструй Московская область",
    bullets: ["фермы, балки, швеллер, трубы и закладные", "ангары, ворота, заборы и емкости", "степень очистки под грунт, эмаль или огнезащиту"],
  },
  {
    slug: "facades",
    title: "Очистка фасадов и кирпича",
    nav: "Фасады",
    path: "/services/facades.html",
    image: images.facade,
    description: "Деликатная абразивная очистка кирпича, бетона, натурального камня и промышленных фасадов.",
    keywords: "очистка фасада, очистка кирпича, пескоструй Чехов, пескоструй Домодедово",
    bullets: ["снятие высолов, сажи, краски и цементного налета", "работа на высоте и локальная защита окон", "подбор фракции под состояние кладки"],
  },
  {
    slug: "wood",
    title: "Пескоструйная обработка дерева",
    nav: "Дерево",
    path: "/services/wood.html",
    image: images.wood,
    description: "Мягкая очистка и браширование деревянных домов, срубов, террас, балок и фасадной доски.",
    keywords: "пескоструй дерева, пескоструйная обработка дерева, пескоструй Подольск",
    bullets: ["снятие старой краски без грубой шлифовки", "подготовка к маслу, антисептику и покраске", "аккуратная работа с углами, венцами и наличниками"],
  },
];

const prices = [
  ["Металл", "от 450 ₽/м²", "Ржавчина, краска, окалина, подготовка под окраску"],
  ["Кирпич и фасад", "от 550 ₽/м²", "Высолы, копоть, старые покрытия, следы раствора"],
  ["Дерево", "от 650 ₽/м²", "Срубы, дома, балки, мягкое раскрытие фактуры"],
  ["Выезд и пробная зона", "по запросу", "Осмотр объекта, тест абразива, расчет сметы по фото"],
];

const faqs = [
  ["Можно рассчитать стоимость по фото?", "Да. Отправьте общий вид, крупный план загрязнения и примерную площадь. Мы уточним материал, доступ к объекту и предложим диапазон цены."],
  ["Вы работаете по Москве и Московской области?", "Да. Основная география: Москва, Домодедово, Подольск, Видное, Чехов, Серпухов, Ступино, Кашира, Озеры, Коломна, Бронницы, Раменское, Жуковский, Люберцы и Дзержинский."],
  ["Какие поверхности можно очищать?", "Металл, кирпич, бетон, камень и дерево. Абразив, давление и режим подбираются под материал, чтобы получить нужную степень очистки без лишнего повреждения основы."],
  ["Нужно ли подготавливать объект?", "Желательно обеспечить доступ, электричество при необходимости и место под компрессор. Окна, готовые покрытия и инженерные элементы закрываются перед работой."],
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function write(filePath, content) {
  const target = path.join(dist, filePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function canonical(pagePath) {
  if (pagePath === "/") return `${baseUrl}/`;
  return `${baseUrl}${pagePath}`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    name: "Техочистка",
    url: baseUrl,
    telephone: phone,
    email,
    image: images.hero,
    priceRange: "₽₽",
    areaServed: cities.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        areaServed: "Москва и Московская область",
      },
    })),
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

function layout({ title, description, keywords, pagePath, body, schemas = [], current = "", robots = "index, follow, max-image-preview:large" }) {
  const pageTitle = `${title} | Техочистка`;
  const pageUrl = canonical(pagePath);
  const schemaTags = [localBusinessSchema(), ...schemas]
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n");

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <meta name="robots" content="${esc(robots)}">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(pageTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${images.hero}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preconnect" href="https://upload.wikimedia.org">
  <link rel="stylesheet" href="/assets/styles.css">
  ${schemaTags}
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="/" aria-label="Техочистка">
        <span class="brand-mark">Т</span>
        <span>Техочистка</span>
      </a>
      <nav class="menu" data-menu aria-label="Основная навигация">
        <a href="/" ${current === "home" ? 'aria-current="page"' : ""}>Главная</a>
        ${services.map((service) => `<a href="${service.path}" ${current === service.slug ? 'aria-current="page"' : ""}>${service.nav}</a>`).join("")}
        <a href="/portfolio.html" ${current === "portfolio" ? 'aria-current="page"' : ""}>Портфолио и контакты</a>
      </nav>
      <div class="header-actions">
        <a class="phone-link" href="${phoneHref}">${phone}</a>
        <a class="button button-primary" href="#request">Заявка</a>
        <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" data-menu-toggle>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <main>
    ${body}
  </main>
  ${footer()}
  <script src="/assets/app.js" defer></script>
</body>
</html>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="/"><span class="brand-mark">Т</span><span>Техочистка</span></a>
          <p class="muted" style="margin-top:18px;max-width:520px">Пескоструйная обработка металла, очистка фасадов, кирпича и дерева с выездом по Москве и Московской области.</p>
        </div>
        <div class="footer-links">
          <strong>Услуги</strong>
          ${services.map((service) => `<a href="${service.path}">${service.title}</a>`).join("")}
        </div>
        <div class="footer-links">
          <strong>Контакты</strong>
          <a href="${phoneHref}">${phone}</a>
          <a href="mailto:${email}">${email}</a>
          <span>${fullAddress}</span>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} Техочистка. Индустриальная очистка поверхностей.</div>
    </div>
  </footer>`;
}

function leadForm(context = "Общая заявка") {
  const fieldId = context
    .toLowerCase()
    .replaceAll(/[^a-zа-яё0-9]+/giu, "-")
    .replaceAll(/^-|-$/g, "");

  return `<form class="form-grid" name="lead" method="POST" action="/thanks.html" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="lead">
    <input type="hidden" name="page" value="${esc(context)}">
    <p style="display:none"><label>Не заполняйте это поле <input name="bot-field"></label></p>
    <div class="field">
      <label for="name-${fieldId}">Имя</label>
      <input id="name-${fieldId}" name="name" autocomplete="name" placeholder="Как к вам обращаться" required>
    </div>
    <div class="field">
      <label for="phone-${fieldId}">Телефон</label>
      <input id="phone-${fieldId}" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 ___ ___-__-__" required>
    </div>
    <div class="field">
      <label for="photo-${fieldId}">Загрузить фото объекта</label>
      <input id="photo-${fieldId}" name="photos" type="file" accept="image/*" multiple>
      <small class="muted" data-file-note>Можно приложить фото металла, фасада, кирпича или дерева.</small>
    </div>
    <div class="field">
      <label for="message-${fieldId}">Комментарий</label>
      <textarea id="message-${fieldId}" name="message" placeholder="Материал, площадь, город, что нужно удалить"></textarea>
    </div>
    <button class="button button-primary" type="submit">Рассчитать стоимость</button>
    <p class="form-note">Нажимая кнопку, вы соглашаетесь на обработку данных для подготовки расчета.</p>
  </form>`;
}

function breadcrumbs(items) {
  return `<div class="breadcrumbs">${items.map((item, index) => (
    index === items.length - 1 ? `<span>${item.name}</span>` : `<a href="${item.path}">${item.name}</a><span>/</span>`
  )).join("")}</div>`;
}

function advantages() {
  const items = [
    ["01", "Выездная бригада", "Работаем на объекте: ангары, фасады, заборы, металлоконструкции и деревянные дома."],
    ["02", "Подбор абразива", "Настраиваем давление, фракцию и производительность под металл, кирпич или дерево."],
    ["03", "Подготовка под покрытие", "Получаем чистую поверхность под грунт, ЛКМ, огнезащиту, масло или антисептик."],
    ["04", "Расчет по фото", "Быстро оцениваем площадь, сложность доступа, загрязнение и логистику по Москве и области."],
  ];
  return `<section class="section" id="advantages">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Преимущества</span><h2>Премиальный подход к промышленной очистке</h2></div>
        <p>Пескоструйные работы требуют точной настройки оборудования и аккуратной защиты объекта. Мы проектируем процесс до выезда бригады.</p>
      </div>
      <div class="grid grid-4">${items.map(([num, title, text]) => `<article class="card icon-card"><span class="icon">${num}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
    </div>
  </section>`;
}

function servicesSection() {
  return `<section class="section" id="services">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Наши услуги</span><h2>Очищаем металл, фасады, кирпич и дерево</h2></div>
        <p>Берем частные и промышленные объекты: от забора и сруба до ангара, склада или фасада производственного корпуса.</p>
      </div>
      <div class="grid grid-3">${services.map((service) => `<article class="card service-card">
        <img src="${service.image}" alt="${service.title}" loading="lazy">
        <div class="card-pad"><h3>${service.title}</h3><p>${service.description}</p><a class="button button-dark" href="${service.path}">Подробнее</a></div>
      </article>`).join("")}</div>
    </div>
  </section>`;
}

function beforeAfterSection() {
  return `<section class="section" id="before-after">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">До/После</span><h2>Видимый результат за один цикл очистки</h2></div>
        <p>Удаляем ржавчину, старую краску, загрязнения, высолы и следы атмосферного износа. Финальный режим зависит от материала и задачи покрытия.</p>
      </div>
      <div class="card before-after">
        <figure><img src="${images.before}" alt="Металлическая поверхность до пескоструйной очистки" loading="lazy"><figcaption>До</figcaption></figure>
        <figure><img src="${images.after}" alt="Металлическая поверхность после пескоструйной очистки" loading="lazy"><figcaption>После</figcaption></figure>
      </div>
    </div>
  </section>`;
}

function pricesSection() {
  return `<section class="section" id="prices">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Цены</span><h2>Стоимость зависит от материала, доступа и степени очистки</h2></div>
        <p>Точную смету готовим после фото или осмотра. Учитываем площадь, толщину покрытия, высоту, необходимость укрытия и вывоз абразива.</p>
      </div>
      <div class="price-table">${prices.map(([name, price, note]) => `<div class="price-row"><span>${name}</span><strong>${price}</strong><span class="muted">${note}</span></div>`).join("")}</div>
    </div>
  </section>`;
}

function equipmentSection() {
  return `<section class="section" id="equipment">
    <div class="container">
      <div class="equipment-strip">
        <div class="card media-card"><img src="${images.compressor}" alt="Компрессор и пескоструйное оборудование на объекте" loading="lazy"></div>
        <div class="card card-pad">
          <span class="eyebrow">Оборудование</span>
          <h2>Компрессоры, пескоструйные аппараты и защита зоны работ</h2>
          <p class="muted">Используем выездные компрессоры, аппараты напорного типа, сопла под разные задачи, рукава, СИЗ и укрывные материалы для защиты окружающих поверхностей.</p>
          <ul class="list">
            <li>Подбор абразива под металл, кирпич, бетон или дерево.</li>
            <li>Контроль пыли и ограничение зоны очистки.</li>
            <li>Работа на высоте с подготовкой доступа и страховкой.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

function casesSection() {
  const cases = [
    ["Ангар и фермы", images.hangar, "Очистка металлоконструкций от ржавчины и старого покрытия перед окраской."],
    ["Кирпичный фасад", images.facade, "Удаление высолов, копоти и следов раствора с сохранением фактуры кирпича."],
    ["Деревянный дом", images.wood, "Мягкая очистка сруба и подготовка древесины к защитному составу."],
    ["Забор и ворота", images.fence, "Снятие краски и коррозии перед грунтованием и финишной эмалью."],
    ["Работа на высоте", images.height, "Очистка промышленных фасадов и элементов с организацией безопасного доступа."],
    ["Промышленная площадка", images.metal, "Пескоструй металла на действующем объекте с локальным ограждением зоны работ."],
  ];
  return `<section class="section" id="cases">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Кейсы</span><h2>Объекты разного масштаба</h2></div>
        <p>Показываем типовые задачи, которые чаще всего решают пескоструйные работы в Московской области.</p>
      </div>
      <div class="grid grid-3">${cases.map(([title, image, text]) => `<article class="card case-card"><img src="${image}" alt="${title}" loading="lazy"><div class="card-pad"><h3>${title}</h3><p>${text}</p></div></article>`).join("")}</div>
    </div>
  </section>`;
}

function reviewsSection() {
  const reviews = [
    ["Производственный цех", "Бригада очистила фермы и колонны перед окраской. Смету сделали по фото, на объекте подтвердили объем и уложились в согласованный режим."],
    ["Частный дом", "Снимали старую краску со сруба. Дерево не порвали, фактура стала ровной, мастера подсказали дальнейшую обработку маслом."],
    ["Кирпичный фасад", "После очистки ушли высолы и пятна от раствора. Аккуратно закрыли окна и отработали проблемные зоны на высоте."],
  ];
  return `<section class="section" id="reviews">
    <div class="container">
      <div class="section-head"><div><span class="eyebrow">Отзывы</span><h2>Клиенты ценят аккуратность на объекте</h2></div></div>
      <div class="grid grid-3">${reviews.map(([name, text]) => `<article class="card card-pad review-card"><h3>${name}</h3><p>${text}</p></article>`).join("")}</div>
    </div>
  </section>`;
}

function geographySection() {
  return `<section class="section" id="geography">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">География работ</span><h2>Пескоструй по Москве и югу/юго-востоку области</h2></div>
        <p>Сделали отдельные SEO-страницы под города, где чаще всего нужны выездные пескоструйные работы.</p>
      </div>
      <div class="city-grid">${cities.map((city) => `<a class="city-pill" href="${city.path}">Пескоструй ${city.name}</a>`).join("")}</div>
    </div>
  </section>`;
}

function faqSection() {
  return `<section class="section" id="faq">
    <div class="container">
      <div class="section-head"><div><span class="eyebrow">FAQ</span><h2>Ответы на частые вопросы</h2></div></div>
      <div class="grid">${faqs.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div>
    </div>
  </section>`;
}

function contactCta(context) {
  return `<section class="section" id="request">
    <div class="container">
      <div class="cta-band grid grid-2">
        <div>
          <span class="eyebrow">Заявка</span>
          <h2>Пришлите фото объекта — рассчитаем стоимость пескоструя</h2>
          <p class="lead">Укажите город, материал, примерную площадь и что нужно удалить: ржавчину, краску, высолы, копоть или старый лак.</p>
          <p class="muted">Телефон: <a href="${phoneHref}">${phone}</a><br>Email: <a href="mailto:${email}">${email}</a><br>Адрес: ${fullAddress}</p>
        </div>
        <div class="form-card card-pad">${leadForm(context)}</div>
      </div>
    </div>
  </section>`;
}

function homePage() {
  const body = `<section class="hero">
    <div class="hero-media" aria-hidden="true">
      <video autoplay muted loop playsinline poster="${images.hero}">
        <source src="${heroVideo}" type="video/webm">
      </video>
    </div>
    <div class="container hero-grid">
      <div>
        <span class="eyebrow">Пескоструйные работы 2026</span>
        <h1>Пескоструйная обработка металла, фасадов и дерева в Московской области</h1>
        <p class="lead">Удаляем ржавчину, старую краску и загрязнения. Выезд по Москве и области.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#request">Рассчитать стоимость</a>
          <a class="button button-secondary" href="#request">Отправить фото объекта</a>
        </div>
        <div class="hero-facts">
          <div class="fact"><strong>3</strong><span>ключевых направления: металл, фасады, дерево</span></div>
          <div class="fact"><strong>15</strong><span>городских SEO-страниц по Московской области</span></div>
          <div class="fact"><strong>24/7</strong><span>заявки через форму с загрузкой фото</span></div>
        </div>
      </div>
      <aside class="request-card">
        <h3>Быстрый расчет по фото</h3>
        <p>Прикрепите снимки объекта, и мы подготовим предварительную смету на пескоструйную обработку.</p>
        ${leadForm("Главная")}
      </aside>
    </div>
  </section>
  ${advantages()}
  ${servicesSection()}
  ${beforeAfterSection()}
  ${pricesSection()}
  ${equipmentSection()}
  ${casesSection()}
  ${reviewsSection()}
  ${geographySection()}
  ${faqSection()}
  ${contactCta("Главная нижняя форма")}`;

  return layout({
    title: "Пескоструйная обработка металла, фасадов и дерева в Московской области",
    description: "Техочистка: пескоструйная обработка металла, очистка фасада и кирпича, пескоструй дерева. Удаление ржавчины, краски и загрязнений по Москве и Московской области.",
    keywords: "пескоструйная обработка металла, очистка фасада, очистка кирпича, удаление ржавчины, пескоструй дерева, пескоструй Московская область, пескоструй Чехов, пескоструй Домодедово, пескоструй Подольск",
    pagePath: "/",
    current: "home",
    schemas: [faqSchema(), breadcrumbSchema([{ name: "Главная", path: "/" }])],
    body,
  });
}

function servicePage(service) {
  const body = `<section class="page-hero" style="--hero-image:url('${service.image}')">
    <div class="container">
      ${breadcrumbs([{ name: "Главная", path: "/" }, { name: service.title, path: service.path }])}
      <span class="eyebrow">Услуга</span>
      <h1>${service.title}</h1>
      <p class="lead">${service.description}</p>
      <div class="hero-actions"><a class="button button-primary" href="#request">Рассчитать стоимость</a><a class="button button-secondary" href="#process">Как работаем</a></div>
    </div>
  </section>
  <section class="section" id="process">
    <div class="container grid grid-2">
      <div>
        <span class="eyebrow">Процесс</span>
        <h2>Настраиваем режим очистки под поверхность</h2>
        <p class="muted">Пескоструйная обработка начинается с оценки материала, загрязнения и требуемого результата. Для металла важна степень удаления коррозии, для кирпича — сохранение фактуры, для дерева — мягкий режим без глубоких рисок.</p>
      </div>
      <div class="card card-pad">
        <h3>Что входит</h3>
        <ul class="list">${service.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
      </div>
    </div>
  </section>
  ${pricesSection()}
  ${beforeAfterSection()}
  ${contactCta(service.title)}`;

  return layout({
    title: service.title,
    description: `${service.title} от компании Техочистка. ${service.description} Выезд по Москве, Подольску, Домодедово, Чехову и Московской области.`,
    keywords: service.keywords,
    pagePath: service.path,
    current: service.slug,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: "Москва и Московская область",
        description: service.description,
      },
      breadcrumbSchema([{ name: "Главная", path: "/" }, { name: service.title, path: service.path }]),
    ],
    body,
  });
}

function portfolioPage() {
  const body = `<section class="page-hero" style="--hero-image:url('${images.hangar}')">
    <div class="container">
      ${breadcrumbs([{ name: "Главная", path: "/" }, { name: "Портфолио и контакты", path: "/portfolio.html" }])}
      <span class="eyebrow">Портфолио и контакты</span>
      <h1>Кейсы пескоструйной очистки и заявка на расчет</h1>
      <p class="lead">Металлоконструкции, кирпичные фасады, деревянные дома, ангары, заборы и работа на высоте по Москве и Московской области.</p>
    </div>
  </section>
  ${casesSection()}
  ${reviewsSection()}
  ${geographySection()}
  ${contactCta("Портфолио и контакты")}`;

  return layout({
    title: "Портфолио и контакты",
    description: "Портфолио Техочистка: пескоструй металла, очистка фасада и кирпича, пескоструй дерева. Контакты и форма заявки с загрузкой фото объекта.",
    keywords: "пескоструй портфолио, пескоструй контакты, пескоструй Московская область",
    pagePath: "/portfolio.html",
    current: "portfolio",
    schemas: [breadcrumbSchema([{ name: "Главная", path: "/" }, { name: "Портфолио и контакты", path: "/portfolio.html" }])],
    body,
  });
}

function cityPage(city) {
  const title = `Пескоструй ${city.name}`;
  const body = `<section class="page-hero" style="--hero-image:url('${images.metal}')">
    <div class="container">
      ${breadcrumbs([{ name: "Главная", path: "/" }, { name: title, path: city.path }])}
      <span class="eyebrow">Городская SEO-страница</span>
      <h1>Пескоструйная обработка в городе ${city.name}</h1>
      <p class="lead">Техочистка выполняет пескоструйную обработку металла, очистку фасада, очистку кирпича и пескоструй дерева в городе ${city.name} и рядом по Московской области.</p>
      <div class="hero-actions"><a class="button button-primary" href="#request">Рассчитать стоимость</a><a class="button button-secondary" href="#services">Услуги в городе</a></div>
    </div>
  </section>
  <section class="section" id="services">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Пескоструй ${city.name}</span><h2>Выездная очистка поверхностей под ремонт и покраску</h2></div>
        <p>Работаем на частных участках, производственных площадках, складах, фасадах и строительных объектах. Предварительный расчет можно получить по фото.</p>
      </div>
      <div class="grid grid-3">${services.map((service) => `<article class="card service-card"><img src="${service.image}" alt="${service.title} в городе ${city.name}" loading="lazy"><div class="card-pad"><h3>${service.title}</h3><p>${service.description}</p><a class="button button-dark" href="${service.path}">Подробнее</a></div></article>`).join("")}</div>
    </div>
  </section>
  <section class="section-tight">
    <div class="container grid grid-2">
      <div class="card card-pad">
        <h2>Что очищаем в городе ${city.name}</h2>
        <ul class="list">
          <li>металлоконструкции, ангары, фермы, ворота и заборы;</li>
          <li>кирпичные фасады, цоколи, стены, бетон и камень;</li>
          <li>деревянные дома, срубы, террасы, балки и фасадную доску;</li>
          <li>ржавчину, старую краску, высолы, копоть и загрязнения.</li>
        </ul>
      </div>
      <div class="card card-pad">
        <h2>Как получить смету</h2>
        <p class="muted">Отправьте фото объекта в городе ${city.name}, площадь и описание задачи. Мы уточним доступ, высоту, тип покрытия и предложим технологию: пескоструйная обработка металла, очистка фасада, очистка кирпича или пескоструй дерева.</p>
        <a class="button button-primary" href="#request">Отправить фото объекта</a>
      </div>
    </div>
  </section>
  ${pricesSection()}
  ${faqSection()}
  ${contactCta(`Пескоструй ${city.name}`)}`;

  return layout({
    title: `${title}: металл, фасады, кирпич и дерево`,
    description: `Пескоструй ${city.name}: обработка металла, очистка фасада и кирпича, удаление ржавчины, пескоструй дерева. Выездная бригада Техочистка по Московской области.`,
    keywords: `пескоструй ${city.name}, пескоструйная обработка металла ${city.name}, очистка фасада ${city.name}, очистка кирпича ${city.name}, удаление ржавчины ${city.name}, пескоструй дерева ${city.name}, пескоструй Московская область`,
    pagePath: city.path,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Пескоструйная обработка в городе ${city.name}`,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: { "@type": "City", name: city.name },
        description: `Пескоструй металла, фасадов, кирпича и дерева в городе ${city.name}.`,
      },
      faqSchema(),
      breadcrumbSchema([{ name: "Главная", path: "/" }, { name: title, path: city.path }]),
    ],
    body,
  });
}

function thanksPage() {
  const body = `<section class="page-hero" style="--hero-image:url('${images.metal}')">
    <div class="container">
      <span class="eyebrow">Спасибо</span>
      <h1>Заявка отправлена</h1>
      <p class="lead">Мы свяжемся с вами для уточнения объекта, площади и технологии пескоструйной обработки.</p>
      <div class="hero-actions"><a class="button button-primary" href="/">Вернуться на главную</a><a class="button button-secondary" href="/portfolio.html">Посмотреть кейсы</a></div>
    </div>
  </section>`;

  return layout({
    title: "Заявка отправлена",
    description: "Спасибо за заявку в Техочистка.",
    keywords: "пескоструйная обработка",
    pagePath: "/thanks.html",
    robots: "noindex, nofollow",
    body,
  });
}

function sitemap(paths) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((pagePath) => `  <url><loc>${canonical(pagePath)}</loc><changefreq>weekly</changefreq><priority>${pagePath === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Host: techochistka.ru
`;
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
fs.copyFileSync(path.join(root, "src", "styles.css"), path.join(dist, "assets", "styles.css"));
fs.copyFileSync(path.join(root, "src", "app.js"), path.join(dist, "assets", "app.js"));

const htmlPaths = ["/", ...services.map((service) => service.path), "/portfolio.html", ...cities.map((city) => city.path), "/thanks.html"];
const indexedPaths = htmlPaths.filter((pagePath) => pagePath !== "/thanks.html");

write("index.html", homePage());
services.forEach((service) => write(service.path.slice(1), servicePage(service)));
write("portfolio.html", portfolioPage());
cities.forEach((city) => write(city.path.slice(1), cityPage(city)));
write("thanks.html", thanksPage());
write("sitemap.xml", sitemap(indexedPaths));
write("robots.txt", robots());

console.log(`Built ${htmlPaths.length} HTML pages plus assets in dist/`);
