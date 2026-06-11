const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

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

document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", () => {
    const field = input.closest(".field");
    const note = field?.querySelector("[data-file-note]");
    if (!note) return;

    const files = Array.from(input.files || []);
    note.textContent = files.length
      ? `Выбрано файлов: ${files.length}`
      : "Можно приложить фото металла, фасада, кирпича или дерева.";
  });
});
