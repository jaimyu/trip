<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

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

function handleKeydown(e: KeyboardEvent) {
  if (!showModal.value) return;
  if (e.key === "Escape") closeImage();
  if (e.key === "ArrowLeft") navigate("prev");
  if (e.key === "ArrowRight") navigate("next");
}

watch(showModal, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);
  } else {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeydown);
  }
});
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
        <div v-if="showModal" class="modal-overlay" @click="closeImage" role="dialog" aria-modal="true">
          <button class="modal-close" @click="closeImage" aria-label="关闭">&times;</button>
          <button class="modal-nav modal-prev" @click.stop="navigate('prev')" aria-label="上一张">&#10094;</button>
          <img :src="images[currentIndex]" :alt="`图片 ${currentIndex + 1}`" class="modal-image" />
          <button class="modal-nav modal-next" @click.stop="navigate('next')" aria-label="下一张">&#10095;</button>
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
