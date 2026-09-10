import { icon } from "../utils/icons.js";
import { marketRow, sparklineSVG, emptyState } from "../components/UI.js";
import { getMarkets, getMarketBySymbol, getGainers, getLosers } from "../services/marketService.js";
import { formatPrice, formatChange, isUp, escapeHtml } from "../utils/format.js";
import { addHistory, toggleFavorite, isFavorite } from "../utils/storage.js";

// 行情列表页（含排行榜/涨幅/跌幅标签）。
export async function marketsPage() {
  const list = await getMarkets();
  const rows = list.map(marketRow).join("");
  return `
    <section class="page active" data-page="markets">
      <div class="page-head">
        <h2>行情</h2>
        <p>第一阶段使用 Mock Data；后续接入统一行情服务与 WebSocket。</p>
      </div>
      <div class="toolbar">
        <a class="filter-chip active" href="#/markets/rankings">综合排名</a>
        <a class="filter-chip" href="#/markets/gainers">涨幅榜</a>
        <a class="filter-chip" href="#/markets/losers">跌幅榜</a>
      </div>
      <div class="list">${rows}</div>
    </section>`;
}

// 排名页。
export async function marketRankingsPage() {
  const list = await getMarkets();
  return listView("综合排名", list.map(marketRow).join(""), "/markets/rankings", "rankings");
}

// 涨幅榜。
export async function marketGainersPage() {
  const list = await getGainers();
  return listView("涨幅榜", list.map(marketRow).join(""), "/markets/gainers", "gainers");
}

// 跌幅榜。
export async function marketLosersPage() {
  const list = await getLosers();
  return listView("跌幅榜", list.map(marketRow).join(""), "/markets/losers", "losers");
}

function listView(title, rows, activePath, kind) {
  const active = (p) => activePath === p ? "active" : "";
  return `
    <section class="page active" data-page="market-${kind}">
      <div class="page-head"><h2>${title}</h2><p>Mock Data · 后续接入实时行情。</p></div>
      <div class="toolbar">
        <a class="filter-chip ${active("/markets/rankings")}" href="#/markets/rankings">综合排名</a>
        <a class="filter-chip ${active("/markets/gainers")}" href="#/markets/gainers">涨幅榜</a>
        <a class="filter-chip ${active("/markets/losers")}" href="#/markets/losers">跌幅榜</a>
      </div>
      <div class="list">${rows}</div>
    </section>`;
}

// 币种详情页。
export async function marketDetailPage(params) {
  const m = await getMarketBySymbol(params[0]);
  if (!m) return `<section class="page active" data-page="market-detail">${emptyState("chart", "未找到该币种", "返回行情列表查看。")}</section>`;
  const up = isUp(m.change24h);
  addHistory({ type: "market", id: m.symbol, title: `${m.symbol} · ${m.name}`, subtitle: "行情", href: `#/markets/${m.symbol.toLowerCase()}` });
  const fav = isFavorite(m.symbol);

  return `
    <section class="page active" data-page="market-detail">
      <div class="page-head">
        <div class="exchange-hero">
          <span class="coin-logo" style="background:${m.color || "#1677FF"}">${escapeHtml(m.symbol.slice(0, 2))}</span>
          <div>
            <h2>${escapeHtml(m.symbol)} · ${escapeHtml(m.name)}</h2>
            <p style="margin-top:2px;font-size:13px;color:var(--text-secondary)">实时价格（Mock）</p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="panel">
          <div style="display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap">
            <span style="font-size:30px;font-weight:800;letter-spacing:-1px">${formatPrice(m.price)}</span>
            <span class="change ${up ? "up" : "down"}" style="font-size:14px">${formatChange(m.change24h)}</span>
          </div>
          ${sparklineSVG(m.sparkline, m.color || (up ? "#16A34A" : "#EF4444"), 300, 80).replace('class="spark"', 'class="spark" style="width:100%;height:80px;margin-top:14px"')}
        </div>
        <div class="panel">
          <div class="detail-grid">
            <div class="detail-cell"><div class="k">24H 最高</div><div class="v">${formatPrice(m.high24h)}</div></div>
            <div class="detail-cell"><div class="k">24H 最低</div><div class="v">${formatPrice(m.low24h)}</div></div>
            <div class="detail-cell"><div class="k">24H 成交量</div><div class="v">${escapeHtml(m.volume24h || "--")}</div></div>
            <div class="detail-cell"><div class="k">24H 涨跌</div><div class="v ${up ? "up" : "down"}">${formatChange(m.change24h)}</div></div>
          </div>
        </div>
        <div class="panel">
          <button class="action-btn ${fav ? "on" : ""}" data-fav="${escapeHtml(m.symbol)}">
            ${icon(fav ? "star" : "bookmark", 15)} ${fav ? "已收藏" : "收藏"}
          </button>
        </div>
      </div>
    </section>`;
}
