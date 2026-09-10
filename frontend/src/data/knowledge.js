export const knowledge = [
  {
    slug: "blockchain", title: "什么是区块链？", summary: "从分布式账本、共识机制和链上数据开始。", icon: "layers", readMinutes: 6, category: "基础",
    content: [
      { heading: "从一个共享账本说起", paragraphs: ["区块链可以理解为一个由众多参与者共同维护的分布式账本。传统账本由单一机构记录与保管，而区块链上的每一笔记录都被复制到网络中的多个节点上，任何人都无法单方面篡改。"] },
      { heading: "区块与链", paragraphs: ["交易被打包进区块，每个区块都包含前一个区块的哈希值，从而形成一条不可篡改的链。修改任何一个历史区块，都会导致后续所有区块的哈希发生变化，篡改行为因此极易被察觉。"] },
      { heading: "共识机制", paragraphs: ["为了让分布在不同节点的参与者对账本状态达成一致，区块链引入了共识机制，例如工作量证明（PoW）与权益证明（PoS）。它们是网络安全与去中心化的基础。"] },
      { heading: "为什么它值得关注", paragraphs: ["区块链带来了无需信任第三方的价值传递方式，为金融、供应链、数字身份等领域提供了新的可能性。"] }
    ]
  },
  {
    slug: "bitcoin", title: "比特币 Bitcoin", summary: "理解 BTC、稀缺性、交易和网络安全。", icon: "coins", readMinutes: 7, category: "基础",
    content: [
      { heading: "数字黄金", paragraphs: ["比特币（BTC）是第一个成功的去中心化数字货币，总量恒定为 2100 万枚。其稀缺性设计使其常被类比为数字黄金。"] },
      { heading: "如何运作", paragraphs: ["比特币网络通过工作量证明共识来确认交易，矿工通过计算哈希获得记账权与区块奖励。每约四年发生一次的减半事件会进一步降低新增供应。"] },
      { heading: "安全与去中心化", paragraphs: ["比特币由全球数万个节点共同维护，没有中心化发行方。其安全性来自庞大的算力规模与开放透明的账本。"] }
    ]
  },
  {
    slug: "ethereum", title: "以太坊 Ethereum", summary: "认识智能合约、Gas 与链上应用。", icon: "zap", readMinutes: 8, category: "进阶",
    content: [
      { heading: "可编程的区块链", paragraphs: ["以太坊在比特币的基础上引入了智能合约——部署在链上的可执行代码。开发者可以基于它构建去中心化应用（DApp）。"] },
      { heading: "Gas 与费用", paragraphs: ["在以太坊上执行操作需要支付 Gas 费用，Gas 是计算资源的计价单位。网络拥堵时费用上升，Layer2 扩展方案旨在降低这一成本。"] },
      { heading: "从 PoW 到 PoS", paragraphs: ["以太坊已完成向权益证明（PoS）的升级，大幅降低了网络能耗，并为未来的可扩展性升级奠定基础。"] }
    ]
  },
  {
    slug: "wallet", title: "钱包教程", summary: "理解地址、私钥、助记词与资产安全。", icon: "wallet", readMinutes: 9, category: "安全",
    content: [
      { heading: "钱包是什么", paragraphs: ["加密钱包用于管理你的链上资产。它并不实际存放资产，而是保管控制资产的私钥，并与区块链交互。"] },
      { heading: "地址、私钥与助记词", paragraphs: ["地址像银行账号，用于接收资产；私钥是掌控资产的唯一凭证，绝不能泄露；助记词则是由一组单词组成的私钥备份形式。"] },
      { heading: "安全要点", paragraphs: ["永远不要向任何人透露私钥或助记词；妥善离线备份；警惕钓鱼网站与假冒客服；大额资产建议使用硬件钱包。"] }
    ]
  },
  {
    slug: "defi", title: "DeFi 去中心化金融", summary: "认识去中心化交易、借贷和流动性。", icon: "chart", readMinutes: 8, category: "进阶",
    content: [
      { heading: "什么是 DeFi", paragraphs: ["DeFi（去中心化金融）指构建在区块链上的开放式金融系统，用户无需银行等中介即可完成交易、借贷与理财。"] },
      { heading: "常见应用", paragraphs: ["去中心化交易所（DEX）让用户直接通过智能合约兑换资产；借贷协议允许用户存入资产获得利息或以抵押方式借出资产。"] },
      { heading: "风险提示", paragraphs: ["DeFi 仍处于早期阶段，智能合约风险、波动性风险与流动性风险都需要谨慎评估，切勿投入无法承受损失的资金。"] }
    ]
  },
  {
    slug: "nft", title: "NFT 非同质化代币", summary: "了解链上数字资产和应用场景。", icon: "sparkles", readMinutes: 6, category: "进阶",
    content: [
      { heading: "非同质化", paragraphs: ["NFT 是链上独一无二的数字资产凭证。与同质化的代币不同，每一枚 NFT 都有唯一标识，不可互换。"] },
      { heading: "应用场景", paragraphs: ["NFT 可代表数字艺术品、游戏道具、门票、会员资格与身份凭证等。其核心价值在于可验证的所有权与稀缺性。"] },
      { heading: "理性看待", paragraphs: ["NFT 的价值波动较大，投资前应充分理解作品本身与市场流动性，避免盲目跟风。"] }
    ]
  }
];
