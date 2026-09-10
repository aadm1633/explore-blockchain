import { exchanges } from "../data/exchanges.js";
import { markets } from "../data/markets.js";
import { news } from "../data/news.js";
import { knowledge } from "../data/knowledge.js";

// 统一搜索结果结构，便于页面渲染与收藏/历史复用。
export function searchAll(keyword = "") {
  const q = keyword.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  exchanges.forEach(x => {
    if (`${x.name} ${x.localName} ${x.tag}`.toLowerCase().includes(q)) {
      results.push({ type: "exchange", id: x.id, title: `${x.name} · ${x.localName}`, subtitle: x.tag, href: `#/exchanges/${x.id}` });
    }
  });
  markets.forEach(x => {
    if (`${x.symbol} ${x.name}`.toLowerCase().includes(q)) {
      results.push({ type: "market", id: x.symbol, title: `${x.symbol} · ${x.name}`, subtitle: x.name, href: `#/markets/${x.symbol.toLowerCase()}` });
    }
  });
  news.forEach(x => {
    if (`${x.title} ${x.source}`.toLowerCase().includes(q)) {
      results.push({ type: "news", id: x.id, title: x.title, subtitle: x.source, href: `#/news/${x.id}` });
    }
  });
  knowledge.forEach(x => {
    if (`${x.title} ${x.summary}`.toLowerCase().includes(q)) {
      results.push({ type: "learn", id: x.slug, title: x.title, subtitle: x.summary, href: `#/learn/${x.slug}` });
    }
  });
  return results;
}
