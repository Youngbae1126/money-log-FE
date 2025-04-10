<!-- 상세페이지 배경 컴포넌트 -->
<template>
  <div class="detail-background-layer"></div>
  <!-- 전체 배경 컴포넌트 컨테이너 -->
  <div class="detail-background">
    <!-- 상단 텍스트 영역 (설명 + 금액) -->
    <div class="detail-background__top">
      <div class="detail-background__desc">
        {{ transactionData.date }} 날짜의 거래 내역 상세 페이지예요
      </div>
      <div class="detail-background__amount">
        <!-- 금액 강조 -->
        <span class="detail-background__amount-number">
          {{ Number(transactionData.amount).toLocaleString() }}
        </span>
        <span
          class="detail-background__amount-text"
          v-if="transactionData.type === 'expense'"
          >원 쓰셨네요!</span
        >
        <span
          class="detail-background__amount-text"
          v-if="transactionData.type === 'income'"
          >원 들어왔어요!</span
        >
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
  // userName: String,
  // amount: Number,
  // type: String,
  // date: String,
  transactionData: Object,
})
</script>

<style scoped>
.detail-background-layer {
  position: absolute;
  top: -85px;
  left: 0;
  right: 0;
  height: 150vh;
  background: linear-gradient(135deg, #fdfde6 0%, #f4eff6 56%, #f0e8fc 100%);
  z-index: -1;
}

.detail-background {
  padding: 64px 48px;
  position: relative;
}

.detail-background__top {
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding-left: 4rem;
}

.detail-background__desc {
  margin-top: 8px;
  font-size: 16px;
  color: var(-sub-color2);
}

.detail-background__amount {
  font-size: 60px;
  font-weight: bold;
  margin-top: 14px;
}

.detail-background__amount-number {
  color: var(--main-color);
  margin-right: 4px;
  font-weight: bold;
}

.detail-background__amount-text {
  color: #000000;
}

.detail-background__content {
  margin-top: 60px;
}

.transaction-detail__pig {
  /* position: absolute;
  bottom: 0;
  right: 0;
  width: clamp(180px, 35vw, 400px);
  height: auto;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  top: 24rem; */
  position: absolute;
  top: 24rem;
  left: 65rem;
  width: 21rem;
}
</style>
