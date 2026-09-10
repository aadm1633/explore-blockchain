import { icon } from "../utils/icons.js";
import { learnRow, emptyState } from "../components/UI.js";
import { getKnowledge, getKnowledgeBySlug } from "../services/learnService.js";
import { escapeHtml } from "../utils/format.js";
import { addHistory } from "../utils/storage.js";

// 学习中心列表页。
export async function learnPage() {
  const list = await getKnowledge();
  const rows = list.map(learnRow).join("");
  return `
    <section class="page active" data-page="learn">
      <div class="page-head">
        <h2>学习中心</h2>
        <p>从区块链基础开始，逐步了解 Bitcoin、Ethereum、钱包、DeFi 与 NFT。</p>
      </div>
      <div class="list">${rows}</div>
    </section>`;
}

// 学习详情页。
export async function learnDetailPage(params) {
  const k = await getKnowledgeBySlug(params[0]);
  if (!k) return `<section class="page active" data-page="learn-detail">${emptyState("book", "未找到该文章", "返回学习中心查看。")}</section>`;
  addHistory({ type: "learn", id: k.slug, title: k.title, subtitle: "学习", href: `#/learn/${k.slug}` });

  const sections = (k.content || []).map(sec => `
    <h3>${escapeHtml(sec.heading)}</h3>
    ${sec.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
  `).join("");

  return `
    <section class="page active" data-page="learn-detail">
      <div class="page-head">
        <h2 style="font-size:22px;line-height:1.4">${escapeHtml(k.title)}</h2>
        <p style="margin-top:8px">${escapeHtml(k.summary)}</p>
        <div class="news-meta" style="margin-top:10px">
          <span class="badge">${escapeHtml(k.category || "基础")}</span>
          <span>${icon("clock", 12)} 约 ${k.readMinutes} 分钟</span>
        </div>
      </div>
      <div class="list">
        <div class="panel prose">${sections}</div>
        <div class="panel"><a class="link-btn secondary" href="#/learn">${icon("arrowRight", 15)} 返回学习中心</a></div>
      </div>
    </section>`;
}
