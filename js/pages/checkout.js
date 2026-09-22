import { getCartWithProducts, clearCart } from "../services/cartService.js";
import { money, calcShipping } from "../utils/format.js";
import { homePath, basePath } from "../utils/path.js";

const PROCESSING_MS = 1800;
const DELIVERY_DAYS = 4;

const INPUT_CLASS = "w-full bg-surface border border-outline-variant p-3 font-label-technical text-xs text-primary focus:border-tertiary focus:outline-none uppercase transition-colors";
const LABEL_CLASS = "font-label-technical text-[10px] text-outline uppercase block mb-2";
const SECTION_LABEL_CLASS = "font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-6";
const PANEL_CLASS = "tech-border border-outline-variant bg-surface-container-low p-6 md:p-8";

const FORM_FIELDS = [
  { name: "name", label: "NOMBRE", autocomplete: "given-name", placeholder: "OPERADOR", half: true },
  { name: "lastName", label: "APELLIDO", autocomplete: "family-name", placeholder: "APELLIDO", half: true },
  { name: "email", label: "CORREO ELECTRÓNICO", type: "email", autocomplete: "email", placeholder: "OPERADOR@DOMINIO.COM" },
  { name: "address", label: "DIRECCIÓN DE ENTREGA", autocomplete: "street-address", placeholder: "CALLE / CARRERA / NÚMERO" },
  { name: "city", label: "CIUDAD", autocomplete: "address-level2", placeholder: "BOGOTÁ D.C.", half: true },
  { name: "phone", label: "TELÉFONO DE CONTACTO", autocomplete: "tel", placeholder: "+57 300 000 0000", half: true }
];

const genOrderCode = () => "BKT-" + Date.now().toString().slice(-6);

function estimatedDelivery() {
  return new Date(Date.now() + DELIVERY_DAYS * 86400000)
    .toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })
    .toUpperCase();
}

function renderItemRow(p, thumbBg) {
  return `
    <div class="flex items-center gap-3 font-label-technical text-xs border-b border-outline-variant/50 pb-3">
      <div class="w-12 h-12 flex-shrink-0 ${thumbBg} border border-outline-variant overflow-hidden">
        ${p.imagen?.includes("/")
          ? `<img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover">`
          : `<div class="w-full h-full" style="background:${p.imagen || "#1f2020"}"></div>`
        }
      </div>
      <div class="flex-grow min-w-0">
        <div class="text-on-surface truncate uppercase font-bold">${p.nombre}</div>
        <div class="text-outline text-[10px]">${p.talla || "-"} · ${p.color || "-"} · ×${p.quantity}</div>
      </div>
      <span class="text-tertiary font-bold flex-shrink-0">${money(p.total)}</span>
    </div>`;
}

function renderTotals(subtotal, shipping, total, totalLabel = "TOTAL") {
  return `
    <div class="space-y-3 font-label-technical text-xs border-t border-outline-variant pt-4">
      <div class="flex justify-between"><span class="text-outline">SUBTOTAL</span><span class="text-primary font-bold">${money(subtotal)}</span></div>
      <div class="flex justify-between"><span class="text-outline">LOGÍSTICA</span><span class="text-tertiary font-bold">${shipping ? money(shipping) : "GRATIS"}</span></div>
      <div class="flex justify-between text-base font-bold text-primary pt-3 border-t border-outline-variant"><span>${totalLabel}</span><span class="text-tertiary">${money(total)}</span></div>
    </div>`;
}

function renderEmptyCart() {
  return `
    <div class="py-12 text-center tech-border border-outline-variant bg-surface-container-low p-12">
      <span class="material-symbols-outlined text-5xl text-tertiary mb-4">remove_shopping_cart</span>
      <h2 class="font-display-lg text-3xl text-on-surface uppercase mb-3">NO HAY PRENDAS REGISTRADAS</h2>
      <p class="font-body-md text-on-surface-variant mb-8 max-w-md mx-auto">Tu archivo de selección está vacío. Selecciona prendas en la tienda para procesar tu despacho.</p>
      <a class="inline-flex items-center gap-2 px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${basePath}tienda.html">
        IR A LA TIENDA <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </a>
    </div>`;
}

function renderProcessing() {
  return `
    <div class="py-24 text-center tech-border border-outline-variant bg-surface-container-low p-12">
      <span class="material-symbols-outlined text-6xl text-tertiary animate-spin inline-block mb-6">progress_activity</span>
      <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-3">// PROCESANDO OPERACIÓN</span>
      <h2 class="font-display-lg text-4xl text-primary uppercase mb-3">Cifrando Registro BKT</h2>
      <p class="font-body-md text-on-surface-variant max-w-md mx-auto">Validando coordenadas de despacho y aprobando la transacción...</p>
    </div>`;
}

function renderForm(items, subtotal, shipping, total) {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-7 bg-surface-container-lowest p-4 sm:p-8 border border-outline-variant">
        <span class="${SECTION_LABEL_CLASS}">// COORDENADAS DE DESPACHO</span>
        <form class="space-y-5" id="checkoutForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            ${FORM_FIELDS.map(f => `
              <div class="${f.half ? "" : "sm:col-span-2"}">
                <label class="${LABEL_CLASS}">${f.label}</label>
                <input required type="${f.type || "text"}" name="${f.name}" autocomplete="${f.autocomplete}" class="${INPUT_CLASS}" placeholder="${f.placeholder}">
              </div>
            `).join("")}
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
            ${items.map(p => renderItemRow(p, "bg-surface-container")).join("")}
          </div>
          ${renderTotals(subtotal, shipping, total)}
        </div>
      </div>
    </div>`;
}

function renderSuccess(data, items, subtotal, shipping, total, order, delivery) {
  const steps = [
    { icon: "task_alt", label: "REGISTRO CONFIRMADO", state: "COMPLETADO", done: true },
    { icon: "payments", label: "PAGO APROBADO", state: "COMPLETADO", done: true },
    { icon: "inventory_2", label: "PREPARACIÓN EN TALLER", state: "EN CURSO", done: true },
    { icon: "local_shipping", label: "DESPACHO BOG-01", state: delivery, done: false }
  ];

  const coords = [
    ["Operador", `${data.name} ${data.lastName}`, "uppercase"],
    ["Correo", data.email, "break-all"],
    ["Teléfono", data.phone, ""],
    ["Dirección", data.address, "uppercase"],
    ["Ciudad", data.city, "uppercase"],
    ["Entrega Estimada", delivery, "text-tertiary"]
  ];

  return `
    <div class="flex flex-col gap-8">
      <div class="tech-border border-tertiary bg-surface-container-low p-8 md:p-12 text-center">
        <span class="material-symbols-outlined text-7xl text-tertiary mb-4 inline-block">task_alt</span>
        <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-2">// OPERACIÓN CONFIRMADA</span>
        <h2 class="font-display-lg text-4xl md:text-6xl text-primary uppercase tracking-tight mb-4">Compra Exitosa</h2>
        <p class="font-body-md text-on-surface-variant max-w-xl mx-auto mb-8 text-base">
          Gracias, ${data.name} ${data.lastName}. Tu selección BAKAAT ha sido registrada en el archivo y enviamos la confirmación a <strong class="text-primary">${data.email}</strong>.
        </p>
        <div class="inline-flex flex-col items-center gap-1 bg-surface border border-tertiary px-10 py-5">
          <span class="font-label-technical text-[10px] text-outline uppercase tracking-widest">CÓDIGO DE SEGUIMIENTO</span>
          <span class="font-label-technical text-3xl text-tertiary font-bold tracking-widest">${order}</span>
        </div>
      </div>

      <div class="${PANEL_CLASS}">
        <span class="${SECTION_LABEL_CLASS}">// RUTA DE LA OPERACIÓN</span>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${steps.map(s => `
            <div class="border ${s.done ? "border-tertiary bg-surface" : "border-outline-variant"} p-4 flex flex-col gap-2">
              <span class="material-symbols-outlined text-2xl ${s.done ? "text-tertiary" : "text-outline"}">${s.icon}</span>
              <span class="font-label-technical text-[10px] uppercase font-bold ${s.done ? "text-primary" : "text-outline"}">${s.label}</span>
              <span class="font-label-technical text-[10px] uppercase ${s.done ? "text-tertiary" : "text-outline"}">${s.state}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-5 ${PANEL_CLASS}">
          <span class="${SECTION_LABEL_CLASS}">// COORDENADAS REGISTRADAS</span>
          <div class="space-y-2 font-label-technical text-xs">
            ${coords.map(([label, value, extra], i) => `
              <div class="flex justify-between gap-4 py-2${i < coords.length - 1 ? " border-b border-outline-variant" : ""}">
                <span class="text-outline uppercase flex-shrink-0">${label}</span>
                <span class="${extra.includes("text-tertiary") ? "text-tertiary" : "text-primary"} font-bold ${extra.replace("text-tertiary", "")} text-right">${value}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="lg:col-span-7 ${PANEL_CLASS}">
          <span class="${SECTION_LABEL_CLASS}">// PIEZAS REGISTRADAS</span>
          <div class="space-y-4 mb-6">
            ${items.map(p => renderItemRow(p, "bg-surface")).join("")}
          </div>
          ${renderTotals(subtotal, shipping, total, "TOTAL CARGADO")}
        </div>
      </div>

      <div class="flex flex-col items-center gap-6 pt-4 pb-8">
        <p class="font-label-technical text-[10px] text-outline uppercase text-center flex items-center gap-2">
          <span class="material-symbols-outlined text-tertiary text-sm">info</span>
          OPERACIÓN DE DEMOSTRACIÓN TÉCNICA · NO SE REALIZÓ NINGÚN CARGO REAL
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${homePath}">
            VOLVER AL INICIO <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a class="inline-flex items-center justify-center gap-2 px-8 py-4 border border-outline-variant text-primary font-label-technical text-xs uppercase tracking-widest hover:border-tertiary hover:text-tertiary transition-colors" href="${basePath}tienda.html">
            SEGUIR EXPLORANDO
          </a>
        </div>
      </div>
    </div>`;
}

function updateHeader(order) {
  const title = document.querySelector("#checkoutTitle");
  const label = document.querySelector("#checkoutHeaderLabel");
  const statusBox = document.querySelector("#checkoutStatusBox");
  if (title) title.innerHTML = "Orden<br>Confirmada";
  if (label) label.textContent = "TRANSMISIÓN COMPLETADA";
  if (statusBox) statusBox.innerHTML = `
    <span class="font-label-technical text-xs text-tertiary uppercase block mb-1 font-bold">STATUS: PAGO APROBADO</span>
    <span class="font-label-technical text-xs text-on-surface-variant block">ORDEN: ${order}</span>
    <span class="font-label-technical text-xs text-on-surface-variant block">T: 4.6097° N, 74.0817° W</span>`;
}

export function renderCheckout() {
  return `
    <main class="flex-grow pt-16 md:pt-20">
      <!-- Header -->
      <header class="pt-12 md:pt-16 px-margin-mobile md:px-margin-desktop pb-12 border-b border-outline-variant grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-surface-container-lowest">
        <div class="md:col-span-8">
          <span id="checkoutHeaderLabel" class="font-label-technical text-xs text-outline uppercase tracking-widest block mb-4">REGISTRO DE DESPACHO</span>
          <h1 id="checkoutTitle" class="font-display-lg text-5xl sm:text-7xl md:text-8xl text-primary tracking-tighter uppercase leading-none mb-6">Finalizar<br>Pedido</h1>
          <p class="font-body-md text-on-surface-variant max-w-xl text-base">
            Registra tus coordenadas de entrega para procesar el despacho de tu selección BAKAAT.
          </p>
        </div>
        <div class="hidden md:flex md:col-span-4 items-start justify-end text-right">
          <div id="checkoutStatusBox" class="tech-border p-4 w-full max-w-xs bg-surface">
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
    view.innerHTML = renderEmptyCart();
    return;
  }

  const subtotal = items.reduce((s, p) => s + p.total, 0);
  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;

  view.innerHTML = renderForm(items, subtotal, shipping, total);

  document.querySelector("#checkoutForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const field = n => e.target.elements[n].value;
    const data = {
      name: field("name"),
      lastName: field("lastName"),
      email: field("email"),
      address: field("address"),
      city: field("city"),
      phone: field("phone")
    };
    const order = genOrderCode();
    const delivery = estimatedDelivery();

    view.innerHTML = renderProcessing();
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      clearCart();
      updateHeader(order);
      view.innerHTML = renderSuccess(data, items, subtotal, shipping, total, order, delivery);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, PROCESSING_MS);
  });
}
