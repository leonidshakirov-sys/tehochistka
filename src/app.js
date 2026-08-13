const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const siteHeader = document.querySelector(".site-header");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (siteHeader) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeaderVisibility = () => {
    const currentScrollY = window.scrollY;
    const isMenuOpen = menu?.classList.contains("is-open");

    if (isMenuOpen || currentScrollY < 120 || currentScrollY < lastScrollY) {
      siteHeader.classList.remove("is-hidden");
    } else if (currentScrollY > lastScrollY + 8) {
      siteHeader.classList.add("is-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      window.requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    },
    { passive: true },
  );
}

document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", () => {
    const field = input.closest(".field");
    const note = field?.querySelector("[data-file-note]");
    if (!note) return;

    const files = Array.from(input.files || []);
    note.textContent = files.length
      ? `Выбрано фото: ${files[0].name}`
      : "Приложите одно фото до 5 МБ. Если файл тяжелый, отправьте его в WhatsApp.";
  });
});

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const whatsappUrl = form.getAttribute("data-whatsapp-url") || "https://wa.me/79162659262";
    const fileInput = form.querySelector('input[type="file"]');
    const selectedFile = fileInput?.files?.[0]?.name;
    const message = [
      "Заявка с сайта Техочистка",
      `Страница: ${formData.get("page") || "не указана"}`,
      `Имя: ${formData.get("name") || "не указано"}`,
      `Телефон: ${formData.get("phone") || "не указан"}`,
      `Комментарий: ${formData.get("message") || "без комментария"}`,
      selectedFile ? `Фото: выбрано "${selectedFile}". Пожалуйста, прикрепите файл в этом чате.` : "Фото: не приложено",
    ].join("\n");

    if (button) {
      button.textContent = "Открываем WhatsApp...";
      button.setAttribute("aria-busy", "true");
    }

    const targetUrl = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    const openedWindow = window.open(targetUrl, "_blank", "noopener");

    if (!openedWindow) {
      window.location.href = targetUrl;
    }
  });
});

const reviewSlider = document.querySelector("[data-review-slider]");
const reviewSlides = Array.from(document.querySelectorAll("[data-review-slide]"));
const reviewDots = Array.from(document.querySelectorAll("[data-review-dot]"));
const reviewPrev = document.querySelector("[data-review-prev]");
const reviewNext = document.querySelector("[data-review-next]");

if (reviewSlider && reviewSlides.length) {
  const setActiveDot = () => {
    const sliderLeft = reviewSlider.getBoundingClientRect().left;
    const activeIndex = reviewSlides.reduce((bestIndex, slide, index) => {
      const currentDistance = Math.abs(slide.getBoundingClientRect().left - sliderLeft);
      const bestDistance = Math.abs(reviewSlides[bestIndex].getBoundingClientRect().left - sliderLeft);
      return currentDistance < bestDistance ? index : bestIndex;
    }, 0);

    reviewDots.forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === activeIndex));
    });
  };

  const scrollToSlide = (index) => {
    const slide = reviewSlides[index];
    if (!slide) return;
    reviewSlider.scrollTo({ left: slide.offsetLeft - reviewSlider.offsetLeft, behavior: "smooth" });
  };

  reviewPrev?.addEventListener("click", () => {
    const current = reviewDots.findIndex((dot) => dot.getAttribute("aria-current") === "true");
    scrollToSlide(Math.max(0, current - 1));
  });

  reviewNext?.addEventListener("click", () => {
    const current = reviewDots.findIndex((dot) => dot.getAttribute("aria-current") === "true");
    scrollToSlide(Math.min(reviewSlides.length - 1, current + 1));
  });

  reviewDots.forEach((dot, index) => dot.addEventListener("click", () => scrollToSlide(index)));
  reviewSlider.addEventListener("scroll", () => window.requestAnimationFrame(setActiveDot), { passive: true });
  setActiveDot();
}
