<template>
  <div class="detail-center">
    <button class="detail-center__close" @click="$router.back()">X</button>

    <!-- 카테고리 -->
    <div class="detail-center__item">
      <img
        :src="categoryIcon"
        class="detail-center__icon"
        alt="카테고리 아이콘"
      />
      <span class="detail-center__highlight detail-center__highlight-category">
        {{ category.name }}
      </span>
      카테고리에 소비하셨어요
    </div>

    <!-- 날짜 -->
    <div class="detail-center__item">
      <img :src="calendarIcon" class="detail-center__icon" alt="달력 아이콘" />
      <span class="detail-center__highlight detail-center__highlight-date">
        {{ date }}
      </span>
      에 사용하셨어요
    </div>

    <!-- 메모 -->
    <div class="detail-center__item">
      <img :src="memoIcon" class="detail-center__icon" alt="메모 아이콘" />
      <span class="detail-center__highlight detail-center__highlight-memo">
        {{ memo }}
      </span>
      이라는 메모를 남기셨네요
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// category는 name과 code를 포함한 객체
const props = defineProps({
  category: Object,
  date: String,
  memo: String,
})

// 카테고리 아이콘 경로 생성
const categoryIcon = computed(() => {
  const fileName = props.category?.code
  return new URL(`../assets/${fileName}.svg`, import.meta.url).href
})

// 정적 아이콘 경로
const calendarIcon = new URL('../assets/calender.svg', import.meta.url).href // 오타 calender 주의!
const memoIcon = new URL('../assets/memo.svg', import.meta.url).href
</script>

<style scoped>
.detail-center {
  position: relative;
  background-color: white;
  border-radius: 28px;
  padding: 64px 60px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1.8;
}

.detail-center__item {
  display: flex;
  align-items: center;
  gap: 16px;
  word-break: keep-all;
}

.detail-center__icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
}

.detail-center__highlight {
  font-weight: 700;
  margin: 0 8px;
}

.detail-center__highlight-category {
  color: var(--point-color);
}
.detail-center__highlight-date {
  color: var(--blue);
}
.detail-center__highlight-memo {
  color: var(--green-500);
}

.detail-center__close {
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 14px;
  cursor: pointer;
}
</style>
