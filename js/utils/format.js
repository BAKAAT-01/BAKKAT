export const FREE_SHIPPING_THRESHOLD = 250000;
export const SHIPPING_COST = 15000;

export const money = n => `$${n.toLocaleString("es-CO")}`;

export function calcShipping(subtotal) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
