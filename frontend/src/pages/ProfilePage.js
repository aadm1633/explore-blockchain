import { icon } from "../utils/icons.js";
import { emptyState } from "../components/UI.js";
import { appConfig } from "../config/app.js";
import { getFavorites, getHistory, clearHistory } from "../utils/storage.js";
import { escapeHtml } from "../utils/format.js";

// 我的页。
export async function profilePage() {
  return `
    <section class="page active" data-page="profile">
      <div class="page-head"><h2>我的</h2><p>登录、收藏、历史记录和个性化功能将在后续后端阶段接入。</p></div>
      <div class="list">
        <a class="row" href="#/profile/favorites"><span class="qicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon("bookmark", 18)}</span><div class="grow"><div class="coin-name">我的收藏</div></div>${icon("chevronRight", 16)}</a>
        <a class="row" href="#/profile/history"><span class="qicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon("clock", 18)}</span><div class="grow"><div class="coin-name">浏览历史</div></div>${icon("chevronRight", 16)}</a>
        <a class="row" href="#/profile/about"><span class="qicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon("info", 18)}</span><div class="grow"><div class="coin-name">关于</div></div>${icon("chevronRight", 16)}</a>
      </div>
    </section>`;
}

// 收藏页。
export async function favoritesPage() {
  const list = getFavorites();
  const rows = list.map(item => {
    const iconName = item.type === "market" ? "chart" : item.type === "news" ? "newspaper" : item.type === "learn" ? "book" : "grid";
    return `
      <a class="row" href="${item.href}">
        <span class="qicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon(iconName, 18)}</span>
        <div class="grow">
          <div class="coin-name">${escapeHtml(item.title)}</div>
          <div class="coin-sym">${escapeHtml(item.subtitle || "")}</div>
        </div>
        ${icon("chevronRight", 16)}
      </a>`;
  }).join("");
  return `
    <section class="page active" data-page="favorites">
      <div class="page-head"><h2>我的收藏</h2><p>收藏的币种、资讯与学习内容。</p></div>
      <div class="list">${rows || emptyState("bookmark", "还没有收藏", "在详情页点击收藏按钮即可保存。")}</div>
    </section>`;
}

// 浏览历史页。
export async function historyPage() {
  const list = getHistory();
  const rows = list.map(item => {
    const iconName = item.type === "market" ? "chart" : item.type === "news" ? "newspaper" : item.type === "learn" ? "book" : "grid";
    return `
      <a class="row" href="${item.href}">
        <span class="qicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon(iconName, 18)}</span>
        <div class="grow">
          <div class="coin-name">${escapeHtml(item.title)}</div>
          <div class="coin-sym">${escapeHtml(item.subtitle || "")}</div>
        </div>
        ${icon("chevronRight", 16)}
      </a>`;
  }).join("");
  return `
    <section class="page active" data-page="history">
      <div class="page-head">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h2>浏览历史</h2>
          ${list.length ? `<button class="action-btn" id="clear-history">${icon("trash", 14)} 清空</button>` : ""}
        </div>
        <p>最近浏览过的内容。</p>
      </div>
      <div class="list">${rows || emptyState("clock", "暂无浏览记录", "浏览过的内容会显示在这里。")}</div>
    </section>`;
}

// 设置页。
export async function settingsPage() {
  return `
    <section class="page active" data-page="settings">
      <div class="page-head"><h2>设置</h2><p>个性化设置将在后端阶段逐步开放。</p></div>
      <div class="list">
        <div class="panel">
          <h3 style="font-size:14px;font-weight:700;margin-bottom:10px">数据模式</h3>
          <p style="font-size:12px;color:var(--text-secondary);line-height:1.7">当前为 <b>Mock 数据</b> 模式，行情、资讯与学习内容均为演示数据。正式版将切换至统一后端 API。</p>
        </div>
      </div>
    </section>`;
}

// 关于页。
export async function aboutPage() {
  return `
    <section class="page active" data-page="about">
      <div class="page-head"><h2>关于</h2><p>${escapeHtml(appConfig.slogan)}</p></div>
      <div class="list">
        <div class="panel">
          <h3 style="font-size:14px;font-weight:700;margin-bottom:8px">${escapeHtml(appConfig.name)}</h3>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.8">一个移动端优先的 Web3 信息平台，覆盖交易所导航、加密货币行情、行业资讯与区块链学习中心。让完全不了解 Web3 的普通用户，也能看懂并愿意继续探索。</p>
        </div>
        <div class="panel">
          <h3 style="font-size:14px;font-weight:700;margin-bottom:10px">版本信息</h3>
          <div class="detail-grid">
            <div class="detail-cell"><div class="k">版本</div><div class="v">v${appConfig.version}</div></div>
            <div class="detail-cell"><div class="k">数据模式</div><div class="v">Mock</div></div>
          </div>
        </div>
      </div>
    </section>`;
}
