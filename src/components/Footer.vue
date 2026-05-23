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
