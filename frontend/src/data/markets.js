// 第一阶段 Mock 数据；后续由 marketService 切换到 API。
function sparkline(seed, trend, n = 26) {
  const pts = [];
  let v = 42 + (seed % 18);
  for (let i = 0; i < n; i++) {
    const noise = Math.sin(seed * 3.7 + i * 0.9) * 4.5 + Math.cos(seed * 1.3 + i * 0.45) * 2.8;
    v += trend * 0.18 + noise * 0.22;
    v = Math.max(10, Math.min(92, v));
    pts.push(Math.round(v * 10) / 10);
  }
  return pts;
}

export const markets = [
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A", price: 110420.2, change24h: 2.31, volume24h: "38.2B", high24h: 112800.5, low24h: 107540.1, sparkline: sparkline(7, 1.1) },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA", price: 4365.18, change24h: 1.74, volume24h: "21.6B", high24h: 4412.3, low24h: 4265.7, sparkline: sparkline(19, 0.8) },
  { symbol: "SOL", name: "Solana", color: "#0EB37F", price: 214.63, change24h: -0.82, volume24h: "5.4B", high24h: 221.9, low24h: 209.4, sparkline: sparkline(31, -0.4) },
  { symbol: "BNB", name: "BNB", color: "#F0B90B", price: 1020.4, change24h: 0.56, volume24h: "3.1B", high24h: 1035.2, low24h: 1002.8, sparkline: sparkline(43, 0.3) },
  { symbol: "XRP", name: "XRP", color: "#23292F", price: 2.41, change24h: 3.12, volume24h: "6.8B", high24h: 2.48, low24h: 2.31, sparkline: sparkline(55, 1.4) },
  { symbol: "ADA", name: "Cardano", color: "#0033AD", price: 0.94, change24h: -1.25, volume24h: "1.2B", high24h: 0.97, low24h: 0.91, sparkline: sparkline(67, -0.6) },
  { symbol: "DOGE", name: "Dogecoin", color: "#C2A633", price: 0.31, change24h: 4.75, volume24h: "2.9B", high24h: 0.32, low24h: 0.29, sparkline: sparkline(79, 2.0) },
  { symbol: "DOT", name: "Polkadot", color: "#E6007A", price: 8.42, change24h: -0.34, volume24h: "0.7B", high24h: 8.66, low24h: 8.28, sparkline: sparkline(91, -0.2) },
  { symbol: "AVAX", name: "Avalanche", color: "#E84142", price: 42.18, change24h: 1.92, volume24h: "0.9B", high24h: 43.05, low24h: 40.88, sparkline: sparkline(103, 0.9) },
  { symbol: "LINK", name: "Chainlink", color: "#2A5ADA", price: 21.74, change24h: -2.08, volume24h: "1.1B", high24h: 22.4, low24h: 21.2, sparkline: sparkline(115, -1.0) },
  { symbol: "POL", name: "Polygon", color: "#8247E5", price: 0.61, change24h: 0.88, volume24h: "0.5B", high24h: 0.63, low24h: 0.59, sparkline: sparkline(127, 0.4) },
  { symbol: "TON", name: "Toncoin", color: "#0098EA", price: 5.82, change24h: -0.65, volume24h: "0.6B", high24h: 5.96, low24h: 5.71, sparkline: sparkline(139, -0.3) }
];
