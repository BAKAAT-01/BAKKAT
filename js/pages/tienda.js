import { productos } from "../data/productos.js";
import { addToCart } from "../services/cartService.js";
import { money } from "../utils/format.js";
import { basePath, assetsPath } from "../utils/path.js";

export function renderTienda() {
  const cats = ["Todos", ...new Set(productos.map(p => p.categoria))];

  return `
    <main class="flex-grow">
      <!-- Page Header -->
      <header class="pt-[140px] px-margin-mobile md:px-margin-desktop pb-16 flex flex-col md:flex-row gap-8 items-start justify-between border-b border-outline-variant relative overflow-hidden muisca-pattern bg-surface-container-lowest">
        <div class="flex flex-col gap-6 max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 border border-tertiary bg-tertiary-container px-3 py-1 w-max">
            <div class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            <span class="font-label-technical text-label-technical text-tertiary uppercase tracking-[0.2em]">EDICIONES LIMITADAS</span>
          </div>
          <h1 class="font-display-lg text-5xl sm:text-7xl md:text-9xl text-primary tracking-tighter uppercase leading-none">Nuestra<br>tienda</h1>
          <p class="font-body-lg text-on-surface-variant max-w-md border-l-2 border-tertiary pl-4">
            Explora nuestras prendas y filtra por categoría. Diseños técnicos contemporáneos fusionados con auténtica iconografía Muisca.
          </p>
        </div>
        <div class="w-48 h-48 md:w-64 md:h-64 shrink-0 border border-outline-variant p-2 relative z-10 bg-surface-container-lowest shadow-[8px_8px_0px_#b6d088]">
          <img alt="Logo BAKAAT" class="w-full h-full object-cover" src="${assetsPath}img/BAKAAT.png">
        </div>
      </header>

      <!-- Controls / Filters -->
      <section class="px-margin-mobile md:px-margin-desktop py-8 border-b border-outline-variant flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center bg-surface-container-lowest">
        <div class="w-full lg:w-1/3 border border-outline-variant p-3 flex items-center bg-surface group focus-within:border-tertiary transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant mr-3 group-focus-within:text-tertiary">search</span>
          <input class="bg-transparent border-none outline-none w-full font-label-technical text-label-technical text-primary focus:ring-0 placeholder:text-outline uppercase" id="searchInput" placeholder="BUSCAR PRODUCTO..." type="text">
        </div>
        <div class="flex flex-col md:flex-row gap-8 w-full lg:w-auto items-start md:items-center">
          <div class="flex flex-col gap-3 w-full md:w-auto">
            <span class="font-label-technical text-label-technical text-outline uppercase tracking-widest text-[10px]">Categoría</span>
            <div class="flex flex-wrap gap-2" id="categoryFilters">
              ${cats.map((c, i) => {
                const count = c === "Todos" ? productos.length : productos.filter(p => p.categoria === c).length;
                return `
                  <button class="filter-btn border ${i === 0 ? "border-tertiary bg-tertiary-container text-tertiary" : "border-outline-variant text-on-surface hover:border-primary"} font-label-technical text-label-technical px-3 py-1.5 uppercase transition-colors flex items-center gap-2" data-category="${c}">
                    ${c} <span class="${i === 0 ? "bg-tertiary text-on-tertiary" : "bg-surface-variant text-on-surface"} px-1 py-0.5 text-[10px] font-bold">${count}</span>
                  </button>`;
              }).join("")}
            </div>
          </div>
          <div class="flex flex-col gap-3 w-full md:w-auto">
            <span class="font-label-technical text-label-technical text-outline uppercase tracking-widest text-[10px]">Ordenar Por</span>
            <div class="relative border border-outline-variant bg-surface group">
              <select class="bg-transparent border-none p-2 pr-10 font-label-technical text-label-technical text-primary focus:ring-0 uppercase appearance-none w-full cursor-pointer" id="sortSelect">
                <option value="destacados">Destacados</option>
                <option value="precio-desc">Precio: Alto a Bajo</option>
                <option value="precio-asc">Precio: Bajo a Alto</option>
              </select>
              <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Grid -->
      <section class="px-margin-mobile md:px-margin-desktop py-16 bg-surface">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter" id="productGrid"></div>
      </section>
    </main>`;
}

export function initTienda() {
  const grid = document.querySelector("#productGrid");
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");
  const categoryBtns = document.querySelectorAll(".filter-btn");

  let currentCategory = "Todos";
  let currentSearch = "";
  let currentSort = "destacados";

  function renderList() {
    let list = [...productos];

    if (currentCategory !== "Todos") {
      list = list.filter(p => p.categoria === currentCategory);
    }

    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      list = list.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
    }

    if (currentSort === "precio-desc") {
      list.sort((a, b) => b.precio - a.precio);
    } else if (currentSort === "precio-asc") {
      list.sort((a, b) => a.precio - b.precio);
    }

    if (!list.length) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center tech-border border-outline-variant bg-surface-container-low p-8">
          <span class="material-symbols-outlined text-4xl text-tertiary mb-4">search_off</span>
          <h3 class="font-display-lg text-2xl text-on-surface uppercase mb-2">Sin Resultados</h3>
          <p class="font-body-md text-on-surface-variant">No se encontraron prendas con los criterios especificados.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map(p => {
      const imgSrc = p.imagen || p.galeria?.[0] || "";
      const isUrl = imgSrc.startsWith("http");

      const imgContent = isUrl 
        ? `<div class="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" style="background-image: url('${imgSrc}')"></div>` 
        : `<div class="w-full h-full" style="background:${imgSrc}"></div>`;

      return `
        <article class="border border-outline-variant flex flex-col bg-surface-container-low group hover:border-tertiary transition-colors">
          <div class="relative h-[360px] sm:h-[480px] border-b border-outline-variant overflow-hidden bg-surface-variant">
            <a href="${basePath}producto.html?id=${p.id}" class="block w-full h-full">
              ${imgContent}
            </a>
            <div class="absolute top-4 left-4 bg-surface border border-outline px-2 py-1 font-label-technical text-label-technical text-primary uppercase shadow-[4px_4px_0px_#b6d088]">
              ${p.categoria}
            </div>
          </div>
          <div class="p-4 flex flex-col gap-4">
            <div class="flex justify-between items-start gap-4">
              <h3 class="font-display-lg text-base sm:text-lg text-primary uppercase leading-tight tracking-tight">
                <a class="hover:text-tertiary transition-colors" href="${basePath}producto.html?id=${p.id}">${p.nombre}</a>
              </h3>
              <span class="font-label-technical text-label-technical text-on-surface shrink-0 mt-1">${money(p.precio)}</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-outline-variant border-dashed">
              <span class="font-label-technical text-on-surface-variant text-[10px] tracking-widest tracking-[0.2em]">ID: ${p.id}</span>
              <button class="add-to-cart-shop border border-tertiary text-tertiary font-label-technical px-4 py-2 hover:bg-tertiary hover:text-on-tertiary transition-colors uppercase text-[10px] tracking-widest" data-id="${p.id}">
                AGREGAR
              </button>
            </div>
          </div>
        </article>`;
    }).join("");

    grid.querySelectorAll(".add-to-cart-shop").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const prod = productos.find(p => p.id === id);
        if (prod) {
          addToCart(id, { talla: prod.tallas[0], color: prod.colores[0].nombre, colorHex: prod.colores[0].hex });
          btn.textContent = "AGREGADO ✓";
          setTimeout(() => { btn.textContent = "AGREGAR"; }, 1200);
        }
      });
    });
  }

  searchInput?.addEventListener("input", e => {
    currentSearch = e.target.value;
    renderList();
  });

  sortSelect?.addEventListener("change", e => {
    currentSort = e.target.value;
    renderList();
  });

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => {
        b.className = "filter-btn border border-outline-variant text-on-surface hover:border-primary font-label-technical text-label-technical px-3 py-1.5 uppercase transition-colors flex items-center gap-2";
        const badge = b.querySelector("span");
        if (badge) badge.className = "bg-surface-variant text-on-surface px-1 py-0.5 text-[10px] font-bold";
      });
      btn.className = "filter-btn border border-tertiary bg-tertiary-container text-tertiary font-label-technical text-label-technical px-3 py-1.5 uppercase transition-colors flex items-center gap-2";
      const badge = btn.querySelector("span");
      if (badge) badge.className = "bg-tertiary text-on-tertiary px-1 py-0.5 text-[10px] font-bold";

      currentCategory = btn.dataset.category;
      renderList();
    });
  });

  renderList();
}
