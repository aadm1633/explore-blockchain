import { icon } from "../utils/icons.js";
import { exchangeCard, exchangeRow, emptyState } from "../components/UI.js";
import { getExchanges, getExchangeById } from "../services/exchangeService.js";
import { escapeHtml } from "../utils/format.js";

// 交易所列表页。
export async function exchangesPage() {
  const list = await getExchanges();
  const rows = list.map(exchangeRow).join("");
  return `
    <section class="page active" data-page="exchanges">
      <div class="page-head">
        <h2>交易所</h2>
        <p>统一管理交易所信息、官网入口和详情页。所有外链均为官方入口。</p>
      </div>
      <div class="list">${rows}</div>
      <div style="padding:16px 18px"><a class="link-btn secondary" href="#/exchanges/compare">${icon("grid", 16)} 对比交易所</a></div>
    </section>`;
}

// 交易所详情页。
export async function exchangeDetailPage(params) {
  const x = getExchangeById(params[0]);
  if (!x) return notFound("未找到该交易所");
  const logo = x.logo ? `<img src="${x.logo}" alt="${escapeHtml(x.name)}">` : escapeHtml(x.name.slice(0, 2));
  const features = (x.features || []).map(f => `<span class="chip">${escapeHtml(f)}</span>`).join("");
  const tags = (x.tags || []).map(f => `<span class="chip">${escapeHtml(f)}</span>`).join("");

  return `
    <section class="page active" data-page="exchange-detail">
      <div class="page-head">
        <div class="exchange-hero">
          <span class="ex-logo" style="background:${x.brand || "#111"}">${logo}</span>
          <div>
            <h2>${escapeHtml(x.name)} · ${escapeHtml(x.localName)}</h2>
            <p style="margin-top:2px">${escapeHtml(x.tag)}</p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="panel">
          <div class="detail-grid">
            <div class="detail-cell"><div class="k">成立时间</div><div class="v">${escapeHtml(x.founded || "--")}</div></div>
            <div class="detail-cell"><div class="k">状态</div><div class="v">${x.status === "active" ? "运营中" : "待接入"}</div></div>
          </div>
        </div>
        <div class="panel">
          <h3 style="font-size:14px;font-weight:700;margin-bottom:8px">平台简介</h3>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.8">${escapeHtml(x.description)}</p>
        </div>
        <div class="panel">
          <h3 style="font-size:14px;font-weight:700;margin-bottom:10px">特色功能</h3>
          <div class="chips" style="margin:0">${features}</div>
        </div>
        <div class="panel">
          <h3 style="font-size:14px;font-weight:700;margin-bottom:10px">标签</h3>
          <div class="chips" style="margin:0">${tags}</div>
        </div>
        <div class="panel">
          ${x.website
            ? `<a class="link-btn" href="${x.website}" target="_blank" rel="noopener noreferrer">${icon("external", 16)} 打开官网</a>`
            : `<span class="link-btn secondary">入口待配置</span>`}
        </div>
      </div>
    </section>`;
}

// 交易所对比页。
export async function exchangeComparePage() {
  const list = await getExchanges();
  const headers = list.map(x => `<th>${escapeHtml(x.name)}</th>`).join("");
  const rows = [
    { label: "中文名", get: x => x.localName },
    { label: "标签", get: x => x.tag },
    { label: "成立", get: x => x.founded },
    { label: "状态", get: x => x.status === "active" ? "运营中" : "待接入" },
    { label: "官网", get: x => x.website ? "已配置" : "待配置" }
  ];
  const body = rows.map(r =>
    `<tr><td>${r.label}</td>${list.map(x => `<td>${escapeHtml(r.get(x))}</td>`).join("")}</tr>`
  ).join("");

  return `
    <section class="page active" data-page="exchange-compare">
      <div class="page-head"><h2>交易所对比</h2><p>快速比较主流交易所的基本信息。</p></div>
      <div class="panel" style="overflow-x:auto">
        <table class="compare-table">
          <thead><tr><th>项目</th>${headers}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>`;
}

function notFound(msg) {
  return `<section class="page active" data-page="exchange-detail">${emptyState("info", msg, "返回交易所列表查看更多内容。")}</section>`;
}
