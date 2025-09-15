export const keys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "o",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
];

export const AboutLayout = {
  lg: [
    { i: "a", x: 0, y: 0, w: 4, h: 2, isResizable: false }, // AI 用户画像卡片 - 超大卡片（置顶）
    { i: "b", x: 0, y: 2, w: 1, h: 1, isResizable: false }, // 网络制式卡片 - 竖向卡片
    { i: "c", x: 1, y: 2, w: 1, h: 1, isResizable: false }, // 轨迹概览卡片 - 竖向卡片
    { i: "d", x: 2, y: 2, w: 2, h: 2, isResizable: false }, // 资源查询卡片 - 大卡片
    { i: "e", x: 0, y: 3, w: 2, h: 2, isResizable: false }, // 账单查询卡片 - 大卡片
    { i: "f", x: 0, y: 4, w: 2, h: 2, isResizable: false }, // 客户位置卡片 - 大卡片
    { i: "g", x: 0, y: 6, w: 1, h: 1, isResizable: false },
    { i: "h", x: 1, y: 6, w: 2, h: 1, isResizable: false },
    { i: "i", x: 0, y: 7, w: 2, h: 2, isResizable: false }, // 其他卡片向下移动
    { i: "j", x: 2, y: 7, w: 1, h: 1, isResizable: false },
    { i: "k", x: 3, y: 7, w: 1, h: 1, isResizable: false },
    { i: "l", x: 0, y: 9, w: 1, h: 1, isResizable: false },
    { i: "m", x: 1, y: 9, w: 1, h: 1, isResizable: false },
    { i: "n", x: 2, y: 8, w: 1, h: 1, isResizable: false },
    { i: "o", x: 3, y: 8, w: 1, h: 1, isResizable: false },
    { i: "p", x: 2, y: 9, w: 1, h: 1, isResizable: false },
    { i: "q", x: 3, y: 9, w: 1, h: 1, isResizable: false },
  ],
  xs: [
    { i: "a", x: 0, y: 0, w: 2, h: 2, static: true }, // 客户位置卡片 - 移动端大卡片
    { i: "b", x: 0, y: 2, w: 2, h: 1, static: true }, // 网络制式卡片 - 移动端横向
    { i: "c", x: 0, y: 3, w: 2, h: 1, static: true }, // 轨迹概览卡片 - 移动端横向
    { i: "d", x: 0, y: 4, w: 2, h: 2, static: true }, // 资源查询卡片 - 移动端大卡片
    { i: "e", x: 0, y: 6, w: 2, h: 2, static: true }, // 账单查询卡片 - 移动端大卡片
    { i: "f", x: 0, y: 8, w: 2, h: 3, static: true }, // AI 用户画像卡片 - 移动端大卡片
    { i: "g", x: 1, y: 12, w: 2, h: 1, static: true },
    { i: "h", x: 0, y: 9, w: 2, h: 1, static: true },
    { i: "i", x: 0, y: 5, w: 1, h: 1, static: true },
    { i: "j", x: 2, y: 13, w: 1.5, h: 1, static: true },
    { i: "k", x: 2, y: 14, w: 3, h: 1, static: true },
    { i: "l", x: 0, y: 8, w: 1, h: 1, static: true },
    { i: "m", x: 0, y: 6, w: 1, h: 1, static: true },
    { i: "n", x: 0, y: 11, w: 1, h: 1, static: true },
    { i: "o", x: 0, y: 10, w: 1, h: 1, static: true },
    { i: "p", x: 0, y: 10, w: 1, h: 1, static: true },
    { i: "q", x: 0, y: 9, w: 1, h: 1, static: true },
  ],
};

export const ProjectsLayouts = {
  lg: [
    { i: "k", x: 1, y: 5, w: 2, h: 1, isResizable: false },
    { i: "i", x: 3, y: 0, w: 1, h: 1, isResizable: false },
    { i: "p", x: 0, y: 2, w: 1, h: 1, isResizable: false },
    { i: "j", x: 0, y: 6, w: 1, h: 1, isResizable: false },
    { i: "h", x: 0, y: 4, w: 2, h: 1, isResizable: false },
    { i: "e", x: 3, y: 4, w: 1, h: 1, isResizable: false },
    { i: "c", x: 3, y: 1, w: 1, h: 1, isResizable: false },
    { i: "m", x: 0, y: 3, w: 2, h: 1, isResizable: false },
    { i: "b", x: 0, y: 4, w: 1, h: 1, isResizable: false },
    { i: "d", x: 0, y: 7, w: 1, h: 1, isResizable: false },
    { i: "a", x: 0, y: 0, w: 3, h: 3, isResizable: false }, // AI 用户画像卡片 - 超大卡片（置顶）
    { i: "l", x: 0, y: 1, w: 1, h: 1, isResizable: false },
    { i: "f", x: 1, y: 8, w: 2, h: 2, isResizable: false }, // 客户位置卡片 - 大卡片
    { i: "n", x: 0, y: 7, w: 1, h: 1, isResizable: false },
    { i: "o", x: 2, y: 3, w: 1, h: 1, isResizable: false },
    { i: "g", x: 0, y: 7, w: 1, h: 1, isResizable: false },
    { i: "q", x: 0, y: 7, w: 2, h: 1, isResizable: false },
  ],
  xs: [
    { i: "b", x: 0, y: 0, w: 2, h: 1, static: true },
    { i: "i", x: 2, y: 0, w: 1, h: 1, static: true },
    { i: "g", x: 0, y: 5, w: 1, h: 1, static: true },
    { i: "c", x: 0, y: 1, w: 1, h: 1, static: true },
    { i: "h", x: 1, y: 4, w: 1, h: 1, static: true },
    { i: "f", x: 0, y: 2, w: 2, h: 2, static: true }, // AI 用户画像卡片 - 移动端大卡片
    { i: "j", x: 1, y: 1, w: 2, h: 1, static: true },
    { i: "e", x: 0, y: 4, w: 2, h: 1, static: true },
    { i: "k", x: 0, y: 4, w: 1.5, h: 1, static: true },
    { i: "d", x: 2, y: 4, w: 1.5, h: 1, static: true },
    { i: "a", x: 2, y: 4, w: 3, h: 1, static: true },
    { i: "l", x: 2, y: 5, w: 1, h: 1, static: true },
    { i: "m", x: 2, y: 5, w: 1, h: 1, static: true },
    { i: "n", x: 2, y: 5, w: 1, h: 1, static: true },
  ],
};

export const ContactLayouts = {
  lg: [
    { i: "l", x: 0, y: 3, w: 1, h: 1, isResizable: false },
    { i: "i", x: 2, y: 5, w: 2, h: 1, isResizable: false },
    { i: "g", x: 3, y: 0, w: 1, h: 1, isResizable: false },
    { i: "c", x: 3, y: 1, w: 1, h: 1, isResizable: false },
    { i: "d", x: 3, y: 0, w: 1, h: 1, isResizable: false },
    { i: "f", x: 3, y: 2, w: 2, h: 2, isResizable: false }, // 客户位置卡片 - 大卡片
    { i: "j", x: 0, y: 4, w: 1, h: 1, isResizable: false },
    { i: "e", x: 3, y: 1, w: 1, h: 1, isResizable: false },
    { i: "a", x: 0, y: 0, w: 3, h: 3, isResizable: false }, // AI 用户画像卡片 - 超大卡片（置顶）
    { i: "b", x: 4, y: 1, w: 1, h: 1, isResizable: false },
    { i: "h", x: 0, y: 5, w: 2, h: 1, isResizable: false },
    { i: "k", x: 3, y: 4, w: 2, h: 1, isResizable: false },
    { i: "m", x: 3, y: 5, w: 2, h: 2, isResizable: false },
    { i: "n", x: 0, y: 5, w: 2, h: 2, isResizable: false },
    { i: "o", x: 1, y: 6, w: 1, h: 1, isResizable: false },
    { i: "p", x: 0, y: 5, w: 1, h: 1, isResizable: false },
    { i: "g", x: 0, y: 7, w: 1, h: 1, isResizable: false },
    { i: "q", x: 0, y: 3, w: 2, h: 1, isResizable: false },
  ],
  xs: [
    { i: "l", x: 0, y: 0, w: 2, h: 1, static: true },
    { i: "i", x: 2, y: 0, w: 1, h: 1, static: true },
    { i: "g", x: 0, y: 0, w: 1, h: 1, static: true },
    { i: "c", x: 0, y: 1, w: 1, h: 1, static: true },
    { i: "d", x: 1, y: 1, w: 1, h: 1, static: true },
    { i: "f", x: 0, y: 5, w: 2, h: 2, static: true }, // AI 用户画像卡片 - 移动端大卡片
    { i: "j", x: 1, y: 1, w: 2, h: 1, static: true },
    { i: "e", x: 0, y: 3, w: 2, h: 1, static: true },
    { i: "a", x: 0, y: 4, w: 1.5, h: 1, static: true },
    { i: "b", x: 2, y: 4, w: 1.5, h: 1, static: true },
    { i: "h", x: 2, y: 4, w: 3, h: 1, static: true },
    { i: "k", x: 2, y: 2, w: 1, h: 1, static: true },
    { i: "m", x: 2, y: 2, w: 1, h: 1, static: true },
    { i: "n", x: 2, y: 2, w: 1, h: 1, static: true },
  ],
};
