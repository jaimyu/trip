<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
let ticking = false;

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 10;
      ticking = false;
    });
    ticking = true;
  }
}

onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="container navbar-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">旅行攻略</span>
      </RouterLink>

      <div class="nav-links" :class="{ open: mobileMenuOpen }" :aria-expanded="mobileMenuOpen" role="navigation">
        <RouterLink to="/" class="nav-link" @click="mobileMenuOpen = false">首页</RouterLink>
        <RouterLink to="/spots" class="nav-link" @click="mobileMenuOpen = false">攻略列表</RouterLink>
      </div>

      <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="切换导航菜单">
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
