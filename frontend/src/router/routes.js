// Hash 路由登记表：path -> 页面名称。
// 实际页面模块映射见 router/router.js。
export const routes = [
  { path: "/", name: "home" },
  { path: "/exchanges", name: "exchanges" },
  { path: "/exchanges/compare", name: "exchange-compare" },
  { path: "/exchanges/:id", name: "exchange-detail" },
  { path: "/markets", name: "markets" },
  { path: "/markets/rankings", name: "market-rankings" },
  { path: "/markets/gainers", name: "market-gainers" },
  { path: "/markets/losers", name: "market-losers" },
  { path: "/markets/:symbol", name: "market-detail" },
  { path: "/news", name: "news" },
  { path: "/news/:id", name: "news-detail" },
  { path: "/learn", name: "learn" },
  { path: "/learn/:slug", name: "learn-detail" },
  { path: "/search", name: "search" },
  { path: "/profile", name: "profile" },
  { path: "/profile/favorites", name: "favorites" },
  { path: "/profile/history", name: "history" },
  { path: "/profile/settings", name: "settings" },
  { path: "/profile/about", name: "about" }
];
