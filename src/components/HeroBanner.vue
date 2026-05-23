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
let reducedMotion = false;

function next() {
  current.value = (current.value + 1) % slides.length;
}

function prev() {
  current.value = (current.value - 1 + slides.length) % slides.length;
}

function startAutoPlay() {
  if (!reducedMotion) {
    timer = setInterval(next, 5000);
  }
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  startAutoPlay();
});
onUnmounted(stopAutoPlay);
</script>

<template>
  <div class="hero-banner" role="region" aria-label="焦点横幅" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
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

    <button class="arrow arrow-left" @click="prev" aria-label="上一张幻灯片">&#10094;</button>
    <button class="arrow arrow-right" @click="next" aria-label="下一张幻灯片">&#10095;</button>

    <div class="dots" role="tablist" aria-label="幻灯片选择器">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: index === current }"
        @click="current = index"
        role="tab"
        :aria-label="`第 ${index + 1} 张幻灯片`"
      ></button>
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
