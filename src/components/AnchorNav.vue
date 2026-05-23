<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  sections: { id: string; label: string }[];
}>();

const activeId = ref("");
let ticking = false;

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sectionEls = document.querySelectorAll("section[id]");
      let current = "";
      sectionEls.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 120;
        if (window.scrollY >= top) {
          current = (section as HTMLElement).id;
        }
      });
      activeId.value = current;
      ticking = false;
    });
    ticking = true;
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav class="anchor-nav" aria-label="页面导航">
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
