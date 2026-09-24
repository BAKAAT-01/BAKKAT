export const productos = [
  {
    id: 1,
    nombre: 'HOODIE "TUNJUELO"',
    precio: 320000,
    categoria: "Heritage",
    ref: "BK-HOD-001",
    tallas: ["S", "M", "L", "XL"],
    imagen: "/img/productos/hoodie tunjuelo.png",
    colores: [
      { nombre: "Negro Carbón", hex: "#1f2020" },
      { nombre: "Verde Oliva", hex: "#494a38" },
      { nombre: "Beige Tierra", hex: "#474836" }
    ],
    materiales: [
      "Algodón francés pesado 450 g/m²",
      "Bordado dorado en técnica orfebrería Muisca",
      "Corte sobredimensionado estructural"
    ],
    descripcion:
      "Hoodie técnico de corte sobredimensionado en algodón francés de alto gramaje con bordados inspirados en la geometría sagrada Muisca.",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    nombre: 'CARGO "ZIPA"',
    precio: 280000,
    categoria: "Tech",
    ref: "BK-CRG-002",
    tallas: ["28", "30", "32", "34"],
    imagen: "/img/productos/cargo_zipa.png",
    colores: [
      { nombre: "Verde Táctico", hex: "#494a38" },
      { nombre: "Negro Carbón", hex: "#1f2020" }
    ],
    materiales: [
      "Nylon Ripstop de alta resistencia",
      "Hardware dorado industrial",
      "Bolsillos utilitarios sobredimensionados"
    ],
    descripcion:
      "Pantalón cargo relajado de corte amplio construido en Nylon Ripstop táctico con remaches industriales y bolsillos expansivos.",
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 3,
    nombre: "BAKAAT TECHNICAL SET",
    precio: 450000,
    categoria: "Tech",
    ref: "BK-TS-001",
    tallas: ["S", "M", "L", "XL"],
    imagen: "/img/productos/technical_set.png",
    colores: [
      { nombre: "Negro Carbón", hex: "#1f2020" },
      { nombre: "Verde Teal", hex: "#494a38" }
    ],
    materiales: [
      "Tejido técnico de alto rendimiento",
      "Costuras ergonómicas reforzadas",
      "Detalles en verde teal"
    ],
    descripcion:
      "Conjunto técnico de alto rendimiento con corte versátil, costuras ergonómicas y detalles en verde teal. Diseñado para moverse contigo.",
    rating: 4.8,
    reviews: 128,
  },
  {
    id: 4,
    nombre: "BOGOTÁ RELAXED DENIM",
    precio: 179000,
    categoria: "Urban",
    ref: "BK-DNM-042",
    tallas: ["28", "30", "32", "34"],
    imagen: "/img/productos/bogota_relaxed_denim.png",
    colores: [
      { nombre: "Denim Oscuro", hex: "#2a2a2a" },
      { nombre: "Gris Grafito", hex: "#353535" }
    ],
    materiales: [
      "Denim 14oz pesado lavado eco",
      "Remaches en Industrial Gold",
      "Corte holgado de inspiración brutalista"
    ],
    descripcion:
      "Jean rígido de 14oz con corte holgado y detalles de orfebrería en remaches dorados.",
    rating: 4.7,
    reviews: 82,
  },
  {
    id: 5,
    nombre: "HOODIE MINIMAL ORO",
    precio: 320000,
    categoria: "Heritage",
    ref: "BK-HOD-005",
    tallas: ["S", "M", "L", "XL"],
    imagen: "/img/productos/hoodie_minimal_oro.png",
    colores: [
      { nombre: "Negro Carbón", hex: "#1f2020" }
    ],
    materiales: [
      "Algodón francés 80% / Poliéster 20%",
      "Bordado minimalista en hilo dorado",
      "Interior afelpado de alto aislamiento"
    ],
    descripcion:
      "Hoodie negro mate con sutil aplicación de filigrana dorada en manga y capucha de doble panel.",
    rating: 5.0,
    reviews: 210,
  },
  {
    id: 6,
    nombre: "CARGO TÁCTICO BOGOTÁ",
    precio: 280000,
    categoria: "Tech",
    ref: "BK-CRG-006",
    tallas: ["28", "30", "32", "34"],
    imagen: "/img/productos/cargo_tactico_bogota.png",
    colores: [
      { nombre: "Negro Carbón", hex: "#1f2020" },
      { nombre: "Oliva Industrial", hex: "#494a38" }
    ],
    materiales: [
      "Tejido técnico hidrorepelente",
      "Cintas ajustables de alta densidad",
      "Bolsillos de fuelle geométrico"
    ],
    descripcion:
      "Cargo técnico de silueta expansiva preparado para intemperie con hebillas de liberación rápida.",
    rating: 4.8,
    reviews: 67,
  },
  {
    id: 7,
    nombre: "CAMISETA TUNJO OVERSIZED",
    precio: 150000,
    categoria: "Heritage",
    ref: "BK-TEE-007",
    tallas: ["S", "M", "L", "XL"],
    imagen: "/img/productos/camiseta_tunjo_oversized.png",
    colores: [
      { nombre: "Grafito", hex: "#353535" },
      { nombre: "Beige Tierra", hex: "#474836" }
    ],
    materiales: [
      "Algodón peinado 260 g/m²",
      "Impresión serigráfica de alta densidad",
      "Cuello acanalado de 3cm"
    ],
    descripcion:
      "Camiseta de caída pesada con gráfica Muisca de gran formato en la parte posterior.",
    rating: 4.9,
    reviews: 140,
  },
  {
    id: 8,
    nombre: "CHAQUETA BRUTALISTA NEGRA",
    precio: 450000,
    categoria: "Urban",
    ref: "BK-JKT-008",
    tallas: ["S", "M", "L", "XL"],
    imagen: "/img/productos/chaqueta_brutalista_negra.png",
    colores: [
      { nombre: "Negro Carbón", hex: "#1f2020" }
    ],
    materiales: [
      "Canvas de algodón de grado militar",
      "Forro acolchado térmico",
      "Cierres y botones industriales reforzados"
    ],
    descripcion:
      "Chaqueta rígida de corte arquitectónico construida para resistir el clima capitalino.",
    rating: 5.0,
    reviews: 95,
  }
];

export function getProducto(id) {
  return productos.find((p) => p.id === Number(id));
}

export function relacionados(producto, cantidad = 4) {
  return productos
    .filter((p) => p.id !== producto.id && p.categoria === producto.categoria)
    .concat(
      productos.filter(
        (p) => p.id !== producto.id && p.categoria !== producto.categoria,
      ),
    )
    .slice(0, cantidad);
}
