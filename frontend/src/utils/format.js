// 通用格式化工具。

export function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "--";
  if (n >= 1000) {
    return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (n >= 1) return "$" + n.toFixed(2);
  return "$" + n.toPrecision(3);
}

export function formatChange(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "--";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export function isUp(value) {
  return Number(value) >= 0;
}

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function initials(name = "", n = 2) {
  return String(name).slice(0, n).toUpperCase();
}
