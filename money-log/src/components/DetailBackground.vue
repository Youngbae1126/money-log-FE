<!-- 상세페이지 배경 컴포넌트 -->
<template>
  <!-- 전체 배경 컴포넌트 컨테이너 -->
  <div class="detail-background">
    <!-- 상단 텍스트 영역 (설명 + 금액) -->
    <div class="detail-background__top">
      <div class="detail-background__desc">
        해당 거래 내역의 상세 페이지예요
      </div>
      <div class="detail-background__amount">
        <!-- 금액 강조 -->
        <span class="detail-background__amount--number">
          {{ amount.toLocaleString() }}
        </span>
        <span class="detail-background__amount--text">원 쓰셨네요!</span>
      </div>
    </div>

    <div class="detail-background__content">
      <slot></slot>
    </div>

    <!-- 화면 우측 하단 돼지저금통 이미지 -->
    <img
      src="../assets/profile-icon.svg"
      alt="저금통"
      class="transaction-detail__pig"
    />
  </div>
</template>

<script setup>
defineProps({
  userName: String,
  amount: Number,
})
</script>

<style scoped>
.detail-background {
  background-image: url('@/assets/detail-background-color.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  padding: 64px 48px;
  position: relative;
}

.detail-background__top {
  display: flex;
  flex-direction: column;
}

.detail-background__desc {
  margin-top: 8px;
  font-size: 16px;
  color: #393e46;
}

.detail-background__amount {
  font-size: 60px;
  font-weight: bold;
  margin-top: 14px;
}

.detail-background__amount--number {
  color: #feba17;
  margin-right: 4px;
  font-weight: bold;
}

.detail-background__amount--text {
  color: #222831;
}

.detail-background__content {
  margin-top: 60px;
}

.transaction-detail__pig {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 400px;
  height: auto;
  z-index: 0;
  /* 클릭 방해 X */
  pointer-events: none;
  user-select: none;
}
</style>
