export function renderNosotros() {
  return `
    <main class="flex-grow flex flex-col w-full pt-16 md:pt-20">
      <!-- Hero Section Carousel -->
      <section class="relative w-full min-h-[70vh] flex flex-col justify-end px-margin-mobile md:px-margin-desktop py-12 md:py-20 border-b border-outline-variant overflow-hidden" id="herenciaHero">
        <!-- Carousel Backgrounds -->
        <div class="absolute inset-0 z-0 bg-background" id="herenciaTrack">
          <div class="herencia-slide active absolute inset-0 transition-opacity duration-700 opacity-100">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://media.giphy.com/media/xT0GqKpLMATelozxE4/giphy.gif');"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 mix-blend-multiply"></div>
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
          <div class="herencia-slide absolute inset-0 transition-opacity duration-700 opacity-0">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEcOXoM66w22XK0rWGUsE3w9knMIPa3rdb3zCr3j3UKvpgMJPPzJTZLzs09ybepPXE2a0pMQohv3xVLbn6-iMP6ZOj5yWxDkAqpJhkwba6CRj55ScQkuFMpU2enrnQvhqBb4-MSUVzpxrtimouUehO1npezeKIt3iO_0_-yTTRhCxvBMUWN7_N6nvQZtVFOREOPtQj_QjSC1d34-NUfiqW2Y6mr3h2qfGYiGQIWpBKhkay83NuuoLnbA');"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 mix-blend-multiply"></div>
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
          <div class="herencia-slide absolute inset-0 transition-opacity duration-700 opacity-0">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBITYEOKrbnglEglUlSd-JZVyQUICNMCXm-2j5saudSM9dvcNsWabuE3I0KNEHigczCI5BAhv8MSfoEUocOgCOnlJEXmS_eLI4M8FqRhXKdNCtoEeHkXWJcFoBU57PaXndB80VyyU8zDoVpRSZJFyfuaa37CdDIWq8XijmXh1aGCqSoRhuWZePwsSEDike2At_P7nTgzUONlZxIxRUxnGqFlPzi-pZ21ElIZTuq17lLT2VhYwoRDpxysA');"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 mix-blend-multiply"></div>
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
        </div>

        <div class="relative z-20 max-w-3xl">
          <div class="font-label-technical text-tertiary uppercase tracking-widest mb-4 drop-shadow-md text-xs">
            // PUNTO DE ORIGEN : BOGOTÁ D.C.
          </div>
          <h1 class="font-display-lg text-4xl sm:text-6xl md:text-7xl text-primary uppercase mb-6 leading-none drop-shadow-lg">
            Legado<br>
            <span class="text-primary-fixed-dim">Concreto</span>
          </h1>
          <p class="font-body-lg text-on-surface max-w-xl drop-shadow-md bg-black/40 p-4 border-l-4 border-tertiary backdrop-blur-sm text-base">
            Donde la cruda textura del paisaje urbano intersecta con el misticismo antiguo. No solo diseñamos prendas; ingeniamos artefactos culturales para el explorador moderno.
          </p>
        </div>

        <!-- Carousel Controls -->
        <div class="absolute bottom-8 right-margin-mobile md:right-margin-desktop z-20 flex items-center gap-4 md:gap-6">
          <div class="flex gap-2" id="herenciaDots">
            <button class="h-dot w-12 h-1 bg-primary cursor-pointer transition-colors" data-index="0"></button>
            <button class="h-dot w-12 h-1 bg-surface-variant cursor-pointer transition-colors" data-index="1"></button>
            <button class="h-dot w-12 h-1 bg-surface-variant cursor-pointer transition-colors" data-index="2"></button>
          </div>
          <div class="flex gap-2">
            <button class="p-2 border border-outline-variant hover:bg-surface-container hover:text-primary text-on-surface-variant transition-all bg-background/50 backdrop-blur-sm" id="hPrev">
              <span class="material-symbols-outlined block">arrow_back</span>
            </button>
            <button class="p-2 border border-outline-variant hover:bg-surface-container hover:text-primary text-on-surface-variant transition-all bg-background/50 backdrop-blur-sm" id="hNext">
              <span class="material-symbols-outlined block">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Concept Section -->
      <section class="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant">
        <div class="col-span-1 md:col-span-5 p-margin-mobile md:p-margin-desktop border-b md:border-b-0 md:border-r border-outline-variant flex flex-col justify-center bg-surface-container-lowest">
          <h2 class="font-display-lg text-3xl md:text-5xl text-primary uppercase mb-6 leading-tight">La Naturaleza<br>Dual</h2>
          <div class="space-y-4 text-on-surface-variant font-body-md text-base">
            <p>
              Nuestra filosofía de diseño está anclada en la fricción. La colisión entre la geometría eterna de la orfebrería precolombina y la arquitectura implacable del concreto brutalista.
            </p>
            <p>
              Cada pieza actúa como un contenedor. Una coraza técnica que protege, llevando sutiles interpretaciones algorítmicas de la iconografía Muisca incrustadas en sus mismas costuras.
            </p>
          </div>
          <div class="mt-8">
            <a class="bg-secondary text-background font-label-technical px-6 py-3 uppercase hover:bg-primary transition-colors inline-flex items-center gap-2 text-xs font-bold" href="#artesania">
              <span>LEER MANIFIESTO</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
        <div class="col-span-1 md:col-span-7 relative min-h-[450px]">
          <div class="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEcOXoM66w22XK0rWGUsE3w9knMIPa3rdb3zCr3j3UKvpgMJPPzJTZLzs09ybepPXE2a0pMQohv3xVLbn6-iMP6ZOj5yWxDkAqpJhkwba6CRj55ScQkuFMpU2enrnQvhqBb4-MSUVzpxrtimouUehO1npezeKIt3iO_0_-yTTRhCxvBMUWN7_N6nvQZtVFOREOPtQj_QjSC1d34-NUfiqW2Y6mr3h2qfGYiGQIWpBKhkay83NuuoLnbA');"></div>
          <div class="absolute bottom-4 right-4 bg-background border border-outline-variant px-3 py-1 font-label-technical text-on-surface-variant uppercase text-[10px]">
            FIG. 01 — TERRENO URBANO
          </div>
        </div>
      </section>

      <!-- Craft Section -->
      <section class="px-margin-mobile md:px-margin-desktop py-12 md:py-24 border-b border-outline-variant flex flex-col gap-12 bg-surface" id="artesania">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 class="font-display-lg text-3xl md:text-5xl text-primary uppercase mb-2">Artesanía Técnica</h2>
            <p class="font-body-md text-on-surface-variant max-w-md text-base">Ingeniería de precisión encuentra la narrativa ancestral a través de bordado industrial de alta resistencia.</p>
          </div>
          <div class="font-label-technical text-tertiary px-4 py-2 border border-tertiary uppercase text-xs">
            ESPEC: EMB-09X
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="col-span-1 md:col-span-2 relative min-h-[350px] border border-outline-variant">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBITYEOKrbnglEglUlSd-JZVyQUICNMCXm-2j5saudSM9dvcNsWabuE3I0KNEHigczCI5BAhv8MSfoEUocOgCOnlJEXmS_eLI4M8FqRhXKdNCtoEeHkXWJcFoBU57PaXndB80VyyU8zDoVpRSZJFyfuaa37CdDIWq8XijmXh1aGCqSoRhuWZePwsSEDike2At_P7nTgzUONlZxIxRUxnGqFlPzi-pZ21ElIZTuq17lLT2VhYwoRDpxysA');"></div>
          </div>
          <div class="col-span-1 flex flex-col gap-6">
            <div class="p-6 border border-outline-variant bg-surface-container-low flex-grow flex flex-col justify-between">
              <div>
                <span class="material-symbols-outlined text-tertiary mb-3 text-3xl">precision_manufacturing</span>
                <h3 class="font-display-lg text-xl text-primary uppercase mb-2">Hilo de Alta Tensión</h3>
                <p class="font-body-md text-on-surface-variant text-sm">Utilizando filamentos de nylon de grado industrial infundidos con núcleo metálico para durabilidad incomparable.</p>
              </div>
              <div class="mt-6 pt-4 border-t border-outline-variant font-label-technical text-on-surface text-[10px] uppercase flex justify-between">
                <span>Durabilidad</span>
                <span class="text-tertiary font-bold">98.5%</span>
              </div>
            </div>
            <div class="p-6 border border-outline-variant bg-surface-container-low flex-grow flex flex-col justify-between">
              <div>
                <span class="material-symbols-outlined text-tertiary mb-3 text-3xl">architecture</span>
                <h3 class="font-display-lg text-xl text-primary uppercase mb-2">Patrones Algorítmicos</h3>
                <p class="font-body-md text-on-surface-variant text-sm">Geometrías Muiscas antiguas mapeadas computacionalmente para conformarse a las zonas ergonómicas.</p>
              </div>
              <div class="mt-6 pt-4 border-t border-outline-variant font-label-technical text-on-surface text-[10px] uppercase flex justify-between">
                <span>Complejidad</span>
                <span class="text-tertiary font-bold">Nivel 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="px-margin-mobile md:px-margin-desktop py-12 md:py-24 bg-surface-container-lowest">
        <div class="font-label-technical text-outline uppercase tracking-widest text-[10px] mb-8 md:mb-12">
          Línea de Tiempo<br>
          <span class="text-on-surface-variant">Indumentaria</span>
        </div>
        <div class="relative border-l border-outline-variant ml-1.5 flex flex-col gap-10 md:gap-14">
          <div class="relative pl-10">
            <span class="absolute -left-[6px] top-1 w-3 h-3 rounded-full border border-outline-variant bg-background"></span>
            <div class="font-label-technical text-tertiary text-[10px] uppercase tracking-[0.2em] mb-2">ETQ_LRC // 2019</div>
            <h3 class="font-display-lg text-xl text-primary uppercase mb-2">El Origen</h3>
            <p class="font-body-md text-on-surface-variant text-sm max-w-md">Un grupo de jóvenes bogotanos decide trasladar la crudeza del asfalto capitalino a la estética ancestral. Nace la idea de un laboratorio de streetwear técnico.</p>
          </div>
          <div class="relative pl-10">
            <span class="absolute -left-[6px] top-1 w-3 h-3 rounded-full border border-outline-variant bg-background"></span>
            <div class="font-label-technical text-tertiary text-[10px] uppercase tracking-[0.2em] mb-2">ETQ_LRC // 2022</div>
            <h3 class="font-display-lg text-xl text-primary uppercase mb-2">Concreto y Fibra</h3>
            <p class="font-body-md text-on-surface-variant text-sm max-w-md">Primeras experimentaciones con materiales industriales y bordados de alta densidad en el centro de la ciudad. La visión toma forma física.</p>
          </div>
          <div class="relative pl-10">
            <span class="absolute -left-[6px] top-1 w-3 h-3 rounded-full border border-outline-variant bg-background"></span>
            <div class="font-label-technical text-tertiary text-[10px] uppercase tracking-[0.2em] mb-2">ETQ_LRC // 2024</div>
            <h3 class="font-display-lg text-xl text-primary uppercase mb-2">Herencia Experta</h3>
            <p class="font-body-md text-on-surface-variant text-sm max-w-md">Lanzamiento de la primera cápsula oficial. BAKAAT se establece como un puente entre el pasado Muisca y el futuro urbano.</p>
          </div>
          <div class="relative pl-10">
            <span class="absolute -left-[6px] top-1 w-3 h-3 rounded-full border border-tertiary bg-tertiary"></span>
            <div class="font-label-technical text-tertiary text-[10px] uppercase tracking-[0.2em] mb-2">ETQ_LRC // HOY</div>
            <h3 class="font-display-lg text-xl text-tertiary uppercase mb-2">Legado Actual</h3>
            <p class="font-body-md text-on-surface-variant text-sm max-w-md">Un ecosistema digital y físico que redefine el hardware de vestir para el explorador moderno.</p>
          </div>
        </div>
      </section>
    </main>`;
}

export function initNosotros() {
  const slides = document.querySelectorAll(".herencia-slide");
  const dots = document.querySelectorAll(".h-dot");
  const prev = document.querySelector("#hPrev");
  const next = document.querySelector("#hNext");

  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function show(idx) {
    current = (idx + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.style.opacity = i === current ? "1" : "0";
    });
    dots.forEach((d, i) => {
      d.className = `h-dot w-12 h-1 cursor-pointer transition-colors ${i === current ? "bg-primary" : "bg-surface-variant"}`;
    });
  }

  prev?.addEventListener("click", () => {
    show(current - 1);
    restartTimer();
  });
  next?.addEventListener("click", () => {
    show(current + 1);
    restartTimer();
  });
  dots.forEach(d => {
    d.addEventListener("click", () => {
      show(Number(d.dataset.index));
      restartTimer();
    });
  });

  function startTimer() {
    timer = setInterval(() => show(current + 1), 6000);
  }
  function restartTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
}

