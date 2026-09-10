import { markets } from "../data/markets.js";

export async function getMarkets() {
  // TODO: 后续替换为 backend API，不改变页面调用方式。
  return markets;
}

export async function getMarketBySymbol(symbol) {
  const list = await getMarkets();
  return list.find(item => item.symbol.toLowerCase() === String(symbol).toLowerCase()) || null;
}

export async function getGainers() {
  const list = await getMarkets();
  return [...list].sort((a, b) => b.change24h - a.change24h);
}

export async function getLosers() {
  const list = await getMarkets();
  return [...list].sort((a, b) => a.change24h - b.change24h);
}
