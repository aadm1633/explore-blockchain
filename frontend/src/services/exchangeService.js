import { exchanges } from "../data/exchanges.js";

// 后续可替换为 backend API 调用，页面无需改动。
export function getExchanges() {
  return exchanges;
}

export function getExchangeById(id) {
  return exchanges.find(item => item.id === id || item.slug === id) || null;
}

export function getActiveExchanges() {
  return exchanges.filter(item => item.status === "active");
}
