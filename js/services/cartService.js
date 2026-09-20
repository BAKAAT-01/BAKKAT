import { productos } from "../data/productos.js";

const KEY = "urbanwear_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function getCartWithProducts() {
  return getCart()
    .map(item => {
      const p = productos.find(x => x.id === item.id);
      if (!p) return null;
      return { ...p, ...item, total: p.precio * item.quantity };
    })
    .filter(Boolean);
}

function lineKey(id, talla, color) {
  return `${id}|${talla || "-"}|${color || "-"}`;
}

function save(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(id, variant = {}) {
  const talla = variant.talla || null;
  const color = variant.color || null;
  const colorHex = variant.colorHex || null;
  const key = lineKey(id, talla, color);
  const cart = getCart();
  const item = cart.find(p => p.key === key);
  if (item) item.quantity += 1;
  else cart.push({ key, id, talla, color, colorHex, quantity: 1 });
  save(cart);
}

export function updateQuantity(key, quantity) {
  const cart = getCart();
  const item = cart.find(p => p.key === key);
  if (!item) return;
  item.quantity = Math.max(1, quantity);
  save(cart);
}

export function removeFromCart(key) {
  save(getCart().filter(p => p.key !== key));
}

export function clearCart() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}

export function cartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
