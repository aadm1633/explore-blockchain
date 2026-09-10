# 探索区块链 v1 — 原项目增量优化架构

> 本文件基于原始 `explore-blockchain-v1.zip` 的实际文件结构制定。
> **最高原则：已有文件、页面、样式、脚本、资源、交易所入口和现有功能默认不动。后续开发采用新增优先、最小修改、可回退的增量方式。**

## 1. 当前原项目基线

原 ZIP 当前实际结构：

```text
explore-blockchain-v1/
├── index.html
├── frontend/
│   └── assets/
│       ├── okx.jpg
│       ├── binance.jpg
│       ├── binance.png
│       └── okx / Binance 相关现有资源
├── backend/
│   └── README.md
├── docs/
│   └── ARCHITECTURE.md
└── 探索区块链_完整项目架构.md
```

当前前端实际上以**根目录 `index.html` + `frontend/assets/`**运行，而不是完整的 React/Vue 工程。因此后续不能直接套用完整 SPA 工程结构并覆盖现有前端。

## 2. 不可破坏清单

以下内容作为 v1 原始基线保护：

- 根目录 `index.html`：保留并作为当前入口。
- `frontend/assets/`：保留现有目录和已有资源。
- OKX 图片：不替换、不删除。
- Binance 图片：不替换、不删除。
- 现有交易所入口 URL：不擅自修改。
- 现有首页布局、底部导航、Hash 路由和已有交互：不因架构整理而删除。
- 当前纯白极简、移动端优先视觉方向：继续沿用。

> 如果以后发现现有链接需要安全性或官方性核验，应先单独提出“链接核验”任务，不与架构重构混在一起。

## 3. 推荐演进路线

```text
                 原始 v1
                    │
        ┌───────────▼───────────┐
        │  Legacy Core / 原页面 │
        │ index.html + assets   │
        └───────────┬───────────┘
                    │
              增量接入层
                    │
        ┌───────────▼───────────┐
        │ frontend/src/         │
        │ components/pages/...  │
        └───────────┬───────────┘
                    │
             Service / Data
                    │
          ┌─────────┴─────────┐
          │                   │
       Mock Data          Backend API
                              │
                    ┌─────────┴─────────┐
                    │                   │
                  Redis             PostgreSQL
                    ▲                   ▲
                    │                   │
                 Worker ────────────────┘
                    ▲
                    │
                外部数据源
```

## 4. 增量目录结构

第一阶段不要搬迁旧文件。只新增以下结构：

```text
explore-blockchain-v1/
├── index.html                         # 原文件，保护
├── frontend/
│   ├── assets/                        # 原目录，保护
│   │   ├── okx.jpg
│   │   ├── binance.jpg
│   │   └── ...
│   │
│   ├── public/                        # 新增静态资源区
│   │   └── assets/
│   │       ├── exchanges/
│   │       ├── coins/
│   │       ├── news/
│   │       ├── icons/
│   │       └── images/
│   │
│   └── src/                           # 新功能区
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── router/
│       ├── data/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       └── config/
│
├── backend/                           # 保留 README，后续逐步新增实现
│   ├── src/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── websocket/
│   │   └── config/
│   └── README.md
│
├── worker/                            # 后续新增
│   ├── market-worker/
│   ├── news-worker/
│   └── scheduler/
│
├── database/                          # 后续新增
│   ├── migrations/
│   └── schema/
│
├── docs/
│   ├── ARCHITECTURE.md                # 原文件，保留
│   └── ARCHITECTURE_OPTIMIZED.md      # 本优化方案
│
└── .github/
    └── workflows/                     # 后续新增部署流程
```

## 5. 前端模块职责

### components
公共 UI，不直接保存业务数据。

```text
Header
BottomNavigation
Drawer
ExchangeCard
MarketCard
NewsCard
LearnCard
SearchBox
Loading
Empty
Error
Modal
```

### pages
页面负责组合组件和展示业务状态：

```text
Home
Exchanges
Markets
News
Learn
Search
Profile
```

后续详情页再按需增加：

```text
ExchangeDetail
ExchangeCompare
MarketDetail
NewsDetail
LearnDetail
```

### data
第一阶段使用 Mock 数据，统一出口：

```text
exchanges.js
markets.js
news.js
knowledge.js
navigation.js
```

页面禁止继续大量硬编码业务数据。

### services
统一数据访问层：

```text
exchangeService.js
marketService.js
newsService.js
learnService.js
searchService.js
userService.js
```

Service 对页面隐藏数据来源。这样可以实现：

```text
Mock → Service → 页面
```

平滑升级为：

```text
API → Service → 页面
```

无需重新设计页面。

## 6. 当前 index.html 的处理策略

当前 `index.html` 已经同时承担：

- 页面结构
- CSS
- Hash 路由
- Mock 数据
- 页面渲染
- 搜索逻辑
- 交易所数据

因此**第一阶段不要直接拆分它**。

采用三步法：

### 第一步：保护
保持现有 `index.html` 能独立运行。

### 第二步：旁路新增
新功能先放到 `frontend/src/`，不影响旧页面。

### 第三步：逐模块接入
当新模块稳定后，再通过最小改动接入现有入口。

禁止一次性把 `index.html` 改造成大型 SPA。

## 7. 数据模型

### Exchange

```js
{
  id,
  name,
  slug,
  logo,
  website,
  description,
  tags,
  ranking,
  status
}
```

### Market

```js
{
  symbol,
  name,
  logo,
  price,
  change24h,
  volume24h,
  high24h,
  low24h,
  sparkline,
  updatedAt
}
```

### News

```js
{
  id,
  title,
  summary,
  source,
  category,
  image,
  publishedAt,
  url
}
```

## 8. 路由演进

现有 Hash 路由继续保留：

```text
#/
#/exchanges
#/markets
#/news
#/learn
#/profile
#/search
```

以后增量加入：

```text
#/exchanges/:id
#/exchanges/compare
#/markets/:symbol
#/news/:id
#/learn/:slug
```

如果现有 Hash 路由可以满足需求，就不强制引入新的路由库。

## 9. 行情数据演进

### v1

```text
Mock Data
   ↓
Service
   ↓
UI
```

### v2

```text
External API
   ↓
Backend
   ↓
Service
   ↓
UI
```

### v3

```text
External Exchange API
        ↓
   Market Worker
        ↓
      Redis
        ↓
Backend WebSocket
        ↓
    Frontend
```

## 10. 后端模块

后端保持独立，不影响 GitHub Pages 当前静态前端：

```text
backend/src/modules/
├── auth/
├── users/
├── exchanges/
├── markets/
├── news/
├── learn/
├── search/
└── favorites/
```

后端只在真正需要动态能力时启用。

## 11. 数据库规划

后续 PostgreSQL：

```text
users
exchanges
markets
market_snapshots
news
news_categories
learn_articles
favorites
history
```

Redis：

```text
行情缓存
热点数据
搜索缓存
Session
WebSocket Pub/Sub
Rate Limit
```

## 12. Worker

```text
worker/
├── market-worker/     # 行情采集、清洗、缓存
├── news-worker/       # 新闻采集、清洗
└── scheduler/         # 定时任务
```

Worker 不直接控制前端，只负责产生标准化数据。

## 13. GitHub Pages 部署原则

当前项目继续以静态前端为优先：

```text
GitHub
  ↓
Actions
  ↓
frontend / 静态入口
  ↓
GitHub Pages
```

在没有必要之前，不把现有可运行页面迁移成复杂构建链。

如果未来引入 Vite/React 等构建工具，必须先建立独立构建入口并验证，再考虑切换，不得直接删除当前可运行入口。

## 14. 移动端标准

重点测试：

```text
375px
390px
393px
412px
430px
```

必须检查：

- 横向溢出
- 底部导航遮挡
- Safe Area
- 图片比例
- 文字换行
- 卡片宽度
- 点击区域
- 页面滚动
- 首屏加载

继续保持纯白极简风格，避免为了“升级架构”改变现有视觉定位。

## 15. 开发权限表

| 内容 | 权限 | 原则 |
|---|---|---|
| 原 index.html | 保护 | 仅必要时最小修改 |
| 原 CSS | 保护 | 不重写 |
| 原 JS | 保护 | 不删除 |
| 原 assets | 保护 | 不替换/删除 |
| OKX Logo | 保护 | 不动 |
| Binance Logo | 保护 | 不动 |
| 原交易所 URL | 保护 | 不擅自修改 |
| 新组件 | 新增 | 推荐 |
| 新页面 | 新增 | 推荐 |
| 新数据模块 | 新增 | 推荐 |
| 新 Service | 新增 | 推荐 |
| Backend | 新增 | 第二阶段 |
| Worker | 新增 | 后续阶段 |
| Database | 新增 | 后续阶段 |

## 16. 实际开发顺序

```text
① 原 ZIP 基线保护
        ↓
② 公共组件层
        ↓
③ 数据层
        ↓
④ Service 层
        ↓
⑤ 交易所页面
        ↓
⑥ 行情页面
        ↓
⑦ 资讯页面
        ↓
⑧ 学习中心
        ↓
⑨ 搜索 / 收藏 / 历史
        ↓
⑩ Backend API
        ↓
⑪ Redis / PostgreSQL
        ↓
⑫ Worker
        ↓
⑬ WebSocket 实时数据
```

## 17. 一句话架构原则

> **旧项目是核心资产，新架构是扩展层；先保证原功能 100% 保留，再通过新增模块逐步把“探索区块链”从单文件静态导航页升级为完整 Web3 信息平台。**
