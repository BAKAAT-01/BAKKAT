# UrbanWear — Ecommerce de ropa

Proyecto frontend construido con HTML, CSS y JavaScript vanilla.

## Vistas
- Home
- Tienda
- Quiénes somos
- Carrito
- Checkout

## Funcionalidades
- Catálogo generado desde JavaScript
- Filtro por categoría
- Buscador
- Agregar productos al carrito
- Aumentar/disminuir cantidades
- Eliminar productos
- Carrito persistente con localStorage
- Cálculo de subtotal, envío y total
- Formulario de checkout con validación HTML
- Diseño responsive
- Navegación adaptable a móvil

## Ejecutar

Por usar módulos ES (`type="module"`), es recomendable levantar un servidor local.

Con VS Code:
1. Instala la extensión Live Server.
2. Abre `index.html`.
3. Selecciona "Open with Live Server".

O con Python:
```bash
python3 -m http.server 5500
```
y abre `http://localhost:5500`.

## Estructura

- `pages/`: vistas internas
- `css/`: estilos
- `js/data/`: datos
- `js/components/`: componentes reutilizables
- `js/pages/`: lógica de cada vista
- `js/services/`: servicios como el carrito
