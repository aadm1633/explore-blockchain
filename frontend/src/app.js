import { appConfig } from "./config/app.js";
import { matchRoute, parseHash } from "./router/router.js";
import { renderHeader, renderBottomNav, renderDrawer, bindShell } from "./components/Shell.js";
import { toggleFavorite } from "./utils/storage.js";
import { clearHistory } from "./utils/storage.js";
import { bindSearch } from "./pages/SearchPage.js";

import { homePage } from "./pages/HomePage.js";
import { exchangesPage, exchangeDetailPage, exchangeComparePage } from "./pages/ExchangesPage.js";
import { marketsPage, marketRankingsPage, marketGainersPage, marketLosersPage, marketDetailPage } from "./pages/MarketsPage.js";
import { newsPage, newsDetailPage } from "./pages/NewsPage.js";
import { learnPage, learnDetailPage } from "./pages/LearnPage.js";
import { searchPage } from "./pages/SearchPage.js";
import { profilePage, favoritesPage, historyPage, settingsPage, aboutPage } from "./pages/ProfilePage.js";

// 路由名 -> 页面渲染函数。
const pageMap = {
  "home": homePage,
  "exchanges": exchangesPage,
  "exchange-detail": exchangeDetailPage,
  "exchange-compare": exchangeComparePage,
  "markets": marketsPage,
  "market-rankings": marketRankingsPage,
  "market-gainers": marketGainersPage,
  "market-losers": marketLosersPage,
  "market-detail": marketDetailPage,
  "news": newsPage,
  "news-detail": newsDetailPage,
  "learn": learnPage,
  "learn-detail": learnDetailPage,
  "search": searchPage,
  "profile": profilePage,
  "favorites": favoritesPage,
  "history": historyPage,
  "settings": settingsPage,
  "about": aboutPage
};

const root = document.getElementById("app");
const shell = document.getElementById("shell");

async function render() {
  const path = parseHash();
  const route = matchRoute(path);
  const fn = pageMap[route.name];

  // 更新头部/底部导航/抽屉（激活态）。
  shell.innerHTML =
    renderHeader(route.name) +
    renderBottomNav(route.name) +
    renderDrawer(route.name);

  let pageHtml;
  if (!fn) {
    pageHtml = `<section class="page active" data-page="not-found"><div class="page-head"><h2>页面不存在</h2><p>未找到路径 ${path}。</p></div></section>`;
  } else {
    pageHtml = await fn(route.params);
  }
  root.innerHTML = pageHtml;

  // 页面级交互绑定。
  if (route.name === "search") bindSearch();
  bindPageActions(route.name);

  window.scrollTo(0, 0);
}

function bindPageActions(name) {
  // 详情页收藏按钮。
  const favBtn = root.querySelector("[data-fav]");
  if (favBtn) {
    favBtn.addEventListener("click", () => {
      const id = favBtn.dataset.fav;
      const symbolEl = root.querySelector(".exchange-hero h2");
      const title = symbolEl ? symbolEl.textContent : id;
      const added = toggleFavorite({ type: "market", id, title, subtitle: "行情", href: `#/markets/${id.toLowerCase()}` });
      favBtn.classList.toggle("on", added);
      favBtn.innerHTML = added
        ? `<svg class="ic" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8L6.7 19.6l1-6L3.3 9.4l6-.9z"/></svg> 已收藏`
        : `<svg class="ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h12v18l-6-4-6 4z"/></svg> 收藏`;
    });
  }
  // 清空历史。
  const clearBtn = root.querySelector("#clear-history");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearHistory();
      render();
    });
  }
}

// 全局壳层交互。
bindShell({
  onNavigate: render,
  onSearch: () => { location.hash = "#/search"; },
  onMenu: () => {
    document.querySelector(".drawer")?.classList.add("open");
    document.querySelector(".drawer-mask")?.classList.add("open");
  },
  onCloseDrawer: () => {
    document.querySelector(".drawer")?.classList.remove("open");
    document.querySelector(".drawer-mask")?.classList.remove("open");
  }
});

window.addEventListener("hashchange", render);
render();
