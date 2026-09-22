import { cartCount } from "../services/cartService.js";
import { page, basePath, homePath, assetsPath } from "../utils/path.js";

export function renderNavbar() {
  const active = (file) => page === file ? "text-tertiary border-b-2 border-tertiary" : "text-on-surface-variant hover:text-on-surface";

  return `
    <header class="fixed top-0 w-full z-50 bg-background dark:bg-background border-b border-outline-variant flex justify-center py-4">
      <div class="w-full px-margin-mobile md:px-margin-desktop flex justify-between items-center">
        <div class="flex items-center gap-4">
          <a href="${homePath}" class="logo block">
            <img src="${assetsPath}img/BAKAAT-LOGO.png" alt="BAKAAT" class="logo h-8 md:h-10">
          </a>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a class="font-label-technical text-xs tracking-widest ${active("index.html")} pb-1 uppercase transition-colors" href="${homePath}">INICIO</a>
          <a class="font-label-technical text-xs tracking-widest ${active("tienda.html")} pb-1 uppercase transition-colors" href="${basePath}tienda.html">TIENDA</a>
          <a class="font-label-technical text-xs tracking-widest ${active("nosotros.html")} pb-1 uppercase transition-colors" href="${basePath}nosotros.html">HERENCIA</a>
        </nav>
        <div class="flex items-center gap-4">
          <a class="p-2 text-primary hover:bg-surface-container-high transition-all rounded-DEFAULT flex items-center gap-1.5 relative" href="${basePath}carrito.html" aria-label="Carrito de selección">
            <span class="material-symbols-outlined text-2xl">shopping_bag</span>
            <span class="cart-count font-label-technical text-[11px] bg-tertiary text-on-tertiary px-1.5 py-0.5 rounded-none font-bold">${cartCount()}</span>
          </a>
          <button class="md:hidden p-2 text-primary hover:bg-surface-container-high transition-all rounded-DEFAULT" id="menuBtn" aria-label="Abrir menú">
            <span class="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
      <div class="nav-mobile-menu hidden fixed inset-0 bg-surface/95 z-50 flex-col p-8 gap-6 md:hidden" id="navLinks">
        <div class="flex justify-between items-center border-b border-outline-variant pb-4">
          <a href="${homePath}" class="logo">
            <img src="${assetsPath}img/BAKAAT-LOGO.png" alt="BAKAAT" class="logo h-8">
          </a>
          <button class="text-primary text-2xl" id="navClose">✕</button>
        </div>
        <a class="font-label-technical text-lg text-on-surface uppercase" href="${homePath}">INICIO</a>
        <a class="font-label-technical text-lg text-on-surface uppercase" href="${basePath}tienda.html">TIENDA</a>
        <a class="font-label-technical text-lg text-on-surface uppercase" href="${basePath}nosotros.html">HERENCIA</a>
        <a class="font-label-technical text-lg text-tertiary uppercase flex items-center justify-between mt-4 pt-4 border-t border-outline-variant" href="${basePath}carrito.html">
          <span>CARRITO DE SELECCIÓN</span>
          <span class="cart-count bg-tertiary text-on-tertiary px-2 py-0.5">${cartCount()}</span>
        </a>
      </div>
    </header>`;
}

export function initNavbar() {
  const menuBtn = document.querySelector("#menuBtn");
  const navLinks = document.querySelector("#navLinks");
  const navClose = document.querySelector("#navClose");

  function open() {
    navLinks?.classList.remove("hidden");
    navLinks?.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
  function close() {
    navLinks?.classList.add("hidden");
    navLinks?.classList.remove("flex");
    document.body.style.overflow = "";
  }

  menuBtn?.addEventListener("click", open);
  navClose?.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  window.addEventListener("cartUpdated", () => {
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = cartCount();
    });
  });
}