import { icon } from "../utils/icons.js";
import { exchangeCard, marketRow, newsItem, knowledgeCard } from "../components/UI.js";
import { getExchanges, getActiveExchanges } from "../services/exchangeService.js";
import { getMarkets } from "../services/marketService.js";
import { getNews } from "../services/newsService.js";
import { getKnowledge } from "../services/learnService.js";

// 首页：Hero + 热门交易所 + 快捷入口 + 基础知识 + 行情 + 资讯。
export async function homePage() {
  const [exchanges, markets, news, knowledge] = await Promise.all([
    getExchanges(), getMarkets(), getNews(), getKnowledge()
  ]);

  const exCards = exchanges.map(exchangeCard).join("");
  const marketRows = markets.slice(0, 4).map(marketRow).join("");
  const newsItems = news.slice(0, 4).map(n => newsItem(n)).join("");
  const knowledgeCards = knowledge.slice(0, 4).map((k, i) => knowledgeCard(k, i)).join("");

  return `
    <section class="page active" data-page="home">
      <div class="hero">
        <div class="eyebrow">WEB3 DISCOVERY</div>
        <h1>探索 <span class="accent">Web3</span><br>世界</h1>
        <p class="lead">区块链 · 交易所 · DeFi · NFT · 未来已来。一个更简单、更清晰的 Web3 信息与导航入口。</p>
        <div class="chips">
          <span class="chip">区块链</span><span class="chip">交易所</span><span class="chip">行情</span><span class="chip">学习</span>
        </div>
        <a class="cta-btn" href="#/exchanges">开始探索 ${icon("arrowRight", 14)}</a>
      </div>

      <section class="section">
        <div class="section-head">
          <div><div class="section-title">热门交易所</div><div class="section-sub">官方入口 · 独立跳转</div></div>
          <a class="more-link" href="#/exchanges">查看全部 →</a>
        </div>
        <div class="hscroll">${exCards}</div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">快速入口</div></div>
        <div class="quick-grid">
          <a class="quick-item" href="#/learn"><span class="qicon">${icon("book", 18)}</span><span>新手入门</span></a>
          <a class="quick-item" href="#/learn/wallet"><span class="qicon">${icon("wallet", 18)}</span><span>钱包教程</span></a>
          <a class="quick-item" href="#/markets"><span class="qicon">${icon("chart", 18)}</span><span>行情数据</span></a>
          <a class="quick-item" href="#/news"><span class="qicon">${icon("newspaper", 18)}</span><span>行业资讯</span></a>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><div class="section-title">区块链基础知识</div><div class="section-sub">先理解，再探索</div></div>
          <a class="more-link" href="#/learn">更多 →</a>
        </div>
        <div class="hscroll">${knowledgeCards}</div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><div class="section-title">今日行情</div><div class="section-sub">Mock Data · 后续接实时 API</div></div>
          <a class="more-link" href="#/markets">查看全部 →</a>
        </div>
        <div class="list">${marketRows}</div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><div class="section-title">最新资讯</div><div class="section-sub">Mock Data · 正式版接真实数据源</div></div>
          <a class="more-link" href="#/news">更多 →</a>
        </div>
        <div class="list">${newsItems}</div>
      </section>
    </section>`;
}
