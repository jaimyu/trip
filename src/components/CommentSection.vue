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
