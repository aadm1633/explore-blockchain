import { icon } from "../utils/icons.js";
import { emptyState } from "../components/UI.js";
import { searchAll } from "../services/searchService.js";
import { escapeHtml } from "../utils/format.js";

const typeMeta = {
  exchange: { label: "交易所", icon: "grid" },
  market: { label: "行情", icon: "chart" },
  news: { label: "资讯", icon: "newspaper" },
  learn: { label: "学习", icon: "book" }
};

// 搜索页：实时过滤并展示结果。
export async function searchPage() {
  return `
    <section class="page active" data-page="search">
      <div class="page-head"><h2>搜索</h2><p>搜索交易所、币种、资讯与学习内容。</p></div>
      <div class="panel">
        <div class="search-box">
          ${icon("search", 16)}
          <input id="search-input" placeholder="输入关键词，如 BTC、DeFi、OKX…" autocomplete="off">
        </div>
      </div>
      <div id="search-results" class="list" style="margin-top:14px"></div>
    </section>`;
}

// 由 app.js 在渲染完成后绑定输入事件。
export function bindSearch() {
  const input = document.getElementById("search-input");
  const box = document.getElementById("search-results");
  if (!input || !box) return;
  const render = (q) => {
    const results = searchAll(q);
    if (!q.trim()) {
      box.innerHTML = `<div class="empty"><div class="eicon">${icon("search", 26)}</div><h3>输入关键词开始搜索</h3><p>支持搜索交易所、币种、资讯与学习内容。</p></div>`;
      return;
    }
    if (!results.length) {
      box.innerHTML = emptyState("search", "未找到相关内容", "换个关键词试试。");
      return;
    }
    box.innerHTML = results.map(r => {
      const meta = typeMeta[r.type] || typeMeta.learn;
      return `
        <a class="row" href="${r.href}">
          <span class="kicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon(meta.icon, 18)}</span>
          <div class="grow">
            <div class="coin-name">${escapeHtml(r.title)}</div>
            <div class="coin-sym">${escapeHtml(meta.label)} · ${escapeHtml(r.subtitle || "")}</div>
          </div>
          ${icon("chevronRight", 16)}
        </a>`;
    }).join("");
  };
  input.addEventListener("input", e => render(e.target.value));
  render("");
}
