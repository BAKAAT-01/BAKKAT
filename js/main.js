import { renderNavbar, initNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";
import { renderCartDrawer, initCartDrawer } from "./components/cartDrawer.js";
import { page } from "./utils/path.js";

const routes = {
  "index.html": { src: "./pages/home.js", render: "renderHome", init: "initHome" },
  "tienda.html": { src: "./pages/tienda.js", render: "renderTienda", init: "initTienda" },
  "carrito.html": { src: "./pages/carrito.js", render: "renderCarrito", init: "initCarrito" },
  "checkout.html": { src: "./pages/checkout.js", render: "renderCheckout", init: "initCheckout" },
  "producto.html": { src: "./pages/producto.js", render: "renderProducto", init: "initProducto" },
  "nosotros.html": { src: "./pages/nosotros.js", render: "renderNosotros", init: "initNosotros" },
  "contacto.html": { src: "./pages/contacto.js", render: "renderContacto" },
};

const app = document.querySelector("#app");
const route = routes[page];

if (!route) {
  app.innerHTML = renderNavbar() + `
    <main class="container">
      <div class="empty empty-full">
        <h1>404</h1>
        <p class="muted empty-spacing">La página que buscas no existe.</p>
        <a class="btn" href="index.html">Volver al inicio</a>
      </div>
    </main>` + renderFooter() + renderCartDrawer();
  initNavbar();
  initCartDrawer();
} else {
  const module = await import(route.src);
  app.innerHTML = renderNavbar() + module[route.render]() + renderFooter() + renderCartDrawer();
  initNavbar();
  initCartDrawer();
  if (route.init) module[route.init]();
}
