import { basePath, homePath, assetsPath } from "../utils/path.js";

export function renderFooter() {
  return `
    <footer class="bg-surface-container-lowest border-t border-outline-variant py-12 px-margin-mobile md:px-margin-desktop text-on-surface-variant font-label-technical text-xs">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <a href="${homePath}" class="logo">
            <img src="${assetsPath}img/brand/BAKAAT-LOGO.png" alt="BAKAAT" class="logo h-8 md:h-10">
          </a>
          <span class="text-outline hidden md:inline">|</span>
          <span class="text-outline uppercase">Ancestral Urban Streetwear · Bogotá D.C.</span>
        </div>
        <div class="flex flex-wrap justify-center gap-6 uppercase">
          <a class="hover:text-tertiary transition-colors" href="${basePath}contacto.html">Contacto</a>
        </div>
        <div class="text-outline uppercase text-[11px]">
          © ${new Date().getFullYear()} BAKAAT STUDIOS - BOGOTÁ D.C.
        </div>
      </div>
    </footer>`;
}
