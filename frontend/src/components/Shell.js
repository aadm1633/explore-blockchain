import { appConfig } from "../config/app.js";
import { icon } from "../utils/icons.js";
import { parseHash, matchRoute } from "../router/router.js";
import { drawerNavigation, navigation } from "../data/navigation.js";

// 顶部 Header：Logo、搜索、菜单。
export function renderHeader(activeName) {
  const hideSearch = activeName === "search";
  return `
    <header class="header">
      <a href="#/" class="brand">
        <i class="logo-mark" aria-hidden="true"></i>
        <span>${appConfig.name}<em>${appConfig.slogan}</em></span>
      </a>
      <span class="spacer"></span>
      ${hideSearch ? "" : `<button class="icon-btn" data-action="search" aria-label="搜索">${icon("search", 18)}</button>`}
      <button class="icon-btn" data-action="menu" aria-label="菜单">${icon("menu", 18)}</button>
    </header>`;
}

// 底部导航：根据当前路由高亮。
export function renderBottomNav(activeName) {
  const items = navigation.map(n => {
    const active = isNavActive(n.path, activeName);
    return `<a class="nav-item ${active ? "active" : ""}" href="#${n.path}">${icon(n.icon, 20)}<span>${n.label}</span></a>`;
  }).join("");
  return `<nav class="bottom-nav">${items}</nav>`;
}

// 抽屉菜单。
export function renderDrawer(activeName) {
  const items = drawerNavigation.map(n => {
    const active = n.path === parseHash() ? "active" : "";
    return `<a class="drawer-item ${active}" href="#${n.path}">${icon(n.icon, 18)}<span>${n.label}</span></a>`;
  }).join("");
  return `
    <div class="drawer-mask" data-action="close-drawer"></div>
    <aside class="drawer">
      <div class="drawer-head">
        <div class="brand"><i class="logo-mark" aria-hidden="true"></i><span>${appConfig.name}</span></div>
        <button class="icon-btn" data-action="close-drawer" aria-label="关闭">${icon("x", 18)}</button>
      </div>
      <nav class="drawer-list">${items}</nav>
      <div class="drawer-foot">${appConfig.name} v${appConfig.version} · Web3 · 连接未来</div>
    </aside>`;
}

function isNavActive(path, activeName) {
  if (path === "/") return activeName === "home";
  if (path === "/markets") return activeName && (activeName === "markets" || activeName.startsWith("market"));
  if (path === "/exchanges") return activeName && activeName.startsWith("exchange");
  if (path === "/news") return activeName === "news" || activeName === "news-detail";
  if (path === "/profile") return ["profile", "favorites", "history", "settings", "about"].includes(activeName);
  return false;
}

// 供 app.js 绑定的全局交互。
export function bindShell({ onNavigate, onSearch, onMenu, onCloseDrawer }) {
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    if (action === "search") onSearch();
    else if (action === "menu") onMenu();
    else if (action === "close-drawer") onCloseDrawer();
  });

  window.addEventListener("hashchange", () => onNavigate());
}

export { matchRoute };
