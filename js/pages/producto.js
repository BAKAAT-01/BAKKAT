import { getProducto, relacionados } from "../data/productos.js";
import { addToCart } from "../services/cartService.js";
import { productCard, initProductCards } from "../components/productCard.js";
import { money } from "../utils/format.js";
import { basePath } from "../utils/path.js";

export function renderProducto() {
  return `<main class="flex-grow pt-16 md:pt-20"><div id="productDetail"></div></main>`;
}

export function initProducto() {
  const view = document.querySelector("#productDetail");
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const producto = getProducto(id);

  if (!producto) {
    view.innerHTML = `
      <div class="py-16 text-center tech-border border-outline-variant bg-surface-container-low p-12">
        <span class="material-symbols-outlined text-5xl text-tertiary mb-4">search_off</span>
        <h2 class="font-display-lg text-3xl text-on-surface uppercase mb-3">PRENDA NO ENCONTRADA</h2>
        <p class="font-body-md text-on-surface-variant mb-8 max-w-md mx-auto">La pieza de archivo que buscas no existe o fue retirada.</p>
        <a class="inline-flex items-center gap-2 px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" href="${basePath}tienda.html">
          VOLVER A LA TIENDA <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>`;
    return;
  }

  document.title = `${producto.nombre} | BAKAAT STUDIOS`;

  const state = {
    talla: producto.tallas[0] || null,
    colorIndex: 0,
    cantidad: 1,
    tab: "descripcion"
  };

  const relacionadosList = relacionados(producto, 4);

  function render() {
    const color = producto.colores[state.colorIndex];
    const mainImg = producto.imagen || producto.galeria?.[0] || "";
    const isUrl = mainImg.startsWith("http");

    view.innerHTML = `
      <div class="px-margin-mobile md:px-margin-desktop py-8">
        <nav class="flex items-center gap-2 font-label-technical text-xs text-outline uppercase mb-8" aria-label="Migas de pan">
          <a class="hover:text-tertiary transition-colors" href="${basePath ? '..' : ''}index.html">INICIO</a>
          <span>/</span>
          <a class="hover:text-tertiary transition-colors" href="${basePath}tienda.html">TIENDA</a>
          <span>/</span>
          <span class="text-primary font-bold">${producto.nombre.toUpperCase()}</span>
        </nav>

        <section class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <!-- Gallery -->
          <div class="md:col-span-6 flex flex-col gap-4">
            <div class="aspect-[4/5] tech-border border-outline-variant bg-surface-container-low relative overflow-hidden group" id="mainImgContainer">
              ${isUrl 
                ? `<div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('${mainImg}')"></div>`
                : `<div class="w-full h-full" style="background:${mainImg}"></div>`
              }
              <div class="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm tech-border border-outline-variant text-tertiary font-label-technical text-xs px-3 py-1 uppercase font-bold">
                ${producto.categoria ? producto.categoria.toUpperCase() : "HERITAGE"}
              </div>
              <div class="absolute bottom-4 right-4 bg-surface text-primary font-label-technical text-[10px] px-2 py-1 tech-border">
                SPEC-SHEET
              </div>
            </div>
            <!-- Thumbnails -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              ${(producto.galeria || [mainImg]).map((g, i) => {
                const tIsUrl = g.startsWith("http");
                return `
                <div class="aspect-square tech-border border-outline-variant bg-surface-container-low overflow-hidden cursor-pointer hover:border-tertiary transition-colors thumb-btn" data-img="${g}" role="button" tabindex="0" aria-label="Imagen ${i + 1} de ${producto.galeria?.length || 1}">
                  ${tIsUrl
                    ? `<div class="w-full h-full bg-cover bg-center" style="background-image: url('${g}')"></div>`
                    : `<div class="w-full h-full" style="background:${g}"></div>`
                  }
                </div>`;
              }).join("")}
            </div>
          </div>

          <!-- Product Info Spec Sheet -->
          <div class="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-2">// GARMENT SPEC SHEET · ${producto.ref || "BK-ART-00" + producto.id}</span>
              <h1 class="font-display-lg text-3xl sm:text-5xl text-primary uppercase leading-tight mb-4">${producto.nombre.toUpperCase()}</h1>
              <div class="flex items-center gap-3 font-label-technical text-xs mb-6">
                <span class="text-tertiary">★★★★★</span>
                <span class="text-on-surface-variant font-bold">${producto.rating.toFixed(1)}/5 · BAKAAT VERIFIED (${producto.reviews} RESEÑAS)</span>
              </div>
              <div class="font-display-lg text-3xl text-tertiary font-bold mb-6">${money(producto.precio)}</div>
              <p class="font-body-md text-on-surface-variant text-base leading-relaxed border-l-2 border-tertiary pl-4 mb-8">${producto.descripcion}</p>
            </div>

            <div class="space-y-6 tech-border-t border-outline-variant pt-6">
              <!-- Colors -->
              <div>
                <div class="flex justify-between items-center font-label-technical text-xs mb-3">
                  <span class="text-outline uppercase">COLOR / ACABADO:</span>
                  <strong class="text-primary uppercase font-bold" id="colorName">${color.nombre.toUpperCase()}</strong>
                </div>
                <div class="flex gap-3">
                  ${producto.colores.map((c, i) => `
                    <button class="w-9 h-9 border ${i === state.colorIndex ? "border-tertiary ring-2 ring-tertiary" : "border-outline-variant"} transition-all cursor-pointer" data-color="${i}" style="background:${c.hex}" title="${c.nombre}" aria-label="Color ${c.nombre}" aria-pressed="${i === state.colorIndex}"></button>
                  `).join("")}
                </div>
              </div>

              <!-- Sizes -->
              <div>
                <div class="flex justify-between items-center font-label-technical text-xs mb-3">
                  <span class="text-outline uppercase">TALLA DE CONFECCIÓN:</span>
                  <span class="text-tertiary font-bold">${state.talla}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  ${producto.tallas.map(t => `
                    <button class="size-btn px-4 py-2 border ${state.talla === t ? "border-tertiary bg-tertiary text-on-tertiary font-bold" : "border-outline-variant text-on-surface hover:border-primary"} font-label-technical text-xs uppercase transition-colors" data-talla="${t}">
                      ${t}
                    </button>
                  `).join("")}
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button class="flex-grow py-4 px-8 bg-tertiary text-on-tertiary font-label-technical text-xs uppercase tracking-widest hover:bg-tertiary-fixed transition-colors font-bold" id="addToCartBtn">
                  AÑADIR AL CARRITO · ${money(producto.precio * state.cantidad)}
                </button>
              </div>

              <!-- Specs Perks -->
              <ul class="space-y-3 pt-6 border-t border-outline-variant font-label-technical text-xs text-on-surface-variant">
                <li class="flex items-center gap-3"><span class="material-symbols-outlined text-tertiary text-lg">undo</span> Devolución gratuita en 30 días</li>
                <li class="flex items-center gap-3"><span class="material-symbols-outlined text-tertiary text-lg">local_shipping</span> Logística express 24-72h Bogotá / Nacional</li>
                <li class="flex items-center gap-3"><span class="material-symbols-outlined text-tertiary text-lg">verified</span> Confección técnica estándar BKT-01</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Materials / Tech Specs -->
        <section class="border-t border-outline-variant pt-12 mb-16">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-4">// MATERIALES Y CONSTRUCCIÓN</span>
              <ul class="space-y-3">
                ${producto.materiales.map(m => `
                  <li class="flex items-start gap-3 font-body-md text-sm text-on-surface-variant border-b border-outline-variant pb-3">
                    <span class="material-symbols-outlined text-tertiary text-base mt-0.5">chevron_right</span>
                    <span>${m}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
            <div>
              <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-4">// FICHA TÉCNICA</span>
              <div class="space-y-2 font-label-technical text-xs">
                <div class="flex justify-between border-b border-outline-variant py-2"><span class="text-outline uppercase">Referencia</span><span class="text-primary font-bold">${producto.ref || "BK-ART-00" + producto.id}</span></div>
                <div class="flex justify-between border-b border-outline-variant py-2"><span class="text-outline uppercase">Categoría</span><span class="text-primary font-bold uppercase">${producto.categoria}</span></div>
                <div class="flex justify-between border-b border-outline-variant py-2"><span class="text-outline uppercase">Valoración</span><span class="text-tertiary font-bold">${producto.rating.toFixed(1)}/5.0</span></div>
                <div class="flex justify-between border-b border-outline-variant py-2"><span class="text-outline uppercase">Reseñas</span><span class="text-primary font-bold">${producto.reviews}</span></div>
                <div class="flex justify-between border-b border-outline-variant py-2"><span class="text-outline uppercase">Tallas</span><span class="text-primary font-bold uppercase">${producto.tallas.join(" / ")}</span></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Related Products -->
        <section class="border-t border-outline-variant pt-12">
          <div class="flex justify-between items-end mb-8">
            <div>
              <span class="font-label-technical text-xs text-tertiary uppercase tracking-widest block mb-2">// RECOMENDADOS ARCHIVO</span>
              <h2 class="font-display-lg text-3xl text-primary uppercase">PIEZAS COMPLEMENTARIAS</h2>
            </div>
            <a class="font-label-technical text-xs text-primary hover:text-tertiary uppercase border-b border-outline pb-1" href="${basePath}tienda.html">VER CATÁLOGO</a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${relacionadosList.map(productCard).join("")}
          </div>
        </section>
      </div>`;

    initProductCards();
    bind();
  }

  function bind() {
    view.querySelectorAll("[data-color]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.colorIndex = Number(btn.dataset.color);
        render();
      });
    });

    view.querySelectorAll(".size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.talla = btn.dataset.talla;
        render();
      });
    });

    view.querySelectorAll(".thumb-btn").forEach(btn => {
      const swapImg = () => {
        const img = btn.dataset.img;
        const mainImgDiv = view.querySelector("#mainImgContainer > div");
        if (mainImgDiv) {
          if (img.startsWith("http")) {
            mainImgDiv.style.backgroundImage = `url('${img}')`;
          } else {
            mainImgDiv.style.background = img;
          }
        }
      };
      btn.addEventListener("click", swapImg);
      btn.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          swapImg();
        }
      });
    });

    const addBtn = view.querySelector("#addToCartBtn");
    addBtn?.addEventListener("click", () => {
      const color = producto.colores[state.colorIndex];
      addToCart(producto.id, { talla: state.talla, color: color.nombre, colorHex: color.hex });
      addBtn.textContent = "AGREGADO ✓";
      setTimeout(() => {
        addBtn.textContent = `AÑADIR AL CARRITO · ${money(producto.precio * state.cantidad)}`;
      }, 1200);
    });
  }

  render();
}


