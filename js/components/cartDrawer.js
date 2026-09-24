import { getCartWithProducts, updateQuantity, removeFromCart } from "../services/cartService.js";
import { money, FREE_SHIPPING_THRESHOLD } from "../utils/format.js";
import { basePath } from "../utils/path.js";

export function renderCartDrawer() {
  return `
    <div id="cartDrawer" class="fixed inset-0 z-[60] pointer-events-none" aria-hidden="true">
      <div id="cartDrawerOverlay" class="absolute inset-0 bg-background/70 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
      <aside id="cartDrawerPanel" class="absolute top-0 right-0 h-full w-full max-w-md bg-surface-container-low border-l border-outline-variant translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-2xl" role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <header class="flex items-center justify-between px-6 py-5 border-b border-outline-variant flex-shrink-0">
          <div>
            <span class="font-label-technical text-[10px] text-tertiary uppercase tracking-widest block mb-1">// SELECCIÓN ACTUAL</span>
            <h2 class="font-display-lg text-2xl text-primary uppercase leading-none">Tu Archivo <span id="cartDrawerCount" class="text-tertiary"></span></h2>
          </div>
          <button id="cartDrawerClose" class="p-2 text-on-surface-variant hover:text-tertiary hover:bg-surface-container-high transition-all" aria-label="Cerrar carrito">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </header>
        <div id="cartDrawerItems" class="flex-grow overflow-y-auto px-6"></div>
        <footer id="cartDrawerFooter" class="flex-shrink-0 border-t border-outline-variant bg-surface-container px-6 py-5"></footer>
      </aside>
    </div>`;
}

export function initCartDrawer() {
  const root = document.querySelector("#cartDrawer");
  const overlay = document.querySelector("#cartDrawerOverlay");
  const panel = document.querySelector("#cartDrawerPanel");
  const itemsEl = document.querySelector("#cartDrawerItems");
  const footerEl = document.querySelector("#cartDrawerFooter");
  const countEl = document.querySelector("#cartDrawerCount");
  const closeBtn = document.querySelector("#cartDrawerClose");
  let isOpen = false;

  function render() {
    const items = getCartWithProducts();
    const subtotal = items.reduce((s, p) => s + p.total, 0);
    const totalItems = items.reduce((s, p) => s + p.quantity, 0);
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    countEl.textContent = totalItems ? `(${totalItems})` : "";

    if (!items.length) {
      itemsEl.innerHTML = `
        <div class="py-16 text-center">
          <span class="material-symbols-outlined text-5xl text-tertiary mb-4 block">shopping_bag</span>
          <h3 class="font-display-lg text-2xl text-on-surface uppercase mb-3">ARCHIVO VACÍO</h3>
          <p class="font-body-md text-sm text-on-surface-variant mb-6">Agrega prendas del catálogo BAKAAT para continuar.</p>
          <button class="cart-drawer-close-link inline-flex items-center gap-2 px-6 py-3 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" data-href="${basePath}tienda.html">
            EXPLORAR TIENDA <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>`;
      footerEl.innerHTML = "";
    } else {
      itemsEl.innerHTML = items.map(p => {
        const imgSrc = p.imagen || "";
        const isUrl = imgSrc.includes("/");
        return `
          <div class="flex gap-4 py-4 border-b border-outline-variant">
            <a class="w-20 h-24 flex-shrink-0 bg-background border border-outline-variant overflow-hidden block" href="${basePath}producto.html?id=${p.id}">
              ${isUrl
                ? `<div class="w-full h-full bg-cover bg-center" style="background-image: url('${imgSrc}')"></div>`
                : `<div class="w-full h-full" style="background:${imgSrc}"></div>`
              }
            </a>
            <div class="flex-grow flex flex-col justify-between min-w-0">
              <div class="flex justify-between items-start gap-2">
                <div class="min-w-0">
                  <h3 class="font-display-lg text-base text-primary uppercase leading-tight truncate">
                    <a class="hover:text-tertiary transition-colors" href="${basePath}producto.html?id=${p.id}">${p.nombre.toUpperCase()}</a>
                  </h3>
                  <p class="font-label-technical text-[10px] text-outline uppercase mt-1">
                    TALLA: <span class="text-primary font-bold">${p.talla || "STD"}</span> · COLOR: <span class="text-primary font-bold">${p.color ? p.color.toUpperCase() : "—"}</span>
                  </p>
                </div>
                <button class="text-on-surface-variant hover:text-error transition-colors flex-shrink-0 drawer-remove-btn" data-key="${p.key}" aria-label="Eliminar ${p.nombre}">
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center border border-outline-variant bg-surface">
                  <button class="px-2.5 py-0.5 text-primary hover:bg-surface-variant transition-colors drawer-qty-minus" data-key="${p.key}">-</button>
                  <span class="px-3 py-0.5 font-label-technical text-[11px] text-primary border-l border-r border-outline-variant font-bold">${p.quantity}</span>
                  <button class="px-2.5 py-0.5 text-primary hover:bg-surface-variant transition-colors drawer-qty-plus" data-key="${p.key}">+</button>
                </div>
                <span class="font-display-lg text-lg text-tertiary font-bold">${money(p.total)}</span>
              </div>
            </div>
          </div>`;
      }).join("");

      footerEl.innerHTML = `
        ${remaining > 0
          ? `<p class="font-label-technical text-[10px] text-on-surface-variant uppercase mb-4 flex items-center gap-2">
               <span class="material-symbols-outlined text-tertiary text-base">local_shipping</span>
               FALTAN <span class="text-tertiary font-bold">${money(remaining)}</span> PARA EL ENVÍO GRATUITO
             </p>`
          : `<p class="font-label-technical text-[10px] text-on-surface-variant uppercase mb-4 flex items-center gap-2">
               <span class="material-symbols-outlined text-tertiary text-base">local_shipping</span>
               <span class="text-tertiary font-bold">ENVÍO GRATUITO CONCEDIDO</span>
             </p>`
        }
        <div class="flex justify-between items-center mb-4 font-label-technical text-xs text-on-surface uppercase">
          <span>SUBTOTAL (${totalItems} ${totalItems === 1 ? "PRENDA" : "PRENDAS"})</span>
          <span class="font-display-lg text-xl text-tertiary font-bold">${money(subtotal)}</span>
        </div>
        <a class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold mb-2" href="${basePath}checkout.html">
          FINALIZAR PEDIDO <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <a class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-outline-variant text-primary font-label-technical text-xs uppercase tracking-widest hover:border-tertiary hover:text-tertiary transition-colors" href="${basePath}carrito.html">
          VER CARRITO COMPLETO
        </a>`;
    }

    itemsEl.querySelectorAll(".drawer-remove-btn").forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(btn.dataset.key));
    });

    itemsEl.querySelectorAll(".drawer-qty-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = items.find(i => i.key === btn.dataset.key);
        if (item && item.quantity > 1) updateQuantity(btn.dataset.key, item.quantity - 1);
      });
    });

    itemsEl.querySelectorAll(".drawer-qty-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = items.find(i => i.key === btn.dataset.key);
        if (item) updateQuantity(btn.dataset.key, item.quantity + 1);
      });
    });

    itemsEl.querySelectorAll(".cart-drawer-close-link").forEach(btn => {
      btn.addEventListener("click", () => {
        location.href = btn.dataset.href;
      });
    });
  }

  function open() {
    render();
    isOpen = true;
    root.classList.remove("pointer-events-none");
    root.setAttribute("aria-hidden", "false");
    overlay.classList.remove("opacity-0");
    panel.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  }

  function close() {
    isOpen = false;
    root.classList.add("pointer-events-none");
    root.setAttribute("aria-hidden", "true");
    overlay.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    document.body.style.overflow = "";
  }

  window.addEventListener("cartAdded", open);
  window.addEventListener("cartUpdated", () => { if (isOpen) render(); });
  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && isOpen) close(); });
}
