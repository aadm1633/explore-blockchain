import { icon } from "../utils/icons.js";
import { newsItem, emptyState } from "../components/UI.js";
import { getNews, getNewsById, getNewsByCategory } from "../services/newsService.js";
import { escapeHtml } from "../utils/format.js";
import { addHistory } from "../utils/storage.js";

const categories = [
  { key: "", label: "全部" },
  { key: "industry", label: "行业" },
  { key: "market", label: "市场" },
  { key: "tech", label: "技术" },
  { key: "policy", label: "政策" },
  { key: "learn", label: "学习" }
];

// 资讯列表页，支持分类参数。
export async function newsPage(params = []) {
  const category = params[0] || "";
  const list = await getNewsByCategory(category);
  const chips = categories.map(c =>
    `<a class="filter-chip ${c.key === category ? "active" : ""}" href="#/news${c.key ? `/category/${c.key}` : ""}">${c.label}</a>`
  ).join("");
  const rows = list.map(n => newsItem(n)).join("");
  const empty = rows ? rows : emptyState("newspaper", "暂无资讯", "该分类下暂无内容。");

  return `
    <section class="page active" data-page="news">
      <div class="page-head">
        <h2>资讯 <span class="mock-tag">MOCK</span></h2>
        <p>新闻列表、分类、详情和原文来源结构已预留，正式版接真实数据源。</p>
      </div>
      <div class="toolbar">${chips}</div>
      <div class="list">${empty}</div>
    </section>`;
}

// 资讯详情页。
export async function newsDetailPage(params) {
  const n = await getNewsById(params[0]);
  if (!n) return `<section class="page active" data-page="news-detail">${emptyState("newspaper", "未找到该资讯", "返回资讯列表查看。")}</section>`;
  addHistory({ type: "news", id: n.id, title: n.title, subtitle: n.source, href: `#/news/${n.id}` });

  return `
    <section class="page active" data-page="news-detail">
      <div class="page-head">
        <h2 style="font-size:20px;line-height:1.5">${escapeHtml(n.title)}</h2>
        <div class="news-meta" style="margin-top:10px">
          <span class="badge">${escapeHtml(n.categoryLabel || n.category)}</span>
          <span>${escapeHtml(n.source)}</span><span>·</span><span>${escapeHtml(n.time)}</span>
          <span class="mock-tag">MOCK</span>
        </div>
      </div>
      <div class="list">
        <div class="panel prose">
          <p class="first">${escapeHtml(n.summary)}</p>
          <p>本文为第一阶段 Mock 内容，用于展示资讯详情页结构与样式。正式版本接入合法、稳定的数据源后，这里将展示真实新闻正文、来源链接与发布时间。</p>
          <p>请仅将本文视为界面示意，不构成任何投资建议。</p>
        </div>
      </div>
    </section>`;
}
