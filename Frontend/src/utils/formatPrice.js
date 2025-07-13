export function formatPrice(price) {
  if (typeof price !== "number") return "";
  return price.toLocaleString("vi-VN") + " đ";
}
