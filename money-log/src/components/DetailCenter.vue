<!-- 상세페이지 흰색 카드 컴포넌트 -->
<template>
  <div class="detail-center">
    <!-- 버튼 그룹 -->
    <div class="detail-center__button-group">
      <button class="detail-center__btn detail-center__edit">수정</button>
      <button class="detail-center__btn detail-center__delete">삭제</button>
      <button
        class="detail-center__btn detail-center__close"
        @click="$router.back()"
      >
        닫기
      </button>
    </div>

    <!-- 카테고리 표시 -->
    <div class="detail-center__item">
      🍔
      <span
        class="detail-center__highlight detail-center__highlight--category"
        >{{ category }}</span
      >
      <template v-if="type === 'income'"> 카테고리로 들어온 돈이에요 </template>
      <template v-else> 카테고리에 소비하셨어요 </template>
    </div>

    <!-- 날짜 표시 -->
    <div class="detail-center__item">
      📅
      <span class="detail-center__highlight detail-center__highlight--date">{{
        date
      }}</span>
      <template v-if="type === 'income'"> 에 들어온 돈이에요 </template>
      <template v-else> 에 사용하셨어요 </template>
    </div>

    <!-- 메모 표시 -->
    <div class="detail-center__item">
      📢
      <span class="detail-center__highlight detail-center__highlight--content"
        >"{{ content }}"</span
      >
      메모를 남기셨어요
    </div>
  </div>
</template>

<script setup>
// TransactionDetail.vue로부터 전달받는 상세 데이터
defineProps({
  category: String,
  date: String,
  content: String,
  type: String, // 'income' 또는 'expense'
})
</script>

<style scoped>
.detail-center {
  position: relative;
  background-color: #ffffff;
  padding: 64px 60px;
  border-radius: 28px;

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
  color: var(--point-color);
}
.detail-center__highlight--date {
  color: var(--blue);
}
.detail-center__highlight--content {
  color: var(--green-500);
}

.detail-center__button-group {
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  gap: 10px;
}

.detail-center__btn {
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.detail-center__btn:hover {
  background: var(--gray-100);
}

.detail-center__edit {
  background-color: #ffc107;
  color: white;
  border: none;
}

.detail-center__edit:hover {
  background-color: #ffb300;
}

.detail-center__delete {
  background-color: #dc3545;
  color: white;
  border: none;
}

.detail-center__delete:hover {
  background-color: #c82333;
}

.detail-center__close {
  background-color: #6c757d;
  color: white;
  border: none;
}

.detail-center__close:hover {
  background-color: #5a6268;
}
</style>
