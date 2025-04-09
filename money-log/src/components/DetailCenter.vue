<!-- 상세페이지 흰색 카드 컴포넌트 -->
<template>
  <div class="detail-center">
    <!-- 닫기 버튼 (뒤로가기 기능) -->
    <button class="detail-center__close" @click="$router.back()">닫기</button>

    <!-- 카테고리 표시 -->
    <div class="detail-center__item">
      🍔
      <span
        class="detail-center__highlight detail-center__highlight--category"
        >{{ category }}</span
      >
      카테고리에 소비하셨어요
    </div>

    <!-- 날짜 표시 -->
    <div class="detail-center__item">
      📅
      <span class="detail-center__highlight detail-center__highlight--date">{{
        date
      }}</span>
      에 사용하셨어요
    </div>

    <!-- 메모 표시 -->
    <div class="detail-center__item">
      📢
      <span class="detail-center__highlight detail-center__highlight--memo">{{
        memo
      }}</span>
      이라는 메모를 남기셨네요
    </div>
  </div>
</template>

<script setup>
// TransactionDetail.vue로부터 전달받는 상세 데이터
defineProps({
  category: String,
  date: String,
  memo: String,
})
</script>

<style scoped>
.detail-center {
  position: relative;
  background-color: #ffffff;
  padding: 64px 60px;
  border-radius: 28px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);

  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  margin: 0 auto;

  font-size: 28px;
  line-height: 1.9;
  display: flex;
  flex-direction: column;
  gap: 48px;
  font-weight: bold;
}

.detail-center__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  word-break: keep-all;
  line-height: 1.7;
}

.detail-center__highlight {
  font-weight: 700;
  margin: 0 8px;
}

.detail-center__highlight--category {
  color: #d55353;
}
.detail-center__highlight--date {
  color: #4680ff;
}
.detail-center__highlight--memo {
  color: #3cb371;
}

.detail-center__close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: white;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
</style>
