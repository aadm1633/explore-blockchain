// Hash Router：将 hash 解析为路由对象，并支持动态参数。
// 页面模块注册在 app.js 中，此处只负责路径匹配。

export function parseHash() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const clean = hash.split("?")[0];
  return clean.endsWith("/") && clean.length > 1 ? clean.slice(0, -1) : clean;
}

// 路由规则：按声明顺序匹配，":param" 表示动态段。
const rules = [
  { pattern: /^\/$/, name: "home" },
  { pattern: /^\/exchanges$/, name: "exchanges" },
  { pattern: /^\/exchanges\/compare$/, name: "exchange-compare" },
  { pattern: /^\/exchanges\/([^/]+)$/, name: "exchange-detail" },
  { pattern: /^\/markets$/, name: "markets" },
  { pattern: /^\/markets\/rankings$/, name: "market-rankings" },
  { pattern: /^\/markets\/gainers$/, name: "market-gainers" },
  { pattern: /^\/markets\/losers$/, name: "market-losers" },
  { pattern: /^\/markets\/([^/]+)$/, name: "market-detail" },
  { pattern: /^\/news$/, name: "news" },
  { pattern: /^\/news\/category\/([^/]+)$/, name: "news" },
  { pattern: /^\/news\/([^/]+)$/, name: "news-detail" },
  { pattern: /^\/learn$/, name: "learn" },
  { pattern: /^\/learn\/([^/]+)$/, name: "learn-detail" },
  { pattern: /^\/search$/, name: "search" },
  { pattern: /^\/profile$/, name: "profile" },
  { pattern: /^\/profile\/favorites$/, name: "favorites" },
  { pattern: /^\/profile\/history$/, name: "history" },
  { pattern: /^\/profile\/settings$/, name: "settings" },
  { pattern: /^\/profile\/about$/, name: "about" }
];

export function matchRoute(path) {
  for (const rule of rules) {
    const m = path.match(rule.pattern);
    if (m) {
      return { name: rule.name, params: m.slice(1) };
    }
  }
  return { name: "not-found", params: [] };
}
