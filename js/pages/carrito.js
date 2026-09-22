import { getCartWithProducts, updateQuantity, removeFromCart, clearCart } from "../services/cartService.js";
import { money, calcShipping, FREE_SHIPPING_THRESHOLD } from "../utils/format.js";
import { basePath } from "../utils/path.js";

export function renderCarrito() {
  return `
    <main class="flex-grow pt-16 md:pt-20">
      <header class="pt-12 md:pt-16 px-margin-mobile md:px-margin-desktop pb-12 border-b border-outline-variant bg-surface-container-lowest">
        <span class="font-label-technical text-xs text-outline uppercase tracking-widest block mb-4">SELECCIÓN ACTUAL</span>
        <h1 class="font-display-lg text-5xl sm:text-7xl md:text-8xl text-primary tracking-tighter uppercase leading-none">Tu Archivo de Selección</h1>
      </header>

      <section class="px-margin-mobile md:px-margin-desktop py-12 bg-surface" id="cartView"></section>
    </main>`;
}

export function initCarrito() {
  const view = document.querySelector("#cartView");

  function render() {
    const items = getCartWithProducts();

    if (!items.length) {
      view.innerHTML = `
        <div class="py-16 text-center tech-border border-outline-variant bg-surface-container-low p-12">
          <span class="material-symbols-outlined text-5xl text-tertiary mb-4">shopping_bag</span>
          <h2 class="font-display-lg text-3xl text-on-surface uppercase mb-3">TU ARCHIVO ESTÁ VACÍO</h2>
          <p class="font-body-md text-on-surface-variant mb-8 max-w-md mx-auto">Agrega algunas prendas del catálogo BAKAAT para continuar con tu selección.</p>
          <a class="inline-flex items-center gap-2 px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${basePath}tienda.html">
            EXPLORAR LA TIENDA <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>`;
      return;
    }

    const subtotal = items.reduce((s, p) => s + p.total, 0);
    const shipping = calcShipping(subtotal);
    const total = subtotal + shipping;
    const totalItems = items.reduce((s, p) => s + p.quantity, 0);
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    view.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8 flex flex-col gap-6">
          <div class="flex items-center justify-between border-b border-outline-variant pb-4">
            <span class="font-label-technical text-xs text-on-surface font-bold uppercase">${totalItems} ${totalItems === 1 ? "PRENDA" : "PRENDAS"}</span>
            <button class="font-label-technical text-xs text-tertiary hover:text-primary transition-colors underline uppercase cursor-pointer" id="clearCartBtn">VACIAR ARCHIVO</button>
          </div>

          ${remaining > 0 ? `
            <div class="bg-surface-container border border-outline-variant p-4 flex items-center gap-4">
              <span class="material-symbols-outlined text-tertiary text-2xl">local_shipping</span>
              <p class="font-label-technical text-xs text-primary uppercase">FALTAN <span class="text-tertiary font-bold">${money(remaining)}</span> PARA EL <span class="text-tertiary font-bold">ENVÍO GRATUITO</span></p>
            </div>
          ` : `
            <div class="bg-surface-container border border-tertiary p-4 flex items-center gap-4">
              <span class="material-symbols-outlined text-tertiary text-2xl">local_shipping</span>
              <p class="font-label-technical text-xs text-primary uppercase">ESTADO: <span class="text-tertiary font-bold">ENVÍO GRATUITO CONCEDIDO</span> PARA ESTA OPERACIÓN</p>
            </div>
          `}

          <div class="flex flex-col gap-4">
            ${items.map(p => {
              const imgSrc = p.imagen || p.galeria?.[0] || "";
              const isUrl = imgSrc.includes("/");

              return `
                <div class="bg-surface-container p-4 border border-outline-variant flex flex-col md:flex-row gap-6 relative group hover:border-tertiary transition-colors">
                  <div class="w-full md:w-32 h-40 bg-background border border-outline-variant relative overflow-hidden flex-shrink-0">
                    ${isUrl 
                      ? `<div class="bg-cover bg-center w-full h-full absolute inset-0 opacity-90" style="background-image: url('${imgSrc}')"></div>` 
                      : `<div class="w-full h-full" style="background:${imgSrc}"></div>`
                    }
                    <div class="absolute top-2 left-2 bg-tertiary text-on-tertiary font-label-technical text-[10px] px-1.5 py-0.5 font-bold uppercase">
                      ${p.categoria ? p.categoria.toUpperCase() : "HERITAGE"}
                    </div>
                  </div>
                  <div class="flex-grow flex flex-col justify-between">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="font-display-lg text-xl text-primary uppercase">
                          <a class="hover:text-tertiary transition-colors" href="${basePath}producto.html?id=${p.id}">${p.nombre.toUpperCase()}</a>
                        </h3>
                        <p class="font-label-technical text-xs mt-1 text-outline">REF: ${p.ref || "BK-ART-00" + p.id}</p>
                      </div>
                      <button class="text-on-surface-variant hover:text-error transition-colors remove-item-btn" data-key="${p.key}">
                        <span class="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-3 font-label-technical text-[11px] text-on-surface-variant">
                      <div>
                        <span class="block text-outline uppercase mb-0.5">TALLA DE SELECCIÓN:</span>
                        <span class="text-primary font-bold">${p.talla || "STANDARD"}</span>
                      </div>
                      <div>
                        <span class="block text-outline uppercase mb-0.5">COLOR / ACABADO:</span>
                        <span class="text-primary font-bold">${p.color ? p.color.toUpperCase() : "NEGRO MATE"}</span>
                      </div>
                    </div>
                    <div class="flex items-end justify-between mt-4 pt-3 border-t border-outline-variant">
                      <div class="flex items-center border border-outline-variant bg-surface">
                        <button class="px-3 py-1 text-primary hover:bg-surface-variant transition-colors qty-minus" data-key="${p.key}">-</button>
                        <span class="px-4 py-1 font-label-technical text-xs text-primary border-l border-r border-outline-variant font-bold">${p.quantity}</span>
                        <button class="px-3 py-1 text-primary hover:bg-surface-variant transition-colors qty-plus" data-key="${p.key}">+</button>
                      </div>
                      <div class="text-right">
                        <span class="font-display-lg text-xl text-tertiary font-bold">${money(p.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>`;
            }).join("")}
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="bg-surface-container-high border border-outline-variant p-6 sticky top-28">
            <h2 class="font-display-lg text-2xl text-primary uppercase border-b border-outline-variant pb-4 mb-6">EJECUTAR ORDEN</h2>
            <div class="flex justify-between items-center mb-4 font-label-technical text-xs text-on-surface">
              <span>SUBTOTAL (${totalItems} ${totalItems === 1 ? "PRENDA" : "PRENDAS"})</span>
              <span class="font-bold">${money(subtotal)}</span>
            </div>
            <div class="flex justify-between items-center mb-6 font-label-technical text-xs text-on-surface">
              <span>LOGÍSTICA</span>
              <span class="text-tertiary font-bold">${shipping ? money(shipping) : "GRATIS"}</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-outline-variant mb-6 font-display-lg text-2xl text-primary">
              <span>TOTAL</span>
              <span class="text-tertiary font-bold">${money(total)}</span>
            </div>
            <p class="font-label-technical text-[10px] text-outline uppercase mb-6">Impuestos incluidos en el cálculo final</p>
            <a class="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${basePath}checkout.html">
              FINALIZAR PEDIDO <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <div class="mt-6 pt-6 border-t border-outline-variant flex flex-col gap-3">
              <div class="flex items-center gap-3 font-label-technical text-tertiary">
                <span class="material-symbols-outlined text-sm">lock</span>
                <span class="font-bold tracking-widest uppercase">PAGO SEGURO</span>
              </div>
              <div class="flex items-center gap-3 font-label-technical text-tertiary">
                <span class="material-symbols-outlined text-sm">local_shipping</span>
                <span class="font-bold tracking-widest uppercase">ENVÍO NACIONAL</span>
              </div>
              <div class="flex items-center gap-3 font-label-technical text-tertiary">
                <span class="material-symbols-outlined text-sm">keyboard_return</span>
                <span class="font-bold tracking-widest uppercase">30 DÍAS DEVOLUCIÓN</span>
              </div>
            </div>
            <a class="mt-6 inline-flex items-center gap-2 font-label-technical text-[10px] text-on-surface-variant hover:text-tertiary transition-colors uppercase tracking-widest" href="${basePath}tienda.html">
              <span class="material-symbols-outlined text-sm">arrow_back</span> VOLVER AL ARCHIVO
            </a>
          </div>
        </div>
      </div>`;

    document.querySelector("#clearCartBtn")?.addEventListener("click", () => {
      clearCart();
      render();
    });

    view.querySelectorAll(".remove-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.dataset.key);
        render();
      });
    });

    view.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = items.find(i => i.key === btn.dataset.key);
        if (item && item.quantity > 1) {
          updateQuantity(btn.dataset.key, item.quantity - 1);
          render();
        }
      });
    });

    view.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = items.find(i => i.key === btn.dataset.key);
        if (item) {
          updateQuantity(btn.dataset.key, item.quantity + 1);
          render();
        }
      });
    });
  }

  render();

  window.addEventListener("cartUpdated", render, { once: false });
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("cartUpdated", render);
  });
}
