import { productos } from "../data/productos.js";
import { addToCart } from "../services/cartService.js";
import { basePath } from "../utils/path.js";

export function renderHome() {
  return `
    <main class="pt-16 md:pt-20 flex-grow">
      <!-- Hero Carousel -->
      <section class="relative min-h-[85vh] w-full flex items-center px-margin-mobile md:px-margin-desktop py-20 overflow-hidden tech-border-b" id="heroCarousel">
        <!-- Slides -->
        <div class="absolute inset-0 z-0" id="heroTrack">
          <div class="hero-slide active absolute inset-0 transition-opacity duration-700 opacity-100">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/img/imagen_carrusel_inicio.png');"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30"></div>
            <div class="absolute inset-0 muisca-pattern opacity-20"></div>
          </div>
          <div class="hero-slide absolute inset-0 transition-opacity duration-700 opacity-0">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEcOXoM66w22XK0rWGUsE3w9knMIPa3rdb3zCr3j3UKvpgMJPPzJTZLzs09ybepPXE2a0pMQohv3xVLbn6-iMP6ZOj5yWxDkAqpJhkwba6CRj55ScQkuFMpU2enrnQvhqBb4-MSUVzpxrtimouUehO1npezeKIt3iO_0_-yTTRhCxvBMUWN7_N6nvQZtVFOREOPtQj_QjSC1d34-NUfiqW2Y6mr3h2qfGYiGQIWpBKhkay83NuuoLnbA');"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30"></div>
            <div class="absolute inset-0 muisca-pattern opacity-20"></div>
          </div>
          <div class="hero-slide absolute inset-0 transition-opacity duration-700 opacity-0">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBITYEOKrbnglEglUlSd-JZVyQUICNMCXm-2j5saudSM9dvcNsWabuE3I0KNEHigczCI5BAhv8MSfoEUocOgCOnlJEXmS_eLI4M8FqRhXKdNCtoEeHkXWJcFoBU57PaXndB80VyyU8zDoVpRSZJFyfuaa37CdDIWq8XijmXh1aGCqSoRhuWZePwsSEDike2At_P7nTgzUONlZxIxRUxnGqFlPzi-pZ21ElIZTuq17lLT2VhYwoRDpxysA');"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30"></div>
            <div class="absolute inset-0 muisca-pattern opacity-20"></div>
          </div>
        </div>

        <!-- Slide Content -->
        <div class="relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left gap-6" id="heroContent">
          <div class="inline-block px-4 py-1 tech-border border-outline font-label-technical text-label-technical text-primary bg-surface-container-low mb-2 uppercase tracking-widest" id="heroBadge">
            EDICIÓN 002 // ESTRUCTURA & ORO MATE
          </div>
          <h1 class="font-display-lg text-4xl sm:text-6xl md:text-7xl lg:text-[80px] text-on-surface uppercase max-w-4xl leading-none" id="heroTitle">
            FORJADO EN EL ASFALTO. <br>
            <span class="text-tertiary">ELEVADO POR LA GEOMETRÍA.</span>
          </h1>
          <p class="font-body-lg text-lg text-on-surface-variant max-w-2xl mt-4" id="heroDesc">
            Indumentaria de alta densidad nacida del paisaje brutalista de Bogotá. Siluetas contemporáneas atravesadas por la precisión simétrica de la orfebrería geométrica.
          </p>
          <div class="flex flex-wrap gap-4 mt-6">
            <a class="inline-flex items-center justify-center px-8 py-4 bg-tertiary text-on-tertiary font-label-technical text-label-technical uppercase tracking-widest hover:bg-tertiary-fixed transition-colors" href="${basePath}tienda.html">
              EXPLORAR PIEZAS + <span class="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </a>
            <a class="inline-flex items-center justify-center px-8 py-4 bg-transparent text-tertiary tech-border-gold font-label-technical text-label-technical uppercase tracking-widest hover:bg-surface-container-high transition-colors" href="${basePath}nosotros.html">
              DESCUBRIR EL CONCEPTO
            </a>
          </div>

          <!-- Technical Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-12 w-full md:w-auto tech-border-t border-outline-variant pt-8">
            <div class="flex flex-col">
              <span class="font-display-lg text-3xl md:text-4xl text-on-surface">450 GSM</span>
              <span class="font-label-technical text-label-technical text-outline uppercase mt-1">Algodón Pesado<br>Heavyweight</span>
            </div>
            <div class="flex flex-col">
              <span class="font-display-lg text-3xl md:text-4xl text-on-surface">EDICIÓN CORTA</span>
              <span class="font-label-technical text-label-technical text-outline uppercase mt-1">Cápsulas Numeradas<br>Limitadas</span>
            </div>
            <div class="flex flex-col">
              <span class="font-display-lg text-3xl md:text-4xl text-on-surface">BOGOTÁ 4.6°N</span>
              <span class="font-label-technical text-label-technical text-outline uppercase mt-1">Diseñado & Confeccionado<br>Localmente</span>
            </div>
            <div class="flex flex-col">
              <span class="font-display-lg text-3xl md:text-4xl text-on-surface">PRECISIÓN</span>
              <span class="font-label-technical text-label-technical text-outline uppercase mt-1">Bordados de Alta<br>Densidad</span>
            </div>
          </div>
        </div>

        <!-- Carousel Controls -->
        <div class="absolute bottom-8 right-margin-mobile md:right-margin-desktop z-20 flex items-center gap-4 md:gap-6">
          <div class="flex gap-2" id="heroDots">
            <button class="hero-dot w-12 h-1 bg-primary cursor-pointer transition-colors" data-index="0" aria-label="Slide 1"></button>
            <button class="hero-dot w-12 h-1 bg-surface-variant cursor-pointer transition-colors" data-index="1" aria-label="Slide 2"></button>
            <button class="hero-dot w-12 h-1 bg-surface-variant cursor-pointer transition-colors" data-index="2" aria-label="Slide 3"></button>
          </div>
          <div class="flex gap-2">
            <button class="p-2 border border-outline-variant hover:bg-surface-container hover:text-primary text-on-surface-variant transition-all bg-background/50 backdrop-blur-sm" id="heroPrev" aria-label="Slide anterior">
              <span class="material-symbols-outlined block">arrow_back</span>
            </button>
            <button class="p-2 border border-outline-variant hover:bg-surface-container hover:text-primary text-on-surface-variant transition-all bg-background/50 backdrop-blur-sm" id="heroNext" aria-label="Slide siguiente">
              <span class="material-symbols-outlined block">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Manifesto / Concept Section -->
      <section class="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest tech-border-b">
          <div class="flex items-center gap-4 mb-8 md:mb-12">
            <div class="h-px w-12 bg-tertiary"></div>
            <h2 class="font-label-technical text-label-technical text-tertiary uppercase tracking-widest">// ARQUITECTURA & PATRÓN</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div class="md:col-span-5 relative">
              <div class="aspect-[3/4] tech-border border-outline-variant p-2 bg-surface-container-low relative">
                <!-- Image -->
                <div class="w-full h-full bg-surface-variant relative overflow-hidden bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5bjcwsDBpapOADFwWKWRLE5olj9q7v2LGqQImYyq4_Wcj85N-nKRG8im7dyiBZA8eGF_bA5Y1GUvZXNtiMioSoXxa5KAXMSgdapK0qLgq0owgSP9qPQ_3Yjf9F2nvWntmpD7DSvV1egeS4stEHFWIsGe9ZgA8BUqOQZ8lI6z6aSIatYo0QJ-BXJwDmth7TQMsEWbCSZaurSFb5VFqHDJIjgdP8FKpbjTMY-ISNMAMfHJx3rAbOms9zQ');">
                  <div class="absolute bottom-4 right-4 bg-surface text-primary font-label-technical text-[10px] px-2 py-1 tech-border">SPEC-001</div>
                </div>
                <!-- Decorative Corner Brackets -->
                <div class="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-tertiary"></div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-tertiary"></div>
              </div>
            </div>
            <div class="md:col-span-7 md:pl-12 flex flex-col gap-6 mt-8 md:mt-0">
              <h3 class="font-display-lg text-3xl md:text-5xl lg:text-[64px] leading-tight text-on-surface uppercase">
                LA REINTERPRETACIÓN <br><span class="text-tertiary">TÁCTIL DE LA FORMA.</span>
              </h3>
              <p class="font-body-md text-base text-on-surface-variant max-w-xl">
                BAKAAT nace en el punto de encuentro entre la solidez del concreto urbano y la minuciosa elegancia de la orfebrería antigua. Tomamos la simetría de las piezas doradas, sus relieves y grillas vectoriales para traducirlas en un lenguaje de streetwear arquitectónico.
              </p>
              <p class="font-body-md text-base text-on-surface-variant max-w-xl">
                Cada prenda es una estructura pensada para perdurar: volúmenes holgados que sostienen una postura imponente, acabados neutros y sutiles bordados en relieve que capturan la luz con sobriedad.
              </p>
              <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="tech-border border-outline-variant p-4 flex gap-4 items-start bg-surface">
                  <span class="material-symbols-outlined text-tertiary text-2xl">architecture</span>
                  <div>
                    <h4 class="font-label-technical text-label-technical text-on-surface uppercase mb-1">// VOLUMEN ESTRUCTURAL</h4>
                    <p class="font-body-md text-sm text-on-surface-variant">Patronaje de caja amplia que mantiene una caída impecable sin perder fluidez.</p>
                  </div>
                </div>
                <div class="tech-border border-outline-variant p-4 flex gap-4 items-start bg-surface">
                  <span class="material-symbols-outlined text-tertiary text-2xl">texture</span>
                  <div>
                    <h4 class="font-label-technical text-label-technical text-on-surface uppercase mb-1">// ORFEBRERÍA GRÁFICA</h4>
                    <p class="font-body-md text-sm text-on-surface-variant">Bordados de densidad superior en hilo de tono oro mate y pigmentos industriales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <!-- Featured Products (Bento Grid Style) -->
      <section class="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <div class="flex items-center gap-4 mb-4">
                <div class="h-px w-12 bg-tertiary"></div>
                <h2 class="font-label-technical text-label-technical text-tertiary uppercase tracking-widest">SELECCIÓN TÉCNICA // EDICIÓN ACTUAL</h2>
              </div>
            </div>
            <a class="font-label-technical text-label-technical text-primary hover:text-tertiary transition-colors uppercase border-b border-outline hover:border-tertiary pb-1 self-start md:self-auto" href="${basePath}tienda.html">
              [ VER CATÁLOGO COMPLETO → ]
            </a>
          </div>

          <!-- Bento Grid Layout -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            <!-- Main Feature Product -->
            <div class="md:col-span-8 group relative tech-border border-outline-variant bg-surface-container-low overflow-hidden min-h-[400px] md:min-h-[500px] md:h-[600px] flex flex-col justify-end">
              <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBh-TdUwlRvvOFungWvBc4JA3fsAsGE5MuemnA4hwqyD4VNdeFg0lI2YQGAgcpCbW3Y6ud6sl-qRlliZuz33QyN3Tnf3TO_FQImNworbcnQXFfioXLW4bpYzF2H1B7S4LjwzPazFpJWixr9ZhWq-Y77sDGDodxmOLxpZRRzStrDl77z4xnEfQKzWzvnxAbuP1XxgiwtFXKvuh0qk1aGeMSkwYDHBdmwm7SxXN-QX8M9z0XROKEzWnMdBw');"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface/40 to-transparent"></div>
              <div class="absolute top-6 left-6 flex gap-2">
                <span class="px-2 py-1 bg-tertiary text-on-tertiary font-label-technical text-[10px] uppercase">HERITAGE / BGT-001</span>
              </div>
              <div class="relative z-10 p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h4 class="font-display-lg text-2xl md:text-3xl text-on-surface uppercase mb-2">HOODIE "TUNJUELO" HEAVYWEIGHT</h4>
                  <div class="font-label-technical text-label-technical text-tertiary uppercase tracking-widest mb-2">
                    <span>$320.000 COP</span> <span class="mx-2 text-outline">|</span> <span>Algodón Pesado 450 GSM</span>
                  </div>
                  <p class="font-body-md text-sm text-on-surface-variant max-w-md">Relieve geométrico en espalda inspirado en la abstracción vectorial de figuras orfebres.<br><span class="text-[10px] text-outline italic">* Incluye macrofotografía de detalle de bordado al hacer hover.</span></p>
                </div>
                <button class="add-to-cart-btn tech-border-gold px-6 py-3 bg-surface/80 backdrop-blur-md text-tertiary font-label-technical text-label-technical uppercase hover:bg-tertiary hover:text-on-tertiary transition-colors whitespace-nowrap" data-id="1">
                  [ AÑADIR A LA SELECCIÓN ]
                </button>
              </div>
            </div>

            <!-- Secondary Feature Product -->
            <div class="md:col-span-4 group relative tech-border border-outline-variant bg-surface-container-low overflow-hidden min-h-[400px] md:min-h-[500px] md:h-[600px] flex flex-col">
              <div class="h-2/3 bg-cover bg-center relative" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcI3UGWyeTFFxOyuYxKE1n9wzIR7VWfL97oHJBD4PcrWJ4BzklmZURZQycSAvyAU3AFG0dFoqy-9HAbTTtQvK9JXqYvpkD4DqZnxo3asIqEqu6OfZg8csa6nFnVvvIF0l8VH6BLvXvZLvqUrse8mRei_V7Gk82knO3AX2r3wJ77fcbcP92AeeEl6rb589UpeSqaHgOsKTaPpatbzKd3dZCd4ADG57m3MHWogMDho8BHrRFz74m4GFdqQ');"></div>
              <div class="p-6 flex-grow flex flex-col justify-between bg-surface-container-low border-t border-outline-variant">
                <div>
                  <div class="flex gap-2 mb-3">
                    <span class="px-2 py-1 bg-tertiary text-on-tertiary font-label-technical text-[10px] uppercase">TECH / BGT-002</span>
                  </div>
                  <h4 class="font-display-lg text-xl md:text-2xl text-on-surface uppercase mb-1">PANTALÓN CARGO TÁCTICO "ZIPA"</h4>
                  <div class="font-label-technical text-label-technical text-on-surface-variant uppercase mb-2"><span>$280.000 COP</span> <span class="mx-2 text-outline">|</span> <span class="text-xs">Ripstop / Fit Relajado</span></div>
                  <p class="font-body-md text-xs text-on-surface-variant">Bolsillos de volumen variable y herrajes metálicos de alta durabilidad.<br><span class="text-[10px] text-outline italic">* Ajuste de tobillo con pasador técnico.</span></p>
                </div>
                <button class="add-to-cart-btn w-full mt-4 tech-border-gold px-4 py-2 bg-transparent text-tertiary font-label-technical text-[12px] uppercase hover:bg-tertiary hover:text-on-tertiary transition-colors" data-id="2">
                  [ AÑADIR A LA SELECCIÓN ]
                </button>
              </div>
            </div>
            </div>
          </div>
      </section>

      <!-- Newsletter / CTA -->
      <section class="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-outline-variant relative overflow-hidden">
        <div class="absolute inset-0 muisca-pattern opacity-10"></div>
        <div class="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
          <span class="material-symbols-outlined text-4xl md:text-5xl text-tertiary mb-6">vpn_key</span>
          <h2 class="font-display-lg text-3xl md:text-5xl text-on-surface uppercase mb-4">REGISTRO DE ESTUDIO // ACCESO ANTICIPADO</h2>
          <p class="font-body-md text-base text-on-surface-variant mb-10 max-w-xl">
            Forma parte de nuestro registro directo. Recibe notificaciones sobre nuevos drops, lanzamientos de cápsulas privadas y proyectos de diseño experimental antes del acceso público.
          </p>
          <form class="w-full max-w-md flex flex-col sm:flex-row gap-4" id="newsletterForm">
            <div class="flex-grow relative">
              <input class="w-full bg-surface border-b-2 border-outline-variant focus:border-tertiary focus:outline-none text-on-surface font-label-technical text-label-technical px-3 py-4 transition-colors placeholder:text-outline-variant uppercase" placeholder="[ Input: DIRECCIÓN DE CORREO ELECTRÓNICO... ]" required type="email">
            </div>
            <button class="px-8 py-4 bg-primary text-on-primary font-label-technical text-label-technical uppercase tracking-widest hover:bg-surface-tint transition-colors whitespace-nowrap" type="submit">
              [ Botón: REGISTRARSE ]
            </button>
          </form>
        </div>
      </section>
    </main>`;
}

export function initHome() {
  // Hero Carousel
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prev = document.querySelector("#heroPrev");
  const next = document.querySelector("#heroNext");
  const badge = document.querySelector("#heroBadge");
  const title = document.querySelector("#heroTitle");
  const desc = document.querySelector("#heroDesc");

  const heroData = [
    {
      badge: "COLECCIÓN ORIGEN 01",
      title: 'El Dorado <br><span class="text-tertiary">Es Ahora.</span>',
      desc: "Estética ancestral, ritmo urbano. Prendas técnicas sobredimensionadas inspiradas en la geometría sagrada Muisca y la brutalidad del concreto capitalino."
    },
    {
      badge: "DROP 002 · CONCRETO",
      title: 'Forjado en <br><span class="text-tertiary">el Asfalto.</span>',
      desc: "Cada pieza es un artefacto de resistencia. Materiales industriales fusionados con iconografía ancestral para la jungla urbana."
    },
    {
      badge: "ARCHIVO BKT · HERENCIA",
      title: 'Legado que <br><span class="text-tertiary">se Viste.</span>',
      desc: "No romantizamos el pasado; lo extraemos, lo destilamos y lo forjamos en armaduras contemporáneas para el explorador moderno."
    }
  ];

  if (slides.length) {
    let current = 0;
    let timer = null;

    function show(idx) {
      current = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.style.opacity = i === current ? "1" : "0";
        s.classList.toggle("active", i === current);
      });
      dots.forEach((d, i) => {
        d.className = `hero-dot w-12 h-1 cursor-pointer transition-colors ${i === current ? "bg-primary" : "bg-surface-variant"}`;
      });
      const data = heroData[current];
      if (badge) badge.textContent = data.badge;
      if (title) title.innerHTML = data.title;
      if (desc) desc.textContent = data.desc;
    }

    prev?.addEventListener("click", () => { show(current - 1); restartTimer(); });
    next?.addEventListener("click", () => { show(current + 1); restartTimer(); });
    dots.forEach(d => {
      d.addEventListener("click", () => { show(Number(d.dataset.index)); restartTimer(); });
    });

    function startTimer() { timer = setInterval(() => show(current + 1), 6000); }
    function restartTimer() { clearInterval(timer); startTimer(); }
    startTimer();
  }

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const id = Number(btn.dataset.id);
      const prod = productos.find(p => p.id === id);
      if (prod) {
        addToCart(id, { talla: prod.tallas[0], color: prod.colores[0].nombre, colorHex: prod.colores[0].hex });
        const origText = btn.textContent;
        btn.textContent = "AGREGADO ✓";
        setTimeout(() => { btn.textContent = origText; }, 1200);
      }
    });
  });

  document.querySelector("#newsletterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    alert("CÓDIGO DE REGISTRO CONFIRMADO: Te has unido al registro clasificado de BAKAAT.");
    e.target.reset();
  });
}
