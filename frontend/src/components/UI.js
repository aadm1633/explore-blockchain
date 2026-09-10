import { icon } from "../utils/icons.js";
import { formatPrice, formatChange, isUp, initials, escapeHtml } from "../utils/format.js";

// 迷你走势图（SVG polyline）。
export function sparklineSVG(points = [], color = "#1677FF", width = 64, height = 28) {
  if (!points || points.length < 2) return "";
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const pad = 2;
  const stepX = (width - pad * 2) / (points.length - 1);
  const coords = points.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `<svg class="spark" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" preserveAspectRatio="none" aria-hidden="true"><polyline points="${coords.join(" ")}" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

// 行情行。
export function marketRow(m) {
  const up = isUp(m.change24h);
  const color = up ? "var(--up)" : "var(--down)";
  const sparkColor = m.color || (up ? "#16A34A" : "#EF4444");
  return `
    <a class="row" href="#/markets/${m.symbol.toLowerCase()}">
      <span class="coin-logo" style="background:${m.color || "#1677FF"}">${escapeHtml(m.symbol.slice(0, 2))}</span>
      <div class="grow">
        <div class="coin-name">${escapeHtml(m.symbol)}</div>
        <div class="coin-sym">${escapeHtml(m.name)}</div>
      </div>
      ${sparklineSVG(m.sparkline, sparkColor)}
      <div>
        <div class="price">${formatPrice(m.price)}</div>
        <div class="change ${up ? "up" : "down"}">${formatChange(m.change24h)}</div>
      </div>
    </a>`;
}

// 交易所横滑卡片。
export function exchangeCard(x) {
  const logo = x.logo
    ? `<img src="${x.logo}" alt="${escapeHtml(x.name)}" loading="lazy">`
    : initials(x.name);
  const link = x.website
    ? `<span class="ex-link">${icon("external", 12)} 打开官网</span>`
    : `<span class="ex-link" style="color:var(--text-muted)">${icon("info", 12)} 入口待配置</span>`;
  return `
    <a class="ex-card" href="${x.website ? x.website : `#/exchanges/${x.id}`}" ${x.website ? 'target="_blank" rel="noopener noreferrer"' : ""}>
      <span class="ex-logo" style="background:${x.brand || "#111"}">${logo}</span>
      <div class="ex-name">${escapeHtml(x.name)}</div>
      <div class="ex-local">${escapeHtml(x.localName)}</div>
      <span class="ex-tag">${escapeHtml(x.tag)}</span>
      ${link}
    </a>`;
}

// 交易所详情行。
export function exchangeRow(x) {
  const logo = x.logo
    ? `<img src="${x.logo}" alt="${escapeHtml(x.name)}" loading="lazy">`
    : initials(x.name);
  return `
    <a class="row" href="#/exchanges/${x.id}">
      <span class="ex-logo" style="background:${x.brand || "#111"}">${logo}</span>
      <div class="grow">
        <div class="coin-name">${escapeHtml(x.name)} · ${escapeHtml(x.localName)}</div>
        <div class="coin-sym">${escapeHtml(x.tag)}</div>
      </div>
      ${icon("chevronRight", 18)}
    </a>`;
}

// 资讯列表项。
export function newsItem(n, { compact = false } = {}) {
  return `
    <a class="news-item" href="#/news/${n.id}">
      <span class="news-thumb">WEB3<br>NEWS</span>
      <div class="grow">
        <div class="news-title">${escapeHtml(n.title)}</div>
        ${compact ? "" : `<div class="news-meta"><span class="badge">${escapeHtml(n.categoryLabel || n.category)}</span><span>${escapeHtml(n.source)}</span><span>·</span><span>${escapeHtml(n.time)}</span></div>`}
      </div>
    </a>`;
}

// 学习知识卡片（横滑）。
export function knowledgeCard(k, index) {
  return `
    <a class="know-card" href="#/learn/${k.slug}">
      <span class="knum">${String(index + 1).padStart(2, "0")}</span>
      <span class="kicon">${icon(k.icon || "book", 18)}</span>
      <h3>${escapeHtml(k.title)}</h3>
      <p>${escapeHtml(k.summary)}</p>
    </a>`;
}

// 学习列表行。
export function learnRow(k) {
  return `
    <a class="row" href="#/learn/${k.slug}">
      <span class="kicon" style="width:38px;height:38px;border-radius:11px;background:var(--brand-blue-soft);color:var(--brand-blue);display:flex;align-items:center;justify-content:center;flex:none">${icon(k.icon || "book", 18)}</span>
      <div class="grow">
        <div class="coin-name">${escapeHtml(k.title)}</div>
        <div class="coin-sym">${escapeHtml(k.summary)}</div>
      </div>
      ${icon("chevronRight", 18)}
    </a>`;
}

// 空状态。
export function emptyState(iconName, title, desc) {
  return `
    <div class="empty">
      <div class="eicon">${icon(iconName, 26)}</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(desc)}</p>
    </div>`;
}
