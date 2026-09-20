import { getCartWithProducts, clearCart } from "../services/cartService.js";
import { money, calcShipping } from "../utils/format.js";
import { homePath, basePath } from "../utils/path.js";

export function renderCheckout() {
  return `
    <main class="flex-grow pt-16 md:pt-20">
      <!-- Header -->
      <header class="pt-12 md:pt-16 px-margin-mobile md:px-margin-desktop pb-12 border-b border-outline-variant grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-surface-container-lowest">
        <div class="md:col-span-8">
          <span class="font-label-technical text-xs text-outline uppercase tracking-widest block mb-4">REGISTRO DE DESPACHO</span>
          <h1 class="font-display-lg text-5xl sm:text-7xl md:text-8xl text-primary tracking-tighter uppercase leading-none mb-6">Finalizar<br>Pedido</h1>
          <p class="font-body-md text-on-surface-variant max-w-xl text-base">
            Registra tus coordenadas de entrega para procesar el despacho de tu selección BAKAAT.
          </p>
        </div>
        <div class="hidden md:flex md:col-span-4 items-start justify-end text-right">
          <div class="tech-border p-4 w-full max-w-xs bg-surface">
            <span class="font-label-technical text-xs text-tertiary uppercase block mb-1 font-bold">STATUS: ONLINE</span>
            <span class="font-label-technical text-xs text-on-surface-variant block">SERVER: BOG-01</span>
            <span class="font-label-technical text-xs text-on-surface-variant block">T: 4.6097° N, 74.0817° W</span>
          </div>
        </div>
      </header>

      <!-- Checkout View -->
      <section class="px-margin-mobile md:px-margin-desktop py-12 bg-surface">
        <a class="inline-flex items-center gap-2 font-label-technical text-xs text-outline hover:text-tertiary uppercase mb-8 transition-colors" href="${basePath}carrito.html">
          <span class="material-symbols-outlined text-sm">arrow_back</span> VOLVER AL CARRITO
        </a>
        <div class="flex flex-col gap-12" id="checkoutView"></div>
      </section>
    </main>`;
}

export function initCheckout() {
  const view = document.querySelector("#checkoutView");
  const items = getCartWithProducts();

  if (!items.length) {
    view.innerHTML = `
      <div class="py-12 text-center tech-border border-outline-variant bg-surface-container-low p-12">
        <span class="material-symbols-outlined text-5xl text-tertiary mb-4">remove_shopping_cart</span>
        <h2 class="font-display-lg text-3xl text-on-surface uppercase mb-3">NO HAY PRENDAS REGISTRADAS</h2>
        <p class="font-body-md text-on-surface-variant mb-8 max-w-md mx-auto">Tu archivo de selección está vacío. Selecciona prendas en la tienda para procesar tu despacho.</p>
        <a class="inline-flex items-center gap-2 px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${basePath}tienda.html">
          IR A LA TIENDA <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>`;
    return;
  }

  const subtotal = items.reduce((s, p) => s + p.total, 0);
  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;

  view.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-7 bg-surface-container-lowest p-4 sm:p-8 border border-outline-variant">
        <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-6">// COORDENADAS DE DESPACHO</span>
        <form class="space-y-5" id="checkoutForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="font-label-technical text-[10px] text-outline uppercase block mb-2">NOMBRE</label>
              <input required name="name" autocomplete="given-name" class="w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors" placeholder="OPERADOR">
            </div>
            <div>
              <label class="font-label-technical text-[10px] text-outline uppercase block mb-2">APELLIDO</label>
              <input required name="lastName" autocomplete="family-name" class="w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors" placeholder="APELLIDO">
            </div>
          </div>
          <div>
            <label class="font-label-technical text-[10px] text-outline uppercase block mb-2">CORREO ELECTRÓNICO</label>
            <input required type="email" name="email" autocomplete="email" class="w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors" placeholder="OPERADOR@DOMINIO.COM">
          </div>
          <div>
            <label class="font-label-technical text-[10px] text-outline uppercase block mb-2">DIRECCIÓN DE ENTREGA</label>
            <input required name="address" autocomplete="street-address" class="w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors" placeholder="CALLE / CARRERA / NÚMERO">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="font-label-technical text-[10px] text-outline uppercase block mb-2">CIUDAD</label>
              <input required name="city" autocomplete="address-level2" class="w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors" placeholder="BOGOTÁ D.C.">
            </div>
            <div>
              <label class="font-label-technical text-[10px] text-outline uppercase block mb-2">TELÉFONO DE CONTACTO</label>
              <input required name="phone" autocomplete="tel" class="w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors" placeholder="+57 300 000 0000">
            </div>
          </div>
          <div class="flex items-start gap-3 p-4 bg-surface-container border border-outline-variant font-label-technical text-[10px] text-outline uppercase mt-6">
            <span class="material-symbols-outlined text-tertiary text-base">info</span>
            <span>ESTADO DE OPERACIÓN: DEMOSTRACIÓN TÉCNICA. AL CONFIRMAR SE GENERARÁ UN CÓDIGO BKT CIFRADO DE SEGUIMIENTO.</span>
          </div>
          <button class="w-full mt-6 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold flex items-center justify-center gap-2" type="submit">
            CONFIRMAR REGISTRO · ${money(total)} <span class="material-symbols-outlined text-sm">lock</span>
          </button>
        </form>
      </div>

      <div class="lg:col-span-5">
        <div class="bg-surface-container-high border border-outline-variant p-6 sticky top-28">
          <h2 class="font-display-lg text-2xl text-primary uppercase border-b border-outline-variant pb-4 mb-4">RESUMEN DE ORDEN</h2>
          <div class="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2">
            ${items.map(p => `
              <div class="flex items-center gap-3 font-label-technical text-xs border-b border-outline-variant/50 pb-3">
                <div class="w-12 h-12 flex-shrink-0 bg-surface-container border border-outline-variant overflow-hidden">
                  ${p.imagen?.startsWith("http")
                    ? `<img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover">`
                    : `<div class="w-full h-full" style="background:${p.imagen || "#1f2020"}"></div>`
                  }
                </div>
                <div class="flex-grow min-w-0">
                  <div class="text-on-surface truncate uppercase font-bold">${p.nombre}</div>
                  <div class="text-outline text-[10px]">${p.talla || "-"} · ${p.color || "-"} · ×${p.quantity}</div>
                </div>
                <span class="text-tertiary font-bold flex-shrink-0">${money(p.total)}</span>
              </div>
            `).join("")}
          </div>
          <div class="space-y-3 font-label-technical text-xs border-t border-outline-variant pt-4">
            <div class="flex justify-between">
              <span class="text-outline">SUBTOTAL</span>
              <span class="text-primary font-bold">${money(subtotal)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-outline">LOGÍSTICA</span>
              <span class="text-tertiary font-bold">${shipping ? money(shipping) : "GRATIS"}</span>
            </div>
            <div class="flex justify-between text-base font-bold text-primary pt-3 border-t border-outline-variant">
              <span>TOTAL</span>
              <span class="text-tertiary">${money(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.querySelector("#checkoutForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const order = "BKT-" + Date.now().toString().slice(-6);
    clearCart();
    view.innerHTML = `
      <div class="col-span-full py-16 text-center tech-border border-outline-variant bg-surface-container-low p-12">
        <span class="material-symbols-outlined text-6xl text-tertiary mb-4">check_circle</span>
        <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-2">// OPERACIÓN CONFIRMADA</span>
        <h2 class="font-display-lg text-4xl text-on-surface uppercase mb-4">ORDEN REGISTRADA EN SISTEMA</h2>
        <p class="font-body-md text-on-surface-variant max-w-md mx-auto mb-8 text-base">
          Tu código oficial de seguimiento es <strong class="text-tertiary font-label-technical">${order}</strong>. Operación de prueba completada en laboratorio Bogotá D.C.
        </p>
        <a class="inline-flex items-center gap-2 px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${homePath}">
          VOLVER AL INICIO <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>`;
  });
}