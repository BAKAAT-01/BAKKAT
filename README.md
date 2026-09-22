# BAKAAT — El Dorado Es Ahora

Ancestral Urban Streetwear desde Bogotá, Colombia. **BAKAAT** es una tienda en línea
que fusiona estética ancestral con el ritmo urbano contemporáneo, construida como un
proyecto frontend moderno sin frameworks: HTML, CSS y JavaScript vanilla con módulos ES.

## Vista previa

| Home | Tienda | Producto | Carrito |
|------|--------|----------|---------|
| Catálogo destacado y hero | Filtros y buscador | Detalle con variantes | Drawer lateral persistente |

## Funcionalidades

- Catálogo de productos generado dinámicamente desde JavaScript
- Filtrado por categoría y buscador en tiempo real
- Vista de detalle por producto
- Carrito de compras con drawer lateral (sin salir de la página)
- Aumentar/disminuir cantidades y eliminar productos
- Persistencia del carrito con `localStorage`
- Cálculo de subtotal, envío y total
- Checkout con formulario validado (validación nativa de HTML)
- Diseño responsive con navegación adaptable a móvil
- SEO básico y Open Graph para compartir en redes

## Stack

- **HTML5** — vistas semánticas
- **CSS3** — arquitectura modular por secciones + variables de tema
- **Tailwind CSS (CDN)** — utilidades y layout
- **JavaScript (ES Modules)** — sin dependencias de build
- **Netlify** — despliegue continuo desde la rama `main`

## Estructura del proyecto

```
BAKKAT/
├── index.html            # Home
├── pages/                # Vistas internas (tienda, producto, carrito, checkout, etc.)
├── css/                  # Estilos modulares (base, variables, secciones, responsive)
├── img/                  # Recursos visuales (brand, home, productos)
├── js/
│   ├── main.js           # Punto de entrada
│   ├── data/             # Catálogo de productos
│   ├── components/       # Componentes reutilizables (navbar, footer, cartDrawer, etc.)
│   ├── pages/            # Lógica específica de cada vista
│   ├── services/         # Lógica de negocio (carrito)
│   └── utils/            # Utilidades (formato de moneda, rutas)
├── _headers              # Configuración de cabeceras para Netlify
└── 404.html              # Página de error personalizada
```

## Ejecutar en local

Al usar módulos ES (`type="module"`), es necesario levantar un servidor local
(no funciona abriendo el `index.html` directamente con `file://`).

**Opción 1 — Python:**

```bash
python3 -m http.server 5500
```

y abre <http://localhost:5500>.

**Opción 2 — VS Code:**

1. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
2. Abre `index.html`.
3. Clic derecho → "Open with Live Server".

## Despliegue

El sitio se despliega automáticamente en **Netlify** con cada push a la rama `main`.

## Estado del proyecto

En desarrollo activo. Actualmente el catálogo y el flujo de compra son de demostración
(el carrito persiste en el navegador y el checkout no procesa pagos reales).
