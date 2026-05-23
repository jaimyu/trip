<script setup lang="ts">
import { computed } from "vue";
import { useSpotsStore } from "@/stores/spots";
import HeroBanner from "@/components/HeroBanner.vue";
import SpotCard from "@/components/SpotCard.vue";
import type { SpotType } from "@/types/spot";

const store = useSpotsStore();
const activeType = computed(() => store.selectedType);

const typeOptions: { value: SpotType | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "nature", label: "自然风光" },
  { value: "history", label: "人文历史" },
  { value: "mixed", label: "人文+自然" },
];

function filterByType(type: SpotType | "all") {
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
            :aria-pressed="activeType === option.value"
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

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
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
