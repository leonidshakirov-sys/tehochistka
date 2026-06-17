import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const cliOptions = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith("--") && arg.includes("="))
    .map((arg) => {
      const [key, ...value] = arg.slice(2).split("=");
      return [key, value.join("=")];
    }),
);
const outputDir = cliOptions.output || process.env.BUILD_OUTPUT_DIR || "dist";
const pathPrefix = (cliOptions["path-prefix"] || process.env.SITE_PATH_PREFIX || "").replace(/\/$/, "");
const baseUrl = (cliOptions["base-url"] || process.env.SITE_BASE_URL || "https://tehochistka.ru").replace(/\/$/, "");
const dist = path.join(root, outputDir);
const phone = "+7 (916) 265-92-62";
const phoneHref = "tel:+79162659262";
const whatsappHref = "https://wa.me/79162659262";
const email = "tehochistka@mail.ru";
const streetAddress = "32-й км МКАД, владение 15";
const addressLocality = "Москва";
const fullAddress = `${addressLocality}, ${streetAddress}`;

const images = {
  hero: "https://commons.wikimedia.org/wiki/Special:FilePath/Sabbiatura.JPG",
  metal: "/assets/metal-sandblasting-industrial.png",
  facade: "/assets/facade-brick-abrasive-cleaning.png",
  wood: "/assets/wood-sandblasting-brushing-house.png",
  hangar: "https://images.unsplash.com/photo-1759310347407-b0dbfeb8745d?auto=format&fit=crop&w=1200&q=82",
  fence: "https://images.unsplash.com/photo-1712730160061-c64647e6c93c?auto=format&fit=crop&w=1200&q=82",
  height: "https://images.unsplash.com/photo-1777984947115-05de206fd91d?auto=format&fit=crop&w=1200&q=82",
  compressor: "/assets/sandblasting-compressor-equipment-no-logo.png",
  before: "https://images.unsplash.com/photo-1770208742346-e8bc33802d04?auto=format&fit=crop&w=1000&q=82",
  after: "https://images.unsplash.com/photo-1674471361410-99b7cbb8ffda?auto=format&fit=crop&w=1000&q=82",
  projectMetalBefore: "/assets/metal-before-sandblasting-structure.png",
  projectMetalAfter: "/assets/metal-after-sandblasting-structure.png",
  projectMetalComparison: "/assets/real-i-beam-before-after-same-angle.png",
};

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
    imageAlt: "Профессиональная пескоструйная очистка крупной металлической балки на промышленном объекте",
    description: "Профессиональная пескоструйная очистка металлоконструкций: удаляем ржавчину, старую краску и готовим балки, фермы, колонны к грунту и окраске.",
    keywords: "пескоструйная обработка металла, удаление ржавчины, пескоструй Московская область",
    bullets: ["фермы, балки, швеллер, трубы и закладные", "ангары, ворота, заборы и емкости", "подготовка поверхности под грунт, эмаль или огнезащиту"],
  },
  {
    slug: "facades",
    title: "Очистка фасадов и кирпича",
    nav: "Фасады",
    path: "/services/facades.html",
    image: images.facade,
    imageAlt: "Профессиональная абразивная очистка кирпичного и бетонного фасада коммерческого здания",
    description: "Аккуратная абразивная очистка кирпича, бетона, натурального камня и промышленных фасадов.",
    keywords: "очистка фасада, очистка кирпича, пескоструй Чехов, пескоструй Домодедово",
    bullets: ["снятие высолов, сажи, краски и цементного налета", "работа на высоте и локальная защита окон", "подбор фракции под состояние кладки"],
  },
  {
    slug: "wood",
    title: "Пескоструйная обработка дерева",
    nav: "Дерево",
    path: "/services/wood.html",
    image: images.wood,
    imageAlt: "Бережная пескоструйная очистка деревянного дома с проявлением натуральной текстуры древесины",
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

function sitePath(pagePath) {
  if (!pathPrefix || !pagePath.startsWith("/")) return pagePath;
  if (pagePath === "/") return `${pathPrefix}/`;
  return `${pathPrefix}${pagePath}`;
}

function siteHost() {
  try {
    return new URL(baseUrl).host;
  } catch {
    return "tehochistka.ru";
  }
}

function mediaSrc(src) {
  return src.startsWith("/") ? sitePath(src) : src;
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
  <link rel="stylesheet" href="${sitePath("/assets/styles.css")}">
  ${schemaTags}
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="${sitePath("/")}" aria-label="Техочистка">
        <span class="brand-mark">Т</span>
        <span>Техочистка</span>
      </a>
      <nav class="menu" data-menu aria-label="Основная навигация">
        <a href="${sitePath("/")}" ${current === "home" ? 'aria-current="page"' : ""}>Главная</a>
        ${services.map((service) => `<a href="${sitePath(service.path)}" ${current === service.slug ? 'aria-current="page"' : ""}>${service.nav}</a>`).join("")}
        <a href="${sitePath("/portfolio.html")}" ${current === "portfolio" ? 'aria-current="page"' : ""}>Портфолио и контакты</a>
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
  <script src="${sitePath("/assets/app.js")}" defer></script>
</body>
</html>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="${sitePath("/")}"><span class="brand-mark">Т</span><span>Техочистка</span></a>
          <p class="muted" style="margin-top:18px;max-width:520px">Пескоструйная обработка металла, очистка фасадов, кирпича и дерева с выездом по Москве и Московской области.</p>
        </div>
        <div class="footer-links">
          <strong>Услуги</strong>
          ${services.map((service) => `<a href="${sitePath(service.path)}">${service.title}</a>`).join("")}
        </div>
        <div class="footer-links">
          <strong>Контакты</strong>
          <a href="${phoneHref}">${phone}</a>
          <a href="mailto:${email}">${email}</a>
          <span>${fullAddress}</span>
          <a href="${sitePath("/sitemap.xml")}">Sitemap</a>
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

  return `<form class="form-grid" name="lead" method="POST" action="https://formsubmit.co/${email}" enctype="multipart/form-data" data-lead-form>
    <input type="hidden" name="_subject" value="Новая заявка с сайта Техочистка">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_next" value="${canonical("/thanks.html")}">
    <input type="hidden" name="page" value="${esc(context)}">
    <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="form-honey">
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
      <input id="photo-${fieldId}" name="attachment" type="file" accept="image/*">
      <small class="muted" data-file-note>Приложите одно фото до 5 МБ. Если фото тяжелое, отправьте его в WhatsApp.</small>
    </div>
    <div class="field">
      <label for="message-${fieldId}">Комментарий</label>
      <textarea id="message-${fieldId}" name="message" placeholder="Материал, площадь, город, что нужно удалить"></textarea>
    </div>
    <div class="form-actions">
      <button class="button button-primary" type="submit">Отправить заявку</button>
      <a class="button button-secondary" href="${whatsappHref}" target="_blank" rel="noopener">Фото в WhatsApp</a>
    </div>
    <p class="form-note">Заявка отправляется на ${email}. При первой отправке FormSubmit может попросить подтвердить адрес получателя.</p>
  </form>`;
}

function breadcrumbs(items) {
  return `<div class="breadcrumbs">${items.map((item, index) => (
    index === items.length - 1 ? `<span>${item.name}</span>` : `<a href="${sitePath(item.path)}">${item.name}</a><span>/</span>`
  )).join("")}</div>`;
}

function advantages() {
  const items = [
    ["01", "Выездная бригада", "Работаем на объекте: ангары, фасады, заборы, металлоконструкции и деревянные дома."],
    ["02", "Подбор абразива", "Настраиваем давление, фракцию и производительность под металл, кирпич, бетон или дерево."],
    ["03", "Готовим под покрытие", "Получаем поверхность под грунт, краску, огнезащиту, масло или антисептик."],
    ["04", "Расчет по фото", "Оцениваем площадь, доступ, загрязнение и выезд по Москве и Московской области."],
  ];
  return `<section class="section" id="advantages">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Преимущества</span><h2>Премиальный подход к промышленной очистке</h2></div>
        <p>Пескоструй требует точной настройки оборудования и защиты объекта. Мы заранее подбираем режим работ под материал и задачу.</p>
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
        <p>Работаем с частными и промышленными объектами: от забора и сруба до ангара, склада или фасада производственного корпуса.</p>
      </div>
      <div class="grid grid-3">${services.map((service) => `<article class="card service-card">
        <img src="${mediaSrc(service.image)}" alt="${service.imageAlt}" loading="lazy">
        <div class="card-pad"><h3>${service.title}</h3><p>${service.description}</p><a class="button button-dark" href="${sitePath(service.path)}">Подробнее</a></div>
      </article>`).join("")}</div>
    </div>
  </section>`;
}

function beforeAfterSection() {
  const projects = [
    {
      title: "Металлоконструкция на открытой площадке",
      comparison: images.projectMetalComparison,
      comparisonAlt: "Сравнение до и после пескоструйной очистки стальной двутавровой балки в одном ракурсе",
      result: "Фиксируем объект до начала работ и после очистки. Такой формат показывает реальный результат по металлу, а не абстрактную текстуру.",
    },
  ];

  return `<section class="section" id="before-after">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">До/После</span><h2>Реальные пары объектов: до обработки и после</h2></div>
      </div>
      <div class="before-after-projects">
        ${projects.map((project) => `<article class="card before-after-project">
          <div class="before-after-title">
            <h3>${project.title}</h3>
            <p>${project.result}</p>
          </div>
          <figure class="before-after-comparison">
            <img src="${mediaSrc(project.comparison)}" alt="${project.comparisonAlt}" loading="lazy">
            <span class="before-label">До пескоструя</span>
            <span class="after-label">После обработки</span>
          </figure>
        </article>`).join("")}
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
        <div class="card media-card"><img src="${mediaSrc(images.compressor)}" alt="Передвижной компрессор и пескоструйный аппарат без сторонних логотипов" loading="lazy"></div>
        <div class="card card-pad">
          <span class="eyebrow">Оборудование</span>
          <h2>Компрессоры, пескоструйные аппараты и защита зоны работ</h2>
          <p class="muted">Используем выездные компрессоры, аппараты напорного типа, сопла под разные задачи, рукава, средства защиты и укрывные материалы.</p>
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
    ["Металлоконструкции", images.metal, "Пескоструй металлической рамы", "На фото реальная операция пескоструйной обработки металлической рамы перед дальнейшей покраской."],
    ["Кирпичный фасад", images.facade, "Рабочий у кирпичного фасада со строительными лесами", "Так выглядит объект, где требуется очистка кирпича, защита окон и аккуратная работа рядом с лесами."],
    ["Деревянный дом", images.wood, "Бережная очистка деревянного фасада с проявлением натуральной фактуры", "Мягкая абразивная очистка убирает серый выветренный слой и раскрывает теплую текстуру дерева без грубого повреждения поверхности."],
    ["Ангар и склад", images.hangar, "Промышленное здание с металлическим сайдингом", "Пример промышленного здания, где очищают металлические элементы, ворота, фермы и фасадные участки."],
    ["Работа на высоте", images.height, "Рабочий на строительных лесах у фасада", "Фото показывает высотный доступ у фасада: такие работы требуют лесов, страховки и защиты зоны вокруг."],
    ["Оборудование", images.compressor, "Передвижной компрессор и пескоструйный аппарат без сторонних логотипов", "Для пескоструя на объекте нужен производительный компрессор, рукава и аппарат напорного типа."],
  ];
  return `<section class="section" id="cases">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">Кейсы</span><h2>Объекты разного масштаба</h2></div>
        <p>Показываем типовые задачи, которые чаще всего решают пескоструйные работы в Московской области.</p>
      </div>
      <div class="grid grid-3">${cases.map(([title, image, imageAlt, text]) => `<article class="card case-card"><img src="${mediaSrc(image)}" alt="${imageAlt}" loading="lazy"><div class="card-pad"><h3>${title}</h3><p>${text}</p></div></article>`).join("")}</div>
    </div>
  </section>`;
}

function reviewsSection() {
  const reviews = [
    {
      category: "Металл",
      title: "Производственный цех",
      image: "/assets/review-metal-before-after.png",
      alt: "До и после пескоструйной очистки металлоконструкций производственного цеха",
      quote: "Очистили фермы и балки без лишней суеты. После пескоструя грунт лег ровно, маляры сразу сказали, что на подготовке сэкономили время.",
      author: "Алексей, производственный объект",
    },
    {
      category: "Дерево",
      title: "Частный дом",
      image: "/assets/review-wood-before-after.png",
      alt: "До и после мягкой абразивной очистки деревянного дома",
      quote: "Сруб стал заметно светлее, фактура дерева раскрылась без задиров. Работали аккуратно, рядом с окнами и террасой ничего не повредили.",
      author: "Ирина, деревянный дом",
    },
    {
      category: "Фасад",
      title: "Кирпичный фасад",
      image: "/assets/review-facade-before-after.png",
      alt: "До и после абразивной очистки кирпичного фасада",
      quote: "Убрали высолы и старые пятна на кирпиче. Зону закрыли, после работ не пришлось переделывать отмостку и окна — все оставили чисто.",
      author: "Дмитрий, фасад дома",
    },
  ];
  return `<section class="section reviews-section" id="reviews">
    <div class="container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Отзывы клиентов</span>
          <h2>Что говорят клиенты после работ</h2>
          <p>Показываем реальный объект, фото и слова заказчика.</p>
        </div>
        <div class="review-controls" aria-label="Навигация по отзывам">
          <button class="slider-button" type="button" aria-label="Предыдущий отзыв" data-review-prev>←</button>
          <button class="slider-button" type="button" aria-label="Следующий отзыв" data-review-next>→</button>
        </div>
      </div>
      <div class="review-slider" data-review-slider>
        ${reviews.map((review, index) => `<article class="card review-case" data-review-slide>
          <div class="review-image-wrap">
            <img src="${mediaSrc(review.image)}" alt="${review.alt}" loading="lazy">
          </div>
          <div class="review-content">
            <span class="review-badge">${review.category}</span>
            <h3>${review.title}</h3>
            <blockquote>«${review.quote}»</blockquote>
            <p class="review-author">${review.author}</p>
          </div>
        </article>`).join("")}
      </div>
      <div class="review-dots" aria-label="Отзывы">${reviews.map((review, index) => `<button type="button" aria-label="Показать отзыв ${index + 1}" data-review-dot="${index}" ${index === 0 ? 'aria-current="true"' : ""}></button>`).join("")}</div>
    </div>
  </section>`;
}

function geographySection() {
  return `<section class="section" id="geography">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">География работ</span><h2>Пескоструй по Москве и Московской области.</h2></div>
      </div>
      <div class="city-grid">${cities.map((city) => `<a class="city-pill" href="${sitePath(city.path)}">Пескоструй ${city.name}</a>`).join("")}</div>
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
      <img src="${mediaSrc(images.hero)}" alt="Рабочий выполняет пескоструйную очистку в защитной экипировке">
    </div>
    <div class="container hero-grid">
      <div>
        <span class="eyebrow">Пескоструйные работы</span>
        <h1 class="hero-heading">
          <span class="hero-heading-accent">Пескоструйная</span>
          <span class="hero-heading-main">обработка</span>
          <span class="hero-heading-sub">металла, фасадов и дерева</span>
        </h1>
        <p class="lead">Удаляем ржавчину, старую краску и загрязнения. Выезд по Москве и области.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#request">Рассчитать стоимость</a>
          <a class="button button-secondary" href="#request">Отправить фото объекта</a>
        </div>
        <div class="hero-location-badge">Москва и Московская область</div>
        <div class="hero-facts">
          <div class="fact"><strong>3</strong><span>ключевых направления: металл, фасады, дерево</span></div>
          <div class="fact fact-text-only"><span>Выезд по Москве и Московской области</span></div>
          <div class="fact"><strong>24/7</strong><span>заявки через форму или WhatsApp</span></div>
        </div>
      </div>
      <aside class="request-card">
        <h3>Быстрый расчет по фото</h3>
        <p>Прикрепите фото объекта, и мы подготовим предварительный расчет.</p>
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
  const body = `<section class="page-hero" style="--hero-image:url('${mediaSrc(service.image)}')">
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
        <p class="muted">Пескоструйная обработка начинается с оценки материала, загрязнения и нужного результата. Для металла важна степень удаления коррозии, для кирпича — сохранение фактуры, для дерева — мягкий режим без глубоких рисок.</p>
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
  const body = `<section class="page-hero" style="--hero-image:url('${mediaSrc(images.hangar)}')">
    <div class="container">
      ${breadcrumbs([{ name: "Главная", path: "/" }, { name: "Портфолио и контакты", path: "/portfolio.html" }])}
      <span class="eyebrow">Портфолио и контакты</span>
      <h1>Кейсы пескоструйной очистки и заявка на расчет</h1>
      <p class="lead">Металлоконструкции, кирпичные фасады, деревянные дома, ангары, заборы и высотные работы по Москве и Московской области.</p>
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
  const body = `<section class="page-hero" style="--hero-image:url('${mediaSrc(images.metal)}')">
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
      <div class="grid grid-3">${services.map((service) => `<article class="card service-card"><img src="${mediaSrc(service.image)}" alt="${service.imageAlt} в городе ${city.name}" loading="lazy"><div class="card-pad"><h3>${service.title}</h3><p>${service.description}</p><a class="button button-dark" href="${sitePath(service.path)}">Подробнее</a></div></article>`).join("")}</div>
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
  const body = `<section class="page-hero" style="--hero-image:url('${mediaSrc(images.metal)}')">
    <div class="container">
      <span class="eyebrow">Спасибо</span>
      <h1>Заявка отправлена</h1>
      <p class="lead">Мы свяжемся с вами для уточнения объекта, площади и технологии пескоструйной обработки.</p>
      <div class="hero-actions"><a class="button button-primary" href="${sitePath("/")}">Вернуться на главную</a><a class="button button-secondary" href="${sitePath("/portfolio.html")}">Посмотреть кейсы</a></div>
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
Host: ${siteHost()}
`;
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
fs.copyFileSync(path.join(root, "src", "styles.css"), path.join(dist, "assets", "styles.css"));
fs.copyFileSync(path.join(root, "src", "app.js"), path.join(dist, "assets", "app.js"));
const sourceAssets = path.join(root, "src", "assets");
if (fs.existsSync(sourceAssets)) {
  fs.cpSync(sourceAssets, path.join(dist, "assets"), { recursive: true });
}

const htmlPaths = ["/", ...services.map((service) => service.path), "/portfolio.html", ...cities.map((city) => city.path), "/thanks.html"];
const indexedPaths = htmlPaths.filter((pagePath) => pagePath !== "/thanks.html");

write("index.html", homePage());
services.forEach((service) => write(service.path.slice(1), servicePage(service)));
write("portfolio.html", portfolioPage());
cities.forEach((city) => write(city.path.slice(1), cityPage(city)));
write("thanks.html", thanksPage());
write("sitemap.xml", sitemap(indexedPaths));
write("robots.txt", robots());

fs.writeFileSync(path.join(dist, ".nojekyll"), "");

console.log(`Built ${htmlPaths.length} HTML pages plus assets in ${outputDir}/`);
