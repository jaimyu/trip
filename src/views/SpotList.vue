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
