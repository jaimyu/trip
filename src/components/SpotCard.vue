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
