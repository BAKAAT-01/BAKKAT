import { addToCart } from "../services/cartService.js";
import { basePath } from "../utils/path.js";
import { money } from "../utils/format.js";

export function productCard(product) {
  const imgSrc = product.imagen || product.galeria?.[0] || "";
  const isUrl = imgSrc.startsWith("http");

  return `
    <article class="group relative tech-border border-outline-variant bg-surface-container-low overflow-hidden flex flex-col justify-between">
      <a class="relative aspect-[4/5] block bg-surface-variant overflow-hidden" href="${basePath}producto.html?id=${product.id}">
        ${isUrl 
          ? `<div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style="background-image: url('${imgSrc}')"></div>` 
          : `<div class="w-full h-full" style="background:${imgSrc}"></div>`
        }
        <span class="absolute top-3 left-3 px-2 py-0.5 bg-surface/90 backdrop-blur-sm tech-border border-outline-variant text-tertiary font-label-technical text-[10px] uppercase font-bold">
          ${product.categoria ? product.categoria.toUpperCase() : "HERITAGE"}
        </span>
      </a>
      <div class="p-4 flex flex-col justify-between flex-grow bg-surface-container-low border-t border-outline-variant">
        <div>
          <h3 class="font-display-lg text-lg text-on-surface uppercase mb-1 line-clamp-1">
            <a class="hover:text-tertiary transition-colors" href="${basePath}producto.html?id=${product.id}">${product.nombre.toUpperCase()}</a>
          </h3>
          <span class="font-label-technical text-xs text-tertiary font-bold">${money(product.precio)}</span>
        </div>
        <button class="add-cart mt-4 w-full tech-border-gold py-2 bg-surface text-tertiary font-label-technical text-xs uppercase hover:bg-tertiary hover:text-on-tertiary transition-colors" data-id="${product.id}" aria-label="Añadir ${product.nombre} al carrito">
          AÑADIR AL CARRITO
        </button>
      </div>
    </article>`;
}

export function initProductCards() {
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(Number(btn.dataset.id));
      btn.textContent = "AGREGADO ✓";
      setTimeout(() => btn.textContent = "AÑADIR AL CARRITO", 1200);
    });
  });
}
