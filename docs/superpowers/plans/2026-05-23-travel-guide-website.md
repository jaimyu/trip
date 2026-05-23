# 旅行攻略网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个包含 10 大热门景点的旅行攻略静态展示网站，包含首页轮播、分类筛选、攻略详情单栏长页面等功能。

**Architecture:** 纯前端静态站点，Vue 3 SPA + Vite 构建，景点数据硬编码在 JSON 文件中，通过 Pinia 管理状态、Vue Router 处理路由。清新自然风格设计，响应式布局。

**Tech Stack:** Vue 3 + Vite + TypeScript + Element Plus + Pinia + Vue Router + Tailwind CSS + SCSS

---

## 文件结构总览

### 新增文件

| 文件 | 用途 |
|------|------|
| `package.json` | 项目依赖和脚本 |
| `vite.config.ts` | Vite 构建配置 |
| `tsconfig.json` | TypeScript 编译配置 |
| `tsconfig.node.json` | Node 环境 TS 配置 |
| `tailwind.config.js` | Tailwind 配置 |
| `postcss.config.js` | PostCSS 配置 |
| `index.html` | 入口 HTML |
| `src/main.ts` | Vue 应用入口 |
| `src/App.vue` | 根组件 |
| `src/types/spot.ts` | TypeScript 类型定义 |
| `src/data/spots.json` | 10 个景点的静态数据 |
| `src/stores/spots.ts` | Pinia store（景点数据、筛选逻辑） |
| `src/router/index.ts` | Vue Router 路由配置 |
| `src/assets/styles/variables.scss` | SCSS 配色变量 |
| `src/assets/styles/main.scss` | 全局样式入口 |
| `src/components/Navbar.vue` | 顶部导航栏 |
| `src/components/Footer.vue` | 页脚 |
| `src/components/SpotCard.vue` | 景点卡片 |
| `src/components/HeroBanner.vue` | 首页轮播 |
| `src/components/AnchorNav.vue` | 锚点导航 |
| `src/components/ImageGallery.vue` | 图集组件 |
| `src/components/CommentSection.vue` | 评论区（静态占位） |
| `src/views/Home.vue` | 首页 |
| `src/views/SpotList.vue` | 景点列表页 |
| `src/views/SpotDetail.vue` | 攻略详情页 |

### 修改文件

| 文件 | 用途 |
|------|------|
| `.gitignore` | 添加 node_modules、dist 等忽略项 |
| `README.md` | 更新为项目说明 |

---

## Task 1: 项目脚手架

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `.gitignore`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "trip",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.5.0",
    "pinia": "^2.3.0",
    "element-plus": "^2.9.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "vite": "^6.2.0",
    "vue-tsc": "^2.2.0",
    "typescript": "~5.7.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.0",
    "autoprefixer": "^10.4.20",
    "sass": "^1.83.0"
  }
}
```

- [ ] **Step 2: 创建 vite.config.ts**

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 3: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: 创建 tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4a90d9",
        accent: "#66bb6a",
        teal: "#26a69a",
        bg: "#f8fafb",
        "text-main": "#333",
        "text-secondary": "#666",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: 创建 postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 7: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>旅行攻略 - 发现你的下一段旅程</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 8: 创建 .gitignore**

```
node_modules
dist
.superpowers
*.local
```

- [ ] **Step 9: 安装依赖并提交**

```bash
cd /d/codes/demo03/trip && npm install
git add package.json vite.config.ts tsconfig.json tsconfig.node.json tailwind.config.js postcss.config.js index.html .gitignore package-lock.json
git commit -m "chore: 初始化 Vue 3 + Vite 项目脚手架"
```

---

## Task 2: 类型定义与景点数据

**Files:**
- Create: `src/types/spot.ts`
- Create: `src/data/spots.json`

- [ ] **Step 1: 创建 src/types/spot.ts**

```ts
export interface Spot {
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

export interface RoutePlan {
  title: string;
  type: string;
  steps: string[];
}

export interface Hotel {
  name: string;
  level: "high" | "mid" | "low";
  price: string;
  description: string;
}

export interface Food {
  name: string;
  description: string;
  restaurant: string;
  price: string;
}

export type SpotType = Spot["type"];
```

- [ ] **Step 2: 创建 src/data/spots.json**

创建包含 10 个景点完整数据的 JSON 文件。以下为数据结构模板，每个景点按此格式填充：

```json
[
  {
    "id": "forbidden-city",
    "name": "故宫",
    "province": "北京",
    "type": "history",
    "cover": "https://images.unsplash.com/photo-1584646058383-aa4c6eb74e89?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "中国明清两代的皇家宫殿，世界上现存规模最大的木质结构古建筑群。",
    "overview": {
      "description": "北京故宫，又称紫禁城，是中国明清两朝24位皇帝的皇宫，也是世界上现存规模最大、保存最为完整的木质结构古建筑之一。故宫占地面积72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。1987年被列为世界文化遗产。",
      "openTime": "旺季（4-10月）8:30-17:00；淡季（11-3月）8:30-16:30（周一闭馆）",
      "ticket": "旺季60元/人，淡季40元/人",
      "duration": "半天至一天",
      "bestSeason": "春季（4-5月）和秋季（9-10月）"
    },
    "transport": {
      "flights": ["乘飞机至北京首都国际机场/大兴国际机场，转地铁至天安门东站"],
      "local": "地铁1号线天安门东站；公交1、2、52、82路等至天安门站",
      "parking": "周边有南池子大街停车场，收费标准约6元/小时"
    },
    "routes": [
      {
        "title": "经典半日游",
        "type": "1日游",
        "steps": [
          "天安门广场 → 午门（正门入口）",
          "太和殿 → 中和殿 → 保和殿（三大殿）",
          "乾清宫 → 交泰殿 → 坤宁宫（后三宫）",
          "御花园 → 神武门（出口）"
        ]
      },
      {
        "title": "深度一日游",
        "type": "1日游",
        "steps": [
          "上午：中轴线三大殿 + 后三宫",
          "下午：东六宫 → 钟表馆 → 珍宝馆",
          "傍晚：景山公园俯瞰故宫全景"
        ]
      }
    ],
    "hotels": [
      {
        "name": "北京饭店（王府井店）",
        "level": "high",
        "price": "800-1500元/晚",
        "description": "距故宫约1公里，历史悠久，服务一流"
      },
      {
        "name": "红墙花园酒店",
        "level": "mid",
        "price": "400-600元/晚",
        "description": "位于南池子大街，步行可达故宫"
      },
      {
        "name": "天安门周边青年旅舍",
        "level": "low",
        "price": "80-150元/晚",
        "description": "经济实惠，适合背包客"
      }
    ],
    "foods": [
      {
        "name": "老北京炸酱面",
        "description": "最具代表性的北京传统面食，酱香浓郁",
        "restaurant": "海碗居（鼓楼店）",
        "price": "人均30-50元"
      },
      {
        "name": "北京烤鸭",
        "description": "皮脆肉嫩，享誉世界的名菜",
        "restaurant": "全聚德（和平门店）",
        "price": "人均150-250元"
      },
      {
        "name": "豆汁焦圈",
        "description": "老北京经典早餐组合",
        "restaurant": "护国寺小吃",
        "price": "人均10-20元"
      }
    ],
    "tips": [
      "务必提前在官网预约门票，现场不售票",
      "建议穿舒适的步行鞋，故宫面积很大",
      "携带身份证，入园需核验",
      "学生、老人凭证件可享半价优惠",
      "避开节假日高峰，体验更好",
      "夏季注意防晒，冬季注意保暖"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1584646058383-aa4c6eb74e89?w=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6b00e37c35?w=600&fit=crop",
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop"
    ]
  },
  {
    "id": "great-wall",
    "name": "长城（八达岭）",
    "province": "北京",
    "type": "history",
    "cover": "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "万里长城的精华地段，雄伟壮观，世界文化遗产。",
    "overview": {
      "description": "八达岭长城是万里长城中最具代表性的一段，也是保存最为完好、最雄伟壮观的一段。建于明代，全长约7600米，共有敌楼43座。1987年被列为世界文化遗产，每年吸引数百万游客前来参观。",
      "openTime": "旺季（4-10月）6:30-19:00；淡季（11-3月）7:30-18:00",
      "ticket": "旺季40元/人，淡季35元/人",
      "duration": "半天至一天",
      "bestSeason": "春季（4-5月）和秋季（9-10月），避开夏季高温和冬季严寒"
    },
    "transport": {
      "flights": ["乘飞机至北京，转乘高铁至八达岭长城站（约20分钟）"],
      "local": "德胜门乘919路公交车；或在地铁积水潭站乘旅游专线巴士",
      "parking": "景区设有大型停车场，小型车10元/次"
    },
    "routes": [
      {
        "title": "经典半日游",
        "type": "1日游",
        "steps": [
          "北一楼 → 北二楼 → 北三楼（好汉坡）",
          "北四楼 → 北八楼（最高点，海拔888米）",
          "原路返回或从南线下山"
        ]
      },
      {
        "title": "南北线深度游",
        "type": "1日游",
        "steps": [
          "上午：北线攀登至北八楼",
          "下午：南线游览，人少景美",
          "傍晚：长城博物馆"
        ]
      }
    ],
    "hotels": [
      {
        "name": "八达岭饭店",
        "level": "high",
        "price": "400-700元/晚",
        "description": "景区附近，方便早起登长城"
      },
      {
        "name": "延庆城区快捷酒店",
        "level": "mid",
        "price": "200-350元/晚",
        "description": "性价比高，车程30分钟到景区"
      },
      {
        "name": "长城脚下农家院",
        "level": "low",
        "price": "80-150元/晚",
        "description": "体验农家风情，价格实惠"
      }
    ],
    "foods": [
      {
        "name": "延庆火勺",
        "description": "延庆特色面食，外酥里嫩",
        "restaurant": "景区周边农家院",
        "price": "人均15-25元"
      },
      {
        "name": "贴饼子小鱼",
        "description": "延庆农家菜经典",
        "restaurant": "柳沟民俗村",
        "price": "人均40-60元"
      }
    ],
    "tips": [
      "建议早到避开人流高峰",
      "穿防滑运动鞋，部分路段较陡",
      "携带足够的水和零食，山上价格较高",
      "夏季做好防晒，冬季注意防风保暖",
      "量力而行，不必强求到达最高点",
      "缆车单程100元/人，可节省体力"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&fit=crop",
      "https://images.unsplash.com/photo-1529921879376-f84814bc0bf1?w=600&fit=crop",
      "https://images.unsplash.com/photo-1584646058383-aa4c6eb74e89?w=600&fit=crop"
    ]
  },
  {
    "id": "west-lake",
    "name": "西湖",
    "province": "浙江·杭州",
    "type": "nature",
    "cover": "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "人间天堂，淡妆浓抹总相宜的江南名湖。",
    "overview": {
      "description": "杭州西湖位于杭州市中心，是中国最著名的淡水湖之一，也是世界文化遗产。西湖三面环山，面积约6.39平方公里，以'西湖十景'闻名天下。这里有苏堤春晓、断桥残雪、雷峰夕照等经典景观，自古以来就是文人墨客的灵感之源。",
      "openTime": "全天开放（部分景点有单独开放时间）",
      "ticket": "免费（部分景点如雷峰塔40元、灵隐寺75元）",
      "duration": "一天至两天",
      "bestSeason": "春季（3-5月）最佳，桃花盛开；秋季（9-11月）也宜游览"
    },
    "transport": {
      "flights": ["乘飞机至杭州萧山国际机场，转地铁1号线至龙翔桥站"],
      "local": "地铁1号线龙翔桥站/凤起路站；环湖公交Y1-Y9线",
      "parking": "环湖有多个停车场，收费标准约5-10元/小时"
    },
    "routes": [
      {
        "title": "西湖经典一日游",
        "type": "1日游",
        "steps": [
          "上午：断桥 → 白堤 → 平湖秋月 → 孤山",
          "中午：楼外楼用餐（西湖醋鱼、东坡肉）",
          "下午：苏堤春晓 → 花港观鱼 → 雷峰塔",
          "傍晚：音乐喷泉（晚19:00）"
        ]
      },
      {
        "title": "西湖两日深度游",
        "type": "2日游",
        "steps": [
          "Day1：环湖精华游（断桥-苏堤-雷峰塔）",
          "Day2：灵隐寺 → 龙井村 → 宋城"
        ]
      }
    ],
    "hotels": [
      {
        "name": "西湖国宾馆",
        "level": "high",
        "price": "1200-2500元/晚",
        "description": "坐落于西湖南岸，园林式酒店，环境绝佳"
      },
      {
        "name": "杭州城中香格里拉",
        "level": "mid",
        "price": "600-900元/晚",
        "description": "交通便利，步行可达西湖"
      },
      {
        "name": "西湖周边青年旅舍",
        "level": "low",
        "price": "60-120元/晚",
        "description": "经济实惠，氛围轻松"
      }
    ],
    "foods": [
      {
        "name": "西湖醋鱼",
        "description": "杭州名菜，鲜嫩酸甜",
        "restaurant": "楼外楼（孤山路）",
        "price": "人均100-150元"
      },
      {
        "name": "东坡肉",
        "description": "肥而不腻，入口即化",
        "restaurant": "知味观",
        "price": "人均80-120元"
      },
      {
        "name": "龙井虾仁",
        "description": "用西湖龙井茶叶炒制的河虾仁",
        "restaurant": "绿茶餐厅",
        "price": "人均60-100元"
      }
    ],
    "tips": [
      "西湖免费，建议花一整天环湖游览",
      "可租自行车环湖，租金约20-30元/小时",
      "断桥和苏堤是最佳拍照地点",
      "雨天的西湖别有一番风味",
      "节假日人流量大，建议错峰出行",
      "西湖音乐喷泉每晚19:00和20:00各一场"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6b00e37c35?w=600&fit=crop",
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&fit=crop"
    ]
  },
  {
    "id": "terracotta-army",
    "name": "兵马俑",
    "province": "陕西·西安",
    "type": "history",
    "cover": "https://images.unsplash.com/photo-1598886221071-51ed4a1e12cf?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "秦始皇陵兵马俑，世界第八大奇迹。",
    "overview": {
      "description": "秦始皇兵马俑博物馆位于西安市临潼区，是秦始皇陵的陪葬坑。1974年被发现以来，已发掘出三个俑坑，出土陶俑、陶马8000余件，每件俑的面部表情各不相同。被誉为'世界第八大奇迹'，1987年被列为世界文化遗产。",
      "openTime": "3月-11月 8:30-18:00；12月-2月 8:30-17:30",
      "ticket": "120元/人（含秦始皇陵）",
      "duration": "半天至一天",
      "bestSeason": "春季（3-5月）和秋季（9-11月）"
    },
    "transport": {
      "flights": ["乘飞机至西安咸阳国际机场，转大巴至兵马俑（约1.5小时）"],
      "local": "西安火车站东广场乘306路（游5路）至兵马俑，约1小时",
      "parking": "景区有大型停车场，小型车20元/次"
    },
    "routes": [
      {
        "title": "兵马俑半日游",
        "type": "1日游",
        "steps": [
          "一号坑（最大最壮观）",
          "二号坑（兵种最全）",
          "三号坑（指挥部）",
          "铜车马展厅"
        ]
      }
    ],
    "hotels": [
      {
        "name": "西安索菲特传奇酒店",
        "level": "high",
        "price": "700-1200元/晚",
        "description": "市中心，交通便利，法式奢华"
      },
      {
        "name": "钟楼附近商务酒店",
        "level": "mid",
        "price": "250-450元/晚",
        "description": "靠近钟楼商圈，吃喝玩乐方便"
      },
      {
        "name": "回民街青年旅舍",
        "level": "low",
        "price": "50-100元/晚",
        "description": "紧邻回民街，美食环绕"
      }
    ],
    "foods": [
      {
        "name": "肉夹馍",
        "description": "西安最经典的小吃，酥脆的馍配上腊汁肉",
        "restaurant": "樊记腊汁肉夹馍",
        "price": "人均15-25元"
      },
      {
        "name": "羊肉泡馍",
        "description": "西安传统名吃，汤浓肉烂",
        "restaurant": "同盛祥",
        "price": "人均30-50元"
      },
      {
        "name": "凉皮",
        "description": "酸辣爽口，夏日必吃",
        "restaurant": "魏家凉皮",
        "price": "人均10-20元"
      }
    ],
    "tips": [
      "建议请一位讲解员（约100元），否则看不懂历史背景",
      "一号坑人最多，建议一早入场",
      "景区内禁止使用闪光灯拍照",
      "注意辨别景区内真假纪念品商店",
      "可和秦始皇陵、华清池安排在同一天游览"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1598886221071-5ed4a1e12cf?w=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6b00e37c35?w=600&fit=crop",
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&fit=crop"
    ]
  },
  {
    "id": "zhangjiajie",
    "name": "张家界国家森林公园",
    "province": "湖南",
    "type": "nature",
    "cover": "https://images.unsplash.com/photo-1513415756790-2ac831f9bedf?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "阿凡达取景地，奇峰三千，秀水八百。",
    "overview": {
      "description": "张家界国家森林公园是中国第一个国家森林公园，以独特的石英砂岩峰林地貌闻名于世，被誉为'缩小的仙境，放大的盆景'。电影《阿凡达》中哈利路亚山的原型就取自这里的南天一柱。公园内有3000多座石英砂岩柱和峰，最高的达400多米。",
      "openTime": "7:00-18:00（旺季）；8:00-17:30（淡季）",
      "ticket": "225元/人（含环保车，4天有效）",
      "duration": "2-3天",
      "bestSeason": "春秋两季最佳（4-5月、9-11月），雨后云海壮观"
    },
    "transport": {
      "flights": ["乘飞机至张家界荷花机场，打车至市区约20分钟"],
      "local": "张家界市区乘旅游大巴至森林公园门票站，约40分钟",
      "parking": "各门票站均有停车场，约30元/天"
    },
    "routes": [
      {
        "title": "经典两日游",
        "type": "2日游",
        "steps": [
          "Day1：袁家界（阿凡达取景地）→ 杨家界 → 天子山",
          "Day2：金鞭溪 → 十里画廊 → 黄龙洞"
        ]
      },
      {
        "title": "深度三日游",
        "type": "3日游",
        "steps": [
          "Day1：袁家界 + 天子山",
          "Day2：天门山（玻璃栈道）",
          "Day3：大峡谷（玻璃桥）+ 金鞭溪"
        ]
      }
    ],
    "hotels": [
      {
        "name": "纳柏酒店（武陵源店）",
        "level": "high",
        "price": "500-800元/晚",
        "description": "武陵源区，距景区入口近"
      },
      {
        "name": "张家界京武铂尔曼酒店",
        "level": "mid",
        "price": "350-550元/晚",
        "description": "四星级，设施完善"
      },
      {
        "name": "武陵源背包客栈",
        "level": "low",
        "price": "50-100元/晚",
        "description": "经济实惠，老板热情"
      }
    ],
    "foods": [
      {
        "name": "土家三下锅",
        "description": "张家界特色菜，肥肠+猪肚+牛肚合炒",
        "restaurant": "银满斗火锅店",
        "price": "人均50-80元"
      },
      {
        "name": "岩耳炖土鸡",
        "description": "山珍土鸡汤，滋补养生",
        "restaurant": "天子山农家菜",
        "price": "人均40-60元"
      }
    ],
    "tips": [
      "门票4天有效，合理安排行程",
      "山上天气多变，携带雨具",
      "穿防滑登山鞋，部分路段陡峭",
      "天子山索道单程67元，可节省体力",
      "旺季住宿紧张，建议提前预订",
      "小心猴子，不要随身携带食物"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1513415756790-2ac831f9bedf?w=600&fit=crop",
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6b00e37c35?w=600&fit=crop"
    ]
  },
  {
    "id": "jiuzhaigou",
    "name": "九寨沟",
    "province": "四川",
    "type": "nature",
    "cover": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "九寨归来不看水，童话般的人间仙境。",
    "overview": {
      "description": "九寨沟位于四川省阿坝藏族羌族自治州，以翠海、叠瀑、彩林、雪峰、藏情'五绝'闻名于世。沟内有108个高山湖泊（海子），水色碧蓝澄澈，被誉为'九寨归来不看水'。1992年被列入世界自然遗产。2017年地震后经过修复，目前已全面对外开放。",
      "openTime": "4月-11月 7:30-17:00；12月-3月 8:30-16:30",
      "ticket": "旺季（4-11月）169元+观光车90元；淡季（12-3月）80元+观光车80元",
      "duration": "1-2天",
      "bestSeason": "秋季（10月中下旬）彩林最为壮观"
    },
    "transport": {
      "flights": ["乘飞机至九寨沟黄龙机场（九黄机场），转乘大巴至沟口约1.5小时"],
      "local": "成都新南门汽车站乘大巴至九寨沟沟口，约8小时",
      "parking": "沟口有大型停车场，约30元/天"
    },
    "routes": [
      {
        "title": "九寨沟一日游",
        "type": "1日游",
        "steps": [
          "上午：日则沟（五花海 → 珍珠滩瀑布 → 箭竹海）",
          "下午：则查洼沟（长海 → 五彩池）",
          "傍晚：树正沟（树正群海 → 火花海）"
        ]
      }
    ],
    "hotels": [
      {
        "name": "九寨天堂洲际大饭店",
        "level": "high",
        "price": "800-1500元/晚",
        "description": "沟口附近，豪华度假体验"
      },
      {
        "name": "九寨沟沟口商务酒店",
        "level": "mid",
        "price": "200-400元/晚",
        "description": "步行可达景区入口"
      },
      {
        "name": "沟口藏式客栈",
        "level": "low",
        "price": "80-150元/晚",
        "description": "体验藏族风情"
      }
    ],
    "foods": [
      {
        "name": "牦牛肉火锅",
        "description": "九寨沟特色美食，鲜香麻辣",
        "restaurant": "沟口藏餐吧",
        "price": "人均60-100元"
      },
      {
        "name": "酥油茶+糌粑",
        "description": "藏族传统主食",
        "restaurant": "沟口藏家小院",
        "price": "人均20-40元"
      }
    ],
    "tips": [
      "观光车必买，景区太大步行不现实",
      "秋季为旺季，务必提前订票订房",
      "海拔2000-3000米，注意防高反",
      "景区内有餐厅，价格略贵可自带干粮",
      "早晚温差大，即使是夏天也要带外套",
      "五彩池在则查洼沟最高点，不要错过"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&fit=crop",
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop",
      "https://images.unsplash.com/photo-1513415756790-2ac831f9bedf?w=600&fit=crop"
    ]
  },
  {
    "id": "lijiang",
    "name": "丽江古城",
    "province": "云南",
    "type": "mixed",
    "cover": "https://images.unsplash.com/photo-1585016495481-916139aa38ee?w=800&h=450&fit=crop",
    "rating": 4,
    "summary": "东方威尼斯，纳西文化的活化石。",
    "overview": {
      "description": "丽江古城位于云南省丽江市，始建于宋末元初，是中国保存最为完好的四大古城之一。古城没有城墙，以四方街为中心，街道依山傍水而建，用红色角砾石铺就。2003年被列为世界文化遗产。这里有纳西族的东巴文化、独特的水系、古朴的石桥，以及令人向往的慢生活。",
      "openTime": "全天开放（古城维护费查验时间 8:30-19:00）",
      "ticket": "古城维护费50元/人（部分情况可不查）",
      "duration": "2-3天",
      "bestSeason": "全年适宜，最佳为春季（3-5月）和秋季（9-11月）"
    },
    "transport": {
      "flights": ["乘飞机至丽江三义机场，机场大巴至古城约40分钟"],
      "local": "古城内步行即可；去束河/白沙可乘出租车",
      "parking": "古城外有多个停车场，约20元/天"
    },
    "routes": [
      {
        "title": "丽江经典两日游",
        "type": "2日游",
        "steps": [
          "Day1：丽江古城（四方街 → 大水车 → 木府 → 万古楼）",
          "Day2：束河古镇 → 白沙壁画 → 玉龙雪山"
        ]
      }
    ],
    "hotels": [
      {
        "name": "丽江悦榕庄",
        "level": "high",
        "price": "1500-3000元/晚",
        "description": "顶级度假酒店，可远眺玉龙雪山"
      },
      {
        "name": "古城内特色客栈",
        "level": "mid",
        "price": "300-600元/晚",
        "description": "纳西风格庭院客栈，体验古城生活"
      },
      {
        "name": "古城周边青年旅舍",
        "level": "low",
        "price": "40-80元/晚",
        "description": "氛围好，适合独自旅行者"
      }
    ],
    "foods": [
      {
        "name": "腊排骨火锅",
        "description": "丽江最有特色的地方美食",
        "restaurant": "阿妈意纳西饮食院",
        "price": "人均60-90元"
      },
      {
        "name": "鸡豆凉粉",
        "description": "纳西族传统小吃，酸辣开胃",
        "restaurant": "古城四方街",
        "price": "人均10-15元"
      },
      {
        "name": "酥油茶+纳西粑粑",
        "description": "纳西族传统早餐",
        "restaurant": "古城内各客栈",
        "price": "人均15-25元"
      }
    ],
    "tips": [
      "古城内石板路多，不要带太大的行李箱",
      "防晒很重要，紫外线很强",
      "古城维护费可以避开，但去玉龙雪山会查",
      "商业化的古城也有安静的巷子值得探索",
      "去玉龙雪山建议提前一天买索道票",
      "海拔2400米，初到不要剧烈运动"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1585016495481-916139aa38ee?w=600&fit=crop",
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6b00e37c35?w=600&fit=crop"
    ]
  },
  {
    "id": "guilin",
    "name": "桂林山水（阳朔）",
    "province": "广西",
    "type": "nature",
    "cover": "https://images.unsplash.com/photo-1537531383496-f4749bfa8061?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "桂林山水甲天下，阳朔山水甲桂林。",
    "overview": {
      "description": "桂林山水以'山青、水秀、洞奇、石美'四绝闻名，是中国喀斯特地貌的典型代表。从桂林到阳朔的漓江两岸，奇峰夹岸、碧水萦回，如诗如画。阳朔则是精华所在，十里画廊、遇龙河、西街等景点各具特色。20元人民背面的图案就是漓江山水。",
      "openTime": "全天开放（游船8:00-15:00）",
      "ticket": "漓江游船215元/人；阳朔十里画廊免费",
      "duration": "2-3天",
      "bestSeason": "4-10月最佳，雨季水汽氤氲更有意境"
    },
    "transport": {
      "flights": ["乘飞机至桂林两江国际机场，大巴至市区约40分钟"],
      "local": "桂林乘游船至阳朔（约4小时）；或乘大巴至阳朔（约1.5小时）",
      "parking": "阳朔县城有停车场，约10元/天"
    },
    "routes": [
      {
        "title": "桂林阳朔经典三日游",
        "type": "3日游",
        "steps": [
          "Day1：桂林市区（象鼻山 → 两江四湖夜景）",
          "Day2：漓江游船至阳朔（沿途九马画山、黄布倒影）",
          "Day3：阳朔十里画廊骑行 → 遇龙河漂流 → 西街夜游"
        ]
      }
    ],
    "hotels": [
      {
        "name": "阳朔悦榕庄",
        "level": "high",
        "price": "1000-2000元/晚",
        "description": "漓江边的顶级度假酒店"
      },
      {
        "name": "阳朔西街周边民宿",
        "level": "mid",
        "price": "200-400元/晚",
        "description": "位置便利，风格各异"
      },
      {
        "name": "遇龙河畔农家客栈",
        "level": "low",
        "price": "60-120元/晚",
        "description": "田园风光，安静惬意"
      }
    ],
    "foods": [
      {
        "name": "桂林米粉",
        "description": "桂林最经典的小吃，爽滑爽口",
        "restaurant": "崇善米粉（市中心）",
        "price": "人均10-15元"
      },
      {
        "name": "啤酒鱼",
        "description": "阳朔名菜，漓江鲜鱼+啤酒烹制",
        "restaurant": "谢大姐啤酒鱼（西街）",
        "price": "人均60-100元"
      },
      {
        "name": "田螺酿",
        "description": "阳朔特色菜，田螺肉+猪肉馅塞回螺壳蒸制",
        "restaurant": "阳朔大排档",
        "price": "人均30-50元"
      }
    ],
    "tips": [
      "20元人民币背面取景地在兴坪古镇",
      "漓江游船建议提前网上订票",
      "阳朔租自行车约10-20元/天，骑行十里画廊",
      "遇龙河竹筏漂流约100元/人，比漓江更原生态",
      "西街酒吧夜生活丰富但比较嘈杂",
      "注意防晒，广西紫外线很强"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1537531383496-f4749bfa8061?w=600&fit=crop",
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop",
      "https://images.unsplash.com/photo-1513415756790-2ac831f9bedf?w=600&fit=crop"
    ]
  },
  {
    "id": "huangshan",
    "name": "黄山",
    "province": "安徽",
    "type": "nature",
    "cover": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "五岳归来不看山，黄山归来不看岳。",
    "overview": {
      "description": "黄山位于安徽省南部，以奇松、怪石、云海、温泉'四绝'闻名于世，被誉为'天下第一奇山'。黄山有72座山峰，其中莲花峰海拔1864米为最高峰。明代旅行家徐霞客曾赞叹'五岳归来不看山，黄山归来不看岳'。1990年被列为世界文化与自然双重遗产。",
      "openTime": "旺季（3月-11月）6:00-17:30；淡季（12月-2月）7:00-16:30",
      "ticket": "旺季190元/人，淡季150元/人；索道单程约80-100元",
      "duration": "1-2天",
      "bestSeason": "四季皆宜，冬季雪景和云海尤为壮观"
    },
    "transport": {
      "flights": ["乘飞机至黄山屯溪机场，大巴至汤口镇约1小时"],
      "local": "黄山市乘大巴至汤口镇（黄山南大门），约1小时",
      "parking": "汤口镇有多个停车场，约30-50元/天"
    },
    "routes": [
      {
        "title": "黄山经典一日游",
        "type": "1日游",
        "steps": [
          "云谷索道上山 → 始信峰 → 狮子峰",
          "光明顶 → 飞来石 → 排云亭",
          "西海大峡谷 → 云谷索道下山"
        ]
      },
      {
        "title": "黄山两日游（山顶住宿）",
        "type": "2日游",
        "steps": [
          "Day1：玉屏索道 → 迎客松 → 莲花峰 → 光明顶看日落",
          "Day2：光明顶看日出 → 西海大峡谷 → 云谷索道下山"
        ]
      }
    ],
    "hotels": [
      {
        "name": "黄山白云宾馆（山顶）",
        "level": "high",
        "price": "800-1500元/晚",
        "description": "山顶住宿，方便看日出日落"
      },
      {
        "name": "汤口镇酒店",
        "level": "mid",
        "price": "200-400元/晚",
        "description": "山脚住宿，性价比高"
      },
      {
        "name": "山顶帐篷露营",
        "level": "low",
        "price": "100-200元/晚",
        "description": "经济实惠，体验独特（旺季开放）"
      }
    ],
    "foods": [
      {
        "name": "黄山毛豆腐",
        "description": "徽州特色小吃，发酵后煎炸",
        "restaurant": "汤口镇小吃店",
        "price": "人均10-15元"
      },
      {
        "name": "臭鳜鱼",
        "description": "徽菜名菜，闻着臭吃着香",
        "restaurant": "徽商人家",
        "price": "人均60-100元"
      }
    ],
    "tips": [
      "建议在山顶住一晚，日出云海不可错过",
      "山顶住宿紧张，旺季需提前一个月预订",
      "自带干粮，山上物价很高（一瓶水10元）",
      "雨天路滑，携带登山杖更省力",
      "冬季看冰挂和雪景需穿防滑钉鞋",
      "西海大峡谷是黄山最精华的景点，不要跳过"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&fit=crop",
      "https://images.unsplash.com/photo-1513415756790-2ac831f9bedf?w=600&fit=crop",
      "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=600&fit=crop"
    ]
  },
  {
    "id": "potala-palace",
    "name": "布达拉宫",
    "province": "西藏·拉萨",
    "type": "history",
    "cover": "https://images.unsplash.com/photo-1606139195065-19d4b4e1f442?w=800&h=450&fit=crop",
    "rating": 5,
    "summary": "世界屋脊上的圣殿，藏传佛教的圣地。",
    "overview": {
      "description": "布达拉宫坐落于西藏拉萨红山之上，海拔3700米，是世界上海拔最高的古代宫殿。始建于公元7世纪，现存建筑主要为17世纪重建。布达拉宫高117米，东西长360米，共13层，集宫殿、城堡、寺院于一体。宫内珍藏大量佛像、壁画、经书等文物。1994年被列为世界文化遗产。",
      "openTime": "9:00-16:00（参观需提前预约，限时1小时）",
      "ticket": "旺季（5-10月）200元/人，淡季（11-4月）100元/人",
      "duration": "半天",
      "bestSeason": "5-10月（含氧量较高，气候温和）"
    },
    "transport": {
      "flights": ["乘飞机至拉萨贡嘎机场，机场大巴至市区约1小时"],
      "local": "拉萨市区步行或乘公交至布达拉宫；或打车至布达拉宫广场",
      "parking": "布达拉宫广场地下停车场，约5元/小时"
    },
    "routes": [
      {
        "title": "拉萨经典一日游",
        "type": "1日游",
        "steps": [
          "上午：布达拉宫（提前预约门票）",
          "中午：八廓街周边用餐",
          "下午：大昭寺 → 八廓街 → 色拉寺（辩经15:00）"
        ]
      }
    ],
    "hotels": [
      {
        "name": "拉萨瑞吉度假酒店",
        "level": "high",
        "price": "1200-2500元/晚",
        "description": "可远眺布达拉宫，设施顶级"
      },
      {
        "name": "八廓街周边藏式酒店",
        "level": "mid",
        "price": "300-600元/晚",
        "description": "藏式风格，位置便利"
      },
      {
        "name": "平措康桑青年旅舍",
        "level": "low",
        "price": "50-100元/晚",
        "description": "拉萨最知名的青旅，氛围好"
      }
    ],
    "foods": [
      {
        "name": "酥油茶",
        "description": "藏族传统饮品，缓解高反",
        "restaurant": "八廓街周边藏餐馆",
        "price": "人均10-20元"
      },
      {
        "name": "糌粑",
        "description": "藏族主食，青稞粉+酥油茶捏成团",
        "restaurant": "玛吉阿米餐厅",
        "price": "人均30-50元"
      },
      {
        "name": "牦牛酸奶",
        "description": "浓郁醇厚，西藏特色甜品",
        "restaurant": "八廓街小吃摊",
        "price": "人均10-15元"
      }
    ],
    "tips": [
      "提前1-3天在'布达拉宫票务'微信公众号预约",
      "初到拉萨不要洗澡，避免高反加重",
      "参观限时1小时，不能拍照",
      "穿着得体，不能穿短裙、无袖上衣入内",
      "到达西藏后第一天不要剧烈运动",
      "建议喝酥油茶，有助于缓解高原反应"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1606139195065-19d4b4e1f442?w=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6b00e37c35?w=600&fit=crop",
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=600&fit=crop"
    ]
  }
]
```

- [ ] **Step 2: 提交**

```bash
git add src/types/spot.ts src/data/spots.json
git commit -m "feat: 添加景点类型定义和 10 大景点静态数据"
```

---

## Task 3: Pinia Store

**Files:**
- Create: `src/stores/spots.ts`

- [ ] **Step 1: 创建 src/stores/spots.ts**

```ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Spot, SpotType } from "@/types/spot";
import spotsData from "@/data/spots.json";

export const useSpotsStore = defineStore("spots", () => {
  const spots = ref<Spot[]>(spotsData as Spot[]);
  const selectedType = ref<SpotType | "all">("all");
  const searchQuery = ref("");

  const filteredSpots = computed(() => {
    return spots.value.filter((spot) => {
      const matchType =
        selectedType.value === "all" || spot.type === selectedType.value;
      const matchSearch =
        !searchQuery.value ||
        spot.name.includes(searchQuery.value) ||
        spot.province.includes(searchQuery.value) ||
        spot.summary.includes(searchQuery.value);
      return matchType && matchSearch;
    });
  });

  function getSpotById(id: string): Spot | undefined {
    return spots.value.find((spot) => spot.id === id);
  }

  function getSpotIndex(id: string): number {
    return spots.value.findIndex((spot) => spot.id === id);
  }

  function getPrevSpot(id: string): Spot | undefined {
    const index = getSpotIndex(id);
    if (index <= 0) return undefined;
    return spots.value[index - 1];
  }

  function getNextSpot(id: string): Spot | undefined {
    const index = getSpotIndex(id);
    if (index >= spots.value.length - 1) return undefined;
    return spots.value[index + 1];
  }

  function setType(type: SpotType | "all") {
    selectedType.value = type;
  }

  function setSearch(query: string) {
    searchQuery.value = query;
  }

  return {
    spots,
    selectedType,
    searchQuery,
    filteredSpots,
    getSpotById,
    getPrevSpot,
    getNextSpot,
    setType,
    setSearch,
  };
});
```

- [ ] **Step 2: 提交**

```bash
git add src/stores/spots.ts
git commit -m "feat: 添加 Pinia store 管理景点数据和筛选逻辑"
```

---

## Task 4: 路由配置与全局入口

**Files:**
- Create: `src/router/index.ts`
- Create: `src/main.ts`
- Create: `src/App.vue`

- [ ] **Step 1: 创建 src/router/index.ts**

```ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/spots",
      name: "spot-list",
      component: () => import("@/views/SpotList.vue"),
    },
    {
      path: "/spots/:id",
      name: "spot-detail",
      component: () => import("@/views/SpotDetail.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
```

- [ ] **Step 2: 创建 src/main.ts**

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/styles/main.scss";
import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
```

- [ ] **Step 3: 创建 src/App.vue**

```vue
<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafb;
}

.main-content {
  flex: 1;
  padding-top: 60px;
}
</style>
```

- [ ] **Step 4: 提交**

```bash
git add src/router/index.ts src/main.ts src/App.vue
git commit -m "feat: 添加路由配置、应用入口和根组件"
```

---

## Task 5: 全局样式

**Files:**
- Create: `src/assets/styles/variables.scss`
- Create: `src/assets/styles/main.scss`

- [ ] **Step 1: 创建 src/assets/styles/variables.scss**

```scss
$color-primary: #4a90d9;
$color-accent: #66bb6a;
$color-teal: #26a69a;
$color-bg: #f8fafb;
$color-text-main: #333;
$color-text-secondary: #666;
$color-white: #fff;
$radius-card: 12px;
$radius-btn: 8px;
$shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08);
$shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
$container-max: 1200px;
```

- [ ] **Step 2: 创建 src/assets/styles/main.scss**

```scss
@use "./variables" as *;
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: $color-text-main;
  background-color: $color-bg;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  max-width: $container-max;
  margin: 0 auto;
  padding: 0 20px;
}
```

- [ ] **Step 3: 提交**

```bash
git add src/assets/styles/variables.scss src/assets/styles/main.scss
git commit -m "feat: 添加全局样式和 SCSS 配色变量"
```

---

## Task 6: Navbar + Footer 组件

**Files:**
- Create: `src/components/Navbar.vue`
- Create: `src/components/Footer.vue`

- [ ] **Step 1: 创建 src/components/Navbar.vue**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

function handleScroll() {
  scrolled.value = window.scrollY > 10;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="container navbar-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">旅行攻略</span>
      </RouterLink>

      <div class="nav-links" :class="{ open: mobileMenuOpen }">
        <RouterLink to="/" class="nav-link" @click="mobileMenuOpen = false">首页</RouterLink>
        <RouterLink to="/spots" class="nav-link" @click="mobileMenuOpen = false">攻略列表</RouterLink>
      </div>

      <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
  height: 60px;

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);
  }
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: $color-primary;

  .logo-icon {
    font-size: 24px;
  }
}

.nav-links {
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;

    &.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

.nav-link {
  font-size: 15px;
  color: $color-text-main;
  transition: color 0.2s;

  &:hover,
  &.router-link-active {
    color: $color-primary;
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: $color-text-main;
    transition: all 0.3s;
  }
}
</style>
```

- [ ] **Step 2: 创建 src/components/Footer.vue**

```vue
<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-section">
        <h3>🌿 旅行攻略</h3>
        <p>发现你的下一段旅程</p>
      </div>
      <div class="footer-section">
        <h4>关于我们</h4>
        <p>分享实用、详细的国内旅行攻略信息</p>
      </div>
      <div class="footer-section">
        <h4>联系我们</h4>
        <p>邮箱: hello@trip-guide.cn</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} 旅行攻略. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.footer {
  background: #2c3e50;
  color: #ccc;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 40px 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.footer-section h3 {
  color: $color-white;
  font-size: 18px;
  margin-bottom: 12px;
}

.footer-section h4 {
  color: $color-white;
  font-size: 15px;
  margin-bottom: 8px;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.8;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 20px;
  text-align: center;
  font-size: 13px;
}
</style>
```

- [ ] **Step 3: 提交**

```bash
git add src/components/Navbar.vue src/components/Footer.vue
git commit -m "feat: 添加顶部导航栏和页脚组件"
```

---

## Task 7: SpotCard + HeroBanner 组件

**Files:**
- Create: `src/components/SpotCard.vue`
- Create: `src/components/HeroBanner.vue`

- [ ] **Step 1: 创建 src/components/SpotCard.vue**

```vue
<script setup lang="ts">
import type { Spot } from "@/types/spot";

defineProps<{
  spot: Spot;
}>();
</script>

<template>
  <RouterLink :to="`/spots/${spot.id}`" class="spot-card">
    <div class="card-image-wrapper">
      <img :src="spot.cover" :alt="spot.name" class="card-image" loading="lazy" />
      <span class="type-badge" :class="spot.type">
        {{ spot.type === "nature" ? "自然风光" : spot.type === "history" ? "人文历史" : "人文+自然" }}
      </span>
    </div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">{{ spot.name }}</h3>
        <span class="province-tag">{{ spot.province }}</span>
      </div>
      <div class="rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= spot.rating }">★</span>
      </div>
      <p class="card-summary">{{ spot.summary }}</p>
      <button class="view-btn">查看攻略</button>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.spot-card {
  display: block;
  background: $color-white;
  border-radius: $radius-card;
  overflow: hidden;
  box-shadow: $shadow-card;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-card-hover;
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  .spot-card:hover & {
    transform: scale(1.05);
  }
}

.type-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;

  &.nature { background: $color-accent; }
  &.history { background: $color-primary; }
  &.mixed { background: $color-teal; }
}

.card-body {
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
}

.province-tag {
  font-size: 12px;
  color: $color-primary;
  background: rgba(74, 144, 217, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.rating {
  margin-bottom: 8px;
}

.star {
  color: #ddd;
  font-size: 14px;

  &.active {
    color: #f5a623;
  }
}

.card-summary {
  font-size: 13px;
  color: $color-text-secondary;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.view-btn {
  width: 100%;
  padding: 8px 0;
  background: $color-accent;
  color: #fff;
  border: none;
  border-radius: $radius-btn;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: darken($color-accent, 8%);
  }
}
</style>
```

- [ ] **Step 2: 创建 src/components/HeroBanner.vue**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1599571234909-29755c9f0118?w=1600&h=600&fit=crop",
    title: "发现你的下一段旅程",
    subtitle: "精选国内 10 大热门景点，为你提供最实用的旅行攻略",
  },
  {
    image: "https://images.unsplash.com/photo-1513415756790-2ac831f9bedf?w=1600&h=600&fit=crop",
    title: "奇峰三千，秀水八百",
    subtitle: "从张家界的仙境到九寨沟的碧水，每一处都值得铭记",
  },
  {
    image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=1600&h=600&fit=crop",
    title: "五千年的文明足迹",
    subtitle: "走进故宫、长城、兵马俑，感受中华文明的博大精深",
  },
];

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  current.value = (current.value + 1) % slides.length;
}

function prev() {
  current.value = (current.value - 1 + slides.length) % slides.length;
}

function startAutoPlay() {
  timer = setInterval(next, 5000);
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

onMounted(startAutoPlay);
onUnmounted(stopAutoPlay);
</script>

<template>
  <div class="hero-banner" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <TransitionGroup class="slides-container" tag="div">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="slide"
        v-show="index === current"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="overlay">
          <div class="content">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.subtitle }}</p>
            <RouterLink to="/spots" class="cta-btn">探索全部景点</RouterLink>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <button class="arrow arrow-left" @click="prev">&#10094;</button>
    <button class="arrow arrow-right" @click="next">&#10095;</button>

    <div class="dots">
      <span
        v-for="(_, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: index === current }"
        @click="current = index"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.hero-banner {
  position: relative;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  color: #fff;
  padding: 20px;
}

.content h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.content p {
  font-size: 18px;
  margin-bottom: 32px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.cta-btn {
  display: inline-block;
  padding: 12px 32px;
  background: $color-accent;
  color: #fff;
  border-radius: $radius-btn;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: lighten($color-accent, 10%);
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  &.arrow-left { left: 20px; }
  &.arrow-right { right: 20px; }
}

.dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    background: #fff;
    transform: scale(1.2);
  }
}
</style>
```

- [ ] **Step 3: 提交**

```bash
git add src/components/SpotCard.vue src/components/HeroBanner.vue
git commit -m "feat: 添加景点卡片和首页轮播组件"
```

---

## Task 8: AnchorNav + ImageGallery + CommentSection 组件

**Files:**
- Create: `src/components/AnchorNav.vue`
- Create: `src/components/ImageGallery.vue`
- Create: `src/components/CommentSection.vue`

- [ ] **Step 1: 创建 src/components/AnchorNav.vue**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  sections: { id: string; label: string }[];
}>();

const activeId = ref("");

function handleScroll() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    const top = (section as HTMLElement).offsetTop - 120;
    if (window.scrollY >= top) {
      current = (section as HTMLElement).id;
    }
  });
  activeId.value = current;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav class="anchor-nav">
    <div class="anchor-inner">
      <button
        v-for="section in sections"
        :key="section.id"
        class="anchor-link"
        :class="{ active: activeId === section.id }"
        @click.prevent="scrollTo(section.id)"
      >
        {{ section.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.anchor-nav {
  position: sticky;
  top: 60px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #eee;
}

.anchor-inner {
  display: flex;
  max-width: $container-max;
  margin: 0 auto;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar { display: none; }
}

.anchor-link {
  flex-shrink: 0;
  padding: 12px 20px;
  font-size: 14px;
  color: $color-text-secondary;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: $color-primary;
  }

  &.active {
    color: $color-primary;
    border-bottom-color: $color-primary;
    font-weight: 600;
  }
}
</style>
```

- [ ] **Step 2: 创建 src/components/ImageGallery.vue**

```vue
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  images: string[];
}>();

const showModal = ref(false);
const currentIndex = ref(0);

function openImage(index: number) {
  currentIndex.value = index;
  showModal.value = true;
}

function closeImage() {
  showModal.value = false;
}

function navigate(direction: "prev" | "next") {
  if (direction === "prev") {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
  } else {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  }
}
</script>

<template>
  <div class="gallery">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="gallery-item"
      @click="openImage(index)"
    >
      <img :src="image" :alt="`图片 ${index + 1}`" loading="lazy" />
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click="closeImage">
          <button class="modal-close" @click="closeImage">&times;</button>
          <button class="modal-nav modal-prev" @click.stop="navigate('prev')">&#10094;</button>
          <img :src="images[currentIndex]" class="modal-image" />
          <button class="modal-nav modal-next" @click.stop="navigate('next')">&#10095;</button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.gallery-item {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: $radius-card;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
  z-index: 2001;
}

.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;

  &:hover { background: rgba(255, 255, 255, 0.4); }

  &.modal-prev { left: 20px; }
  &.modal-next { right: 20px; }
}

.modal-image {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 3: 创建 src/components/CommentSection.vue**

```vue
<script setup lang="ts">
const mockComments = [
  {
    id: 1,
    nickname: "旅行者小王",
    rating: 5,
    content: "非常棒的景点！风景优美，值得一去。建议早点出发避开人流。",
    date: "2026-03-15",
  },
  {
    id: 2,
    nickname: "背包客Amy",
    rating: 4,
    content: "攻略很实用，交通信息准确。住宿推荐的价格也很合理。",
    date: "2026-02-28",
  },
  {
    id: 3,
    nickname: "摄影师老张",
    rating: 5,
    content: "拍照的最佳时间是日出和日落时分，光线最美。记得带三脚架！",
    date: "2026-02-10",
  },
];
</script>

<template>
  <section id="comments" class="comment-section">
    <h2 class="section-title">用户评论</h2>

    <div class="coming-soon-banner">
      <span>💬 评论功能即将上线，敬请期待！</span>
    </div>

    <div class="comments-list">
      <div v-for="comment in mockComments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <span class="nickname">{{ comment.nickname }}</span>
          <div class="comment-meta">
            <div class="rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= comment.rating }">★</span>
            </div>
            <span class="date">{{ comment.date }}</span>
          </div>
        </div>
        <p class="comment-content">{{ comment.content }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.comment-section {
  padding: 24px 0;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid $color-primary;
}

.coming-soon-banner {
  background: linear-gradient(135deg, rgba(74, 144, 217, 0.1), rgba(102, 187, 106, 0.1));
  padding: 12px 16px;
  border-radius: $radius-card;
  text-align: center;
  font-size: 14px;
  color: $color-primary;
  margin-bottom: 24px;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.nickname {
  font-weight: 600;
  color: $color-text-main;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.comment-meta .star {
  color: #ddd;
  font-size: 12px;

  &.active {
    color: #f5a623;
  }
}

.date {
  font-size: 12px;
  color: $color-text-secondary;
}

.comment-content {
  font-size: 14px;
  color: $color-text-secondary;
  line-height: 1.7;
}
</style>
```

- [ ] **Step 4: 提交**

```bash
git add src/components/AnchorNav.vue src/components/ImageGallery.vue src/components/CommentSection.vue
git commit -m "feat: 添加锚点导航、图集和评论区组件"
```

---

## Task 9: Home 首页

**Files:**
- Create: `src/views/Home.vue`

- [ ] **Step 1: 创建 src/views/Home.vue**

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { useSpotsStore } from "@/stores/spots";
import HeroBanner from "@/components/HeroBanner.vue";
import SpotCard from "@/components/SpotCard.vue";
import type { SpotType } from "@/types/spot";

const store = useSpotsStore();
const activeType = ref<SpotType | "all">("all");

const typeOptions: { value: SpotType | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "nature", label: "自然风光" },
  { value: "history", label: "人文历史" },
  { value: "mixed", label: "人文+自然" },
];

function filterByType(type: SpotType | "all") {
  activeType.value = type;
  store.setType(type);
}
</script>

<template>
  <div class="home">
    <HeroBanner />

    <div class="container">
      <section class="filter-section">
        <h2 class="section-title">热门景点</h2>
        <div class="filter-tabs">
          <button
            v-for="option in typeOptions"
            :key="option.value"
            class="filter-tab"
            :class="{ active: activeType === option.value }"
            @click="filterByType(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </section>

      <div class="spots-grid">
        <SpotCard v-for="spot in store.filteredSpots" :key="spot.id" :spot="spot" />
      </div>

      <p v-if="store.filteredSpots.length === 0" class="empty-state">
        没有找到匹配的景点，请尝试其他筛选条件。
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.section-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

.filter-section {
  padding: 40px 0 24px;
}

.filter-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 20px;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: $color-text-secondary;

  &:hover {
    border-color: $color-primary;
    color: $color-primary;
  }

  &.active {
    background: $color-primary;
    border-color: $color-primary;
    color: #fff;
  }
}

.spots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: $color-text-secondary;
  font-size: 16px;
}
</style>
```

- [ ] **Step 2: 提交**

```bash
git add src/views/Home.vue
git commit -m "feat: 添加首页（轮播 + 分类筛选 + 景点网格）"
```

---

## Task 10: SpotList 景点列表页

**Files:**
- Create: `src/views/SpotList.vue`

- [ ] **Step 1: 创建 src/views/SpotList.vue**

```vue
<script setup lang="ts">
import { useSpotsStore } from "@/stores/spots";
import SpotCard from "@/components/SpotCard.vue";
import type { SpotType } from "@/types/spot";

const store = useSpotsStore();

const typeOptions: { value: SpotType | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "nature", label: "自然风光" },
  { value: "history", label: "人文历史" },
  { value: "mixed", label: "人文+自然" },
];
</script>

<template>
  <div class="spot-list-page container">
    <header class="page-header">
      <h1>攻略列表</h1>
      <p>精选国内 10 大热门景点，共 {{ store.spots.length }} 条详细攻略</p>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <h3>按类型筛选</h3>
        <div class="type-filters">
          <button
            v-for="option in typeOptions"
            :key="option.value"
            class="type-btn"
            :class="{ active: store.selectedType === option.value }"
            @click="store.setType(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </aside>

      <div class="content">
        <div class="spots-grid">
          <SpotCard v-for="spot in store.filteredSpots" :key="spot.id" :spot="spot" />
        </div>

        <p v-if="store.filteredSpots.length === 0" class="empty-state">
          没有找到匹配的景点。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.page-header {
  padding: 40px 0 24px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: $color-text-secondary;
    font-size: 15px;
  }
}

.layout {
  display: flex;
  gap: 32px;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.sidebar {
  width: 200px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 12px;
  }
}

.type-filters {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.type-btn {
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: $radius-btn;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  color: $color-text-secondary;

  &:hover {
    border-color: $color-primary;
    color: $color-primary;
  }

  &.active {
    background: $color-primary;
    border-color: $color-primary;
    color: #fff;
  }
}

.content {
  flex: 1;
  min-width: 0;
}

.spots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: $color-text-secondary;
}
</style>
```

- [ ] **Step 2: 提交**

```bash
git add src/views/SpotList.vue
git commit -m "feat: 添加景点列表页（侧栏筛选 + 卡片列表）"
```

---

## Task 11: SpotDetail 攻略详情页

**Files:**
- Create: `src/views/SpotDetail.vue`

- [ ] **Step 1: 创建 src/views/SpotDetail.vue**

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSpotsStore } from "@/stores/spots";
import AnchorNav from "@/components/AnchorNav.vue";
import ImageGallery from "@/components/ImageGallery.vue";
import CommentSection from "@/components/CommentSection.vue";

const route = useRoute();
const router = useRouter();
const store = useSpotsStore();

const spot = computed(() => store.getSpotById(route.params.id as string));
const prevSpot = computed(() => store.getPrevSpot(route.params.id as string));
const nextSpot = computed(() => store.getNextSpot(route.params.id as string));

const anchorSections = [
  { id: "overview", label: "概览" },
  { id: "transport", label: "交通" },
  { id: "routes", label: "路线" },
  { id: "hotels", label: "住宿" },
  { id: "foods", label: "美食" },
  { id: "tips", label: "贴士" },
  { id: "gallery", label: "图集" },
  { id: "comments", label: "评论" },
];

if (!spot.value) {
  router.replace("/");
}
</script>

<template>
  <div v-if="spot" class="spot-detail">
    <div class="hero-cover" :style="{ backgroundImage: `url(${spot.cover})` }">
      <div class="hero-info">
        <h1>{{ spot.name }}</h1>
        <div class="info-badges">
          <span class="badge province">{{ spot.province }}</span>
          <span class="badge" :class="spot.type">
            {{ spot.type === "nature" ? "自然风光" : spot.type === "history" ? "人文历史" : "人文+自然" }}
          </span>
          <span class="badge rating">
            <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= spot.rating }">★</span>
          </span>
        </div>
        <div class="quick-info">
          <span>🕐 {{ spot.overview.openTime }}</span>
          <span>🎫 {{ spot.overview.ticket }}</span>
          <span>⏱ {{ spot.overview.duration }}</span>
          <span>🌤 {{ spot.overview.bestSeason }}</span>
        </div>
      </div>
    </div>

    <AnchorNav :sections="anchorSections" />

    <div class="container content-body">
      <section id="overview" class="content-card">
        <h2 class="section-title">景点概览</h2>
        <p class="description">{{ spot.overview.description }}</p>
      </section>

      <section id="transport" class="content-card">
        <h2 class="section-title">交通指南</h2>
        <div class="transport-grid">
          <div class="transport-item">
            <h4>🛫 如何到达</h4>
            <ul>
              <li v-for="(item, i) in spot.transport.flights" :key="i">{{ item }}</li>
            </ul>
          </div>
          <div class="transport-item">
            <h4>🚌 当地交通</h4>
            <p>{{ spot.transport.local }}</p>
          </div>
          <div class="transport-item">
            <h4>🅿️ 停车信息</h4>
            <p>{{ spot.transport.parking }}</p>
          </div>
        </div>
      </section>

      <section id="routes" class="content-card">
        <h2 class="section-title">游玩路线推荐</h2>
        <div v-for="(routePlan, index) in spot.routes" :key="index" class="route-plan">
          <h3>{{ routePlan.title }} <span class="route-type">{{ routePlan.type }}</span></h3>
          <ol class="route-steps">
            <li v-for="(step, i) in routePlan.steps" :key="i">{{ step }}</li>
          </ol>
        </div>
      </section>

      <section id="hotels" class="content-card">
        <h2 class="section-title">住宿推荐</h2>
        <div class="hotel-grid">
          <div v-for="(hotel, index) in spot.hotels" :key="index" class="hotel-card" :class="hotel.level">
            <div class="hotel-level">
              {{ hotel.level === "high" ? "高档" : hotel.level === "mid" ? "中档" : "经济" }}
            </div>
            <h4>{{ hotel.name }}</h4>
            <p class="hotel-price">{{ hotel.price }}</p>
            <p class="hotel-desc">{{ hotel.description }}</p>
          </div>
        </div>
      </section>

      <section id="foods" class="content-card">
        <h2 class="section-title">美食攻略</h2>
        <div class="food-list">
          <div v-for="(food, index) in spot.foods" :key="index" class="food-item">
            <h4>{{ food.name }}</h4>
            <p class="food-desc">{{ food.description }}</p>
            <div class="food-meta">
              <span>📍 {{ food.restaurant }}</span>
              <span>💰 {{ food.price }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="tips" class="content-card">
        <h2 class="section-title">实用贴士</h2>
        <ul class="tips-list">
          <li v-for="(tip, index) in spot.tips" :key="index">{{ tip }}</li>
        </ul>
      </section>

      <section id="gallery" class="content-card">
        <h2 class="section-title">精彩图集</h2>
        <ImageGallery :images="spot.gallery" />
      </section>

      <CommentSection />

      <div class="spot-navigation">
        <RouterLink
          v-if="prevSpot"
          :to="`/spots/${prevSpot.id}`"
          class="nav-spot prev"
        >
          <span class="arrow">←</span>
          <span class="name">{{ prevSpot.name }}</span>
        </RouterLink>
        <div v-else class="nav-spot placeholder"></div>

        <RouterLink
          v-if="nextSpot"
          :to="`/spots/${nextSpot.id}`"
          class="nav-spot next"
        >
          <span class="name">{{ nextSpot.name }}</span>
          <span class="arrow">→</span>
        </RouterLink>
        <div v-else class="nav-spot placeholder"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.hero-cover {
  width: 100%;
  height: 50vh;
  min-height: 350px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 20px 30px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
}

.hero-info h1 {
  font-size: 36px;
  margin-bottom: 12px;
}

.info-badges {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);

  &.province { background: rgba(74, 144, 217, 0.4); }
  &.nature { background: rgba(102, 187, 106, 0.4); }
  &.history { background: rgba(74, 144, 217, 0.4); }
  &.mixed { background: rgba(38, 166, 154, 0.4); }

  .star {
    color: #666;
    &.active { color: #f5a623; }
  }
}

.quick-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 14px;
}

.content-body {
  padding: 32px 20px 40px;
}

.content-card {
  background: #fff;
  border-radius: $radius-card;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: $shadow-card;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid $color-primary;
}

.description {
  font-size: 15px;
  line-height: 1.8;
  color: $color-text-secondary;
}

.transport-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.transport-item h4 {
  font-size: 16px;
  margin-bottom: 8px;
}

.transport-item ul {
  padding-left: 20px;
  color: $color-text-secondary;
}

.transport-item p {
  color: $color-text-secondary;
  line-height: 1.7;
}

.route-plan {
  margin-bottom: 24px;

  &:last-child { margin-bottom: 0; }

  h3 {
    font-size: 17px;
    margin-bottom: 12px;
  }
}

.route-type {
  font-size: 12px;
  color: $color-primary;
  background: rgba(74, 144, 217, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
}

.route-steps {
  padding-left: 20px;
  color: $color-text-secondary;
  line-height: 2;
}

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.hotel-card {
  padding: 20px;
  border-radius: $radius-card;
  border: 1px solid #eee;

  &.high { border-color: #f5a623; background: #fef9e7; }
  &.mid { border-color: $color-primary; background: #f0f7ff; }
  &.low { border-color: $color-accent; background: #f0faf0; }
}

.hotel-level {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.hotel-price {
  font-size: 15px;
  font-weight: 600;
  color: $color-primary;
  margin: 8px 0;
}

.hotel-desc {
  font-size: 13px;
  color: $color-text-secondary;
}

.food-item {
  padding: 16px 0;
  border-bottom: 1px solid #eee;

  &:last-child { border-bottom: none; }

  h4 { font-size: 16px; margin-bottom: 6px; }
}

.food-desc {
  font-size: 14px;
  color: $color-text-secondary;
  margin-bottom: 8px;
}

.food-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: $color-text-secondary;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tips-list li {
  padding: 10px 0 10px 28px;
  position: relative;
  font-size: 14px;
  color: $color-text-secondary;
  line-height: 1.7;

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: $color-accent;
    font-weight: 700;
  }
}

.spot-navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
}

.nav-spot {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: $radius-card;
  box-shadow: $shadow-card;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: $shadow-card-hover;
    transform: translateY(-2px);
  }

  &.prev { justify-content: flex-start; }
  &.next { justify-content: flex-end; }

  &.placeholder {
    background: transparent;
    box-shadow: none;
    pointer-events: none;
  }

  .arrow {
    font-size: 20px;
    color: $color-primary;
  }

  .name {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
```

- [ ] **Step 2: 提交**

```bash
git add src/views/SpotDetail.vue
git commit -m "feat: 添加攻略详情页（封面图+锚点导航+8个内容模块+上下篇导航）"
```

---

## Task 12: 构建验证与更新 README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 运行构建验证**

```bash
cd /d/codes/demo03/trip && npm run build
```

Expected: Build succeeds with no errors. Output in `dist/` directory.

- [ ] **Step 2: 更新 README.md**

```markdown
# 旅行攻略

一个面向中国用户的旅行攻略静态展示网站，精选国内 10 大热门景点，提供详细实用的攻略信息。

## 技术栈

- Vue 3 + Vite + TypeScript
- Element Plus UI
- Pinia 状态管理
- Vue Router
- Tailwind CSS

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 景点列表

故宫 · 长城 · 西湖 · 兵马俑 · 张家界 · 九寨沟 · 丽江 · 桂林 · 黄山 · 布达拉宫
```

- [ ] **Step 3: 提交**

```bash
git add README.md
git commit -m "docs: 更新项目 README，添加开发说明"
```

- [ ] **Step 4: 推送到 GitHub**

```bash
git push
```

---

## 自审检查

### 1. Spec 覆盖度

| Spec 需求 | 对应 Task |
|-----------|-----------|
| Vue 3 + Vite + TypeScript + Element Plus + Pinia | Task 1, 4 |
| 10 大景点静态数据 | Task 2 |
| 清新自然风格配色 | Task 5 |
| 响应式布局（3列/2列/1列） | Task 7, 9, 10, 11 |
| 首页轮播 HeroBanner | Task 7, 9 |
| 分类筛选 | Task 3, 9 |
| 景点卡片 SpotCard | Task 7 |
| 锚点导航 AnchorNav | Task 8, 11 |
| 图集 ImageGallery | Task 8, 11 |
| 评论区静态占位 | Task 8, 11 |
| 攻略详情页 8 个模块 | Task 11 |
| 上一篇/下一篇导航 | Task 11 |
| Navbar + Footer | Task 6 |
| 景点列表页 | Task 10 |
| 图片懒加载 | Task 7, 8（loading="lazy"） |
| 路由懒加载 | Task 4 |

无遗漏。

### 2. 占位符扫描

无 TBD、TODO、"后续添加" 等占位符。所有代码步骤包含完整内容。

### 3. 类型一致性

- `Spot`、`SpotType`、`RoutePlan`、`Hotel`、`Food` 类型在 Task 2 的 `src/types/spot.ts` 中统一定义
- 所有组件引用类型均来自 `@/types/spot`
- Store 返回值与组件接收的 props 类型一致
- 路由参数 `route.params.id` 使用 `as string` 类型断言，与 `getSpotById` 参数类型一致

### 4. 范围检查

聚焦 MVP：纯前端静态站点，10 个景点数据、3 个页面、7 个组件。评论为静态占位。无后端、无用户系统。范围适当。
