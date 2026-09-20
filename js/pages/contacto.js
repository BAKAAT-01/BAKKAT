export function renderContacto() {
  return `
    <main class="flex-grow pt-16 md:pt-20">
      <!-- Header -->
      <header class="pt-12 md:pt-16 px-margin-mobile md:px-margin-desktop pb-12 border-b border-outline-variant grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-surface-container-lowest">
        <div class="md:col-span-8">
          <h1 class="font-display-lg text-5xl sm:text-7xl md:text-8xl text-primary tracking-tighter uppercase leading-none mb-6">Conexión<br>Técnica</h1>
          <p class="font-body-md text-on-surface-variant max-w-xl text-base">
            Información de contacto y redes sociales oficiales del archivo BAKAAT. Consultas de distribución, reportes de manufactura o soporte técnico.
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

      <!-- Coordenadas & Socials Section -->
      <section class="px-margin-mobile md:px-margin-desktop py-12 bg-surface">
        <div class="tech-border bg-surface-container-lowest p-8 group relative overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div class="space-y-6">
              <h2 class="font-display-lg text-2xl text-primary uppercase tracking-widest">COORDENADAS</h2>
              <div class="space-y-4 font-label-technical text-xs">
                <div>
                  <span class="text-tertiary uppercase block mb-1">CORREO PRINCIPAL</span>
                  <a class="font-display-lg text-xl text-on-surface hover:text-tertiary transition-colors" href="mailto:info@bakaat.com">info@bakaat.com</a>
                </div>
                <div>
                  <span class="text-tertiary uppercase block mb-1">UBICACIÓN FÍSICA</span>
                  <p class="text-on-surface font-bold uppercase">Bogotá D.C., Colombia<br>Laboratorio Central / Archivo BGT</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-end md:items-end">
              <div class="tech-border p-5 bg-surface-container-low w-full md:max-w-xs font-label-technical text-xs">
                <span class="text-outline uppercase block mb-3 text-[10px]">SISTEMA OPERATIVO</span>
                <div class="space-y-2">
                  <div class="flex justify-between"><span class="opacity-60">ENLACE:</span><span class="text-tertiary font-bold">ESTABLE</span></div>
                  <div class="flex justify-between"><span class="opacity-60">PROTOCOLO:</span><span class="text-tertiary font-bold">BKT 01</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-6 tech-border-t border-outline-variant">
            <span class="font-label-technical text-xs text-outline uppercase block mb-4">REDES SOCIALES / CANALES OFICIALES</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a class="tech-border p-4 flex items-center justify-between hover:bg-surface-container-high transition-all font-label-technical text-xs text-on-surface" href="#">
                <span>INSTAGRAM</span>
                <span class="material-symbols-outlined text-tertiary text-sm">open_in_new</span>
              </a>
              <a class="tech-border p-4 flex items-center justify-between hover:bg-surface-container-high transition-all font-label-technical text-xs text-on-surface" href="#">
                <span>X / TWITTER</span>
                <span class="material-symbols-outlined text-tertiary text-sm">open_in_new</span>
              </a>
              <a class="tech-border p-4 flex items-center justify-between hover:bg-surface-container-high transition-all font-label-technical text-xs text-on-surface" href="#">
                <span>TIKTOK</span>
                <span class="material-symbols-outlined text-tertiary text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Architectural Image Break -->
        <div class="mt-8 w-full h-[300px] tech-border relative overflow-hidden bg-surface-container">
          <div class="w-full h-full bg-cover bg-center grayscale opacity-60" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrudQmuFjRKjk1t1VVnoEwQ8PvU3LDDKMvwMT84QOd5l4_SqsyKO0hwpwCvL_OE0x4P6BpzFbCqlIvERsBBS06F6z7Y06xGFVKWRvK3I2qGQeCm8v8_GiDBxLqmzbXjUKRUQDCU8gMj89yF0yipOTeNosnRShlIKDA_CBrZ99HhRs_s_Dkfc3HzA3-EKJ_k97WfJUqfGepVJdpzsFkGQoy0xSneAG3SQpOMIf7FpgjJmV-ouJ3CQZ4Wg');"></div>
          <div class="absolute bottom-4 left-4 z-20 bg-background/80 px-3 py-1 tech-border">
            <span class="font-label-technical text-[10px] text-tertiary uppercase">ARCHIVO_REF: BGT-994</span>
          </div>
        </div>
      </section>
    </main>`;
}
