# 旅行攻略网站设计文档

## 概述

一个面向中国用户的旅行攻略静态展示网站，精选 10 大国内热门景点，提供详细实用的攻略信息。MVP 阶段采用纯前端静态站点方案，内容硬编码在 JSON 文件中，无需后端。

## 技术栈

- **框架**: Vue 3 + Vite + TypeScript
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **状态管理**: Pinia
- **样式**: Tailwind CSS
- **图片**: Unsplash 免费图库（MVP 阶段）
- **部署**: Vercel / Netlify（免费静态托管）

## 设计风格

清新自然风格：

| 属性 | 值 |
|------|------|
| 主色 | `#4a90d9`（天蓝） |
| 辅色 | `#66bb6a`（草绿）、`#26a69a`（浅青） |
| 背景色 | `#f8fafb`（米白） |
| 文字主色 | `#333` |
| 文字辅色 | `#666` |
| 卡片圆角 | `12px` |
| 按钮圆角 | `8px` |
| 卡片阴影 | `0 4px 16px rgba(0,0,0,0.08)` |

## 项目结构

```
trip/
├── public/
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.scss          # 全局样式入口
│   │   │   └── variables.scss     # SCSS 变量（配色等）
│   ├── components/
│   │   ├── Navbar.vue             # 顶部导航栏
│   │   ├── Footer.vue             # 页脚
│   │   ├── SpotCard.vue           # 景点卡片组件
│   │   ├── HeroBanner.vue         # 首页轮播组件
│   │   ├── AnchorNav.vue          # 锚点导航组件
│   │   ├── ImageGallery.vue       # 图集组件
│   │   └── CommentSection.vue     # 评论区组件（静态占位）
│   ├── views/
│   │   ├── Home.vue               # 首页
│   │   ├── SpotList.vue           # 景点列表页
│   │   └── SpotDetail.vue         # 攻略详情页
│   ├── data/
│   │   └── spots.json             # 10 个景点的静态数据
│   ├── router/
│   │   └── index.ts               # Vue Router 配置
│   ├── stores/
│   │   └── spots.ts               # Pinia store（景点数据加载、筛选）
│   ├── types/
│   │   └── spot.ts                # TypeScript 类型定义
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 路由设计

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home.vue | 首页：轮播 + 分类筛选 + 景点卡片网格 |
| `/spots` | SpotList.vue | 景点列表：全部 10 个景点的筛选列表 |
| `/spots/:id` | SpotDetail.vue | 攻略详情：单条攻略详情页 |

## 数据模型

```typescript
interface Spot {
  id: string;
  name: string;
  province: string;
  type: "nature" | "history" | "mixed";
  cover: string;
  rating: number;
  summary: string;
  overview: {
    description: string;
    openTime: string;
    ticket: string;
    duration: string;
    bestSeason: string;
  };
  transport: {
    flights: string[];
    local: string;
    parking: string;
  };
  routes: RoutePlan[];
  hotels: Hotel[];
  foods: Food[];
  tips: string[];
  gallery: string[];
}

interface RoutePlan {
  title: string;
  type: string;
  steps: string[];
}

interface Hotel {
  name: string;
  level: "high" | "mid" | "low";
  price: string;
  description: string;
}

interface Food {
  name: string;
  description: string;
  restaurant: string;
  price: string;
}
```

景点 ID 列表：
- `forbidden-city` — 故宫
- `great-wall` — 长城（八达岭）
- `west-lake` — 西湖
- `terracotta-army` — 兵马俑
- `zhangjiajie` — 张家界国家森林公园
- `jiuzhaigou` — 九寨沟
- `lijiang` — 丽江古城
- `guilin` — 桂林山水（阳朔）
- `huangshan` — 黄山
- `potala-palace` — 布达拉宫

## 组件设计

### Navbar（顶部导航栏）
- 左侧：Logo + 网站名"旅行攻略"
- 右侧：首页 / 攻略列表 / 关于 三个导航链接
- 固定定位，滚动时添加半透明背景
- 移动端显示汉堡菜单

### HeroBanner（首页轮播）
- 全屏宽度，高度 60vh
- 3 张精选风景图自动轮播（5 秒间隔，悬停暂停）
- 居中白色半透明标题层
- 左右箭头切换，底部圆点指示器

### SpotCard（景点卡片）
- 封面图（16:9，圆角 12px）
- 景点名称 + 省份标签 + 星级评分
- 一句话简介
- "查看攻略" 按钮（绿色）
- hover：上浮 4px + 阴影加深

### AnchorNav（锚点导航）
- 粘性定位（`position: sticky`，top 0）
- 锚点：概览 / 交通 / 路线 / 住宿 / 美食 / 贴士 / 图集 / 评论
- 当前模块高亮显示
- 点击平滑滚动

### ImageGallery（图集组件）
- 3 列网格（手机 2 列，平板 3 列）
- 图片懒加载（Intersection Observer）
- 点击弹出全屏 Modal，左右切换浏览

### CommentSection（评论区）
- MVP 阶段为静态占位（"评论功能即将上线"）
- 展示 3-5 条模拟评论
- 二期接入后端实现真实评论

### Footer（页脚）
- 版权信息
- 联系方式
- 关于我们链接

## 页面布局

### 首页（Home.vue）
1. Navbar
2. HeroBanner（轮播）
3. 分类筛选按钮组（全部 / 自然风光 / 人文历史 / 人文+自然）
4. 景点卡片网格（响应式：PC 3 列 / 平板 2 列 / 手机 1 列）
5. Footer

### 攻略详情页（SpotDetail.vue）
1. Navbar
2. 全屏宽度封面大图 + 基本信息浮层（名称/评分/门票/开放时间）
3. AnchorNav（粘性锚点导航）
4. 内容区块（白色卡片，圆角，内边距）：
   - 景点概览
   - 交通指南
   - 游玩路线
   - 住宿推荐
   - 美食攻略
   - 实用贴士
   - 精彩图集
   - 用户评论（静态占位）
5. 底部：上一篇/下一篇景点切换
6. Footer

### 景点列表页（SpotList.vue）
1. Navbar
2. 页面标题
3. 左侧筛选栏（按类型/省份筛选）
4. 右侧景点卡片列表
5. Footer

## 响应式策略

| 断点 | 屏幕宽度 | 布局 |
|------|----------|------|
| mobile | < 640px | 单列，汉堡菜单 |
| tablet | 640px - 1024px | 双列，完整导航 |
| desktop | > 1024px | 三列，完整导航 |

## 性能优化

- 图片懒加载（Intersection Observer）
- 路由懒加载（Vue Router `defineAsyncComponent`）
- 首屏关键 CSS 内联
- 生产环境开启 gzip 压缩
- 使用 WebP 格式图片（Unsplash 支持）

## 二期规划（不在本期范围）

- 后端 API（.NET 8 + MySQL）
- 用户注册/登录（JWT）
- 真实评论功能
- 后台管理系统
- UGC 用户生成内容
