<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSpotsStore } from "@/stores/spots";
import AnchorNav from "@/components/AnchorNav.vue";
import ImageGallery from "@/components/ImageGallery.vue";
import CommentSection from "@/components/CommentSection.vue";
import type { SpotType } from "@/types/spot";

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

const typeLabels: Record<SpotType, string> = {
  nature: "自然风光",
  history: "人文历史",
  mixed: "人文+自然",
};

const levelLabels: Record<string, string> = {
  high: "高档",
  mid: "中档",
  low: "经济",
};

watch(
  spot,
  (val) => {
    if (!val) router.replace("/");
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="spot" class="spot-detail">
    <div class="hero-cover" :style="{ backgroundImage: `url(${spot.cover})` }">
      <div class="hero-info">
        <h1>{{ spot.name }}</h1>
        <div class="info-badges">
          <span class="badge province">{{ spot.province }}</span>
          <span class="badge" :class="spot.type">
            {{ typeLabels[spot.type] }}
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
              {{ levelLabels[hotel.level] }}
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
          :aria-label="`上一个景点：${prevSpot.name}`"
        >
          <span class="arrow">←</span>
          <span class="name">{{ prevSpot.name }}</span>
        </RouterLink>
        <div v-else class="nav-spot placeholder"></div>

        <RouterLink
          v-if="nextSpot"
          :to="`/spots/${nextSpot.id}`"
          class="nav-spot next"
          :aria-label="`下一个景点：${nextSpot.name}`"
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

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

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
