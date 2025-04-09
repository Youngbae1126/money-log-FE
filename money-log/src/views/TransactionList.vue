<script setup>
import ListFilter from '@/components/ListFilter.vue'
import { ref } from 'vue'

const currentMonth = ref(3)
const currentYear = ref(2025)

const monthNames = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

function prevMonth() {
  const date = new Date(currentYear.value, currentMonth.value - 1)
  currentMonth.value = date.getMonth()
  currentYear.value = date.getFullYear()
}

function nextMonth() {
  const date = new Date(currentYear.value, currentMonth.value + 1)
  currentMonth.value = date.getMonth()
  currentYear.value = date.getFullYear()
}
</script>

<template>
  <div class="transaction-list">
    <div class="transaction__bg"></div>
    <div class="transaction-filter__container">
      <!-- 달력 상단 바 -->
      <div class="top-bar">
        <div class="logo"></div>
      </div>
      <!-- 달력 -->
      <div class="month-box">
        <div class="nav">
          <span @click="prevMonth">&lt;</span>
          <span>{{ monthNames[currentMonth] }}</span>
          <span @click="nextMonth">&gt;</span>
        </div>
        <div class="year">{{ currentYear }}</div>
        <div class="description">이번 달에는 이렇게 썼어요!</div>
      </div>
      <ListFilter />
    </div>

    <!-- 리스트 -->
    <div class="transaction-list__container">
      <div class="transaction-list__top-container">
        전체 내역 20건
        <div class="amount__container">수입 1,000,000원 | 지출 300,000원</div>
      </div>
      <div class="transaction-list__bottom-container">
        <ul class="transaction-list__list">
          <li>
            <div class="transaction-list__title">
              <span>Category</span>
              <span>Date</span>
              <span>Memo</span>
            </div>
          </li>
          <li class="list__line"></li>
          <!-- 여기 아래 부분 v-for문 돌리면 됩니다.-->
          <RouterLink to="/detail">
            <li>
              <div class="list-content__ctg">
                <img src="../assets/money.svg" alt="아이콘" />
                <div class="list-content__date">2025/04/08</div>
                <div class="list-content__memo">치킨 사먹음~</div>
              </div>
            </li>
          </RouterLink>
          <RouterLink to="/detail">
            <li>
              <div class="list-content__ctg">
                <img src="../assets/money.svg" alt="아이콘" />
                <div class="list-content__date">2025/04/08</div>
                <div class="list-content__memo">치킨 사먹음~</div>
              </div>
            </li>
          </RouterLink>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction-list {
  position: relative;
  padding-top: 40px;
}
.transaction__bg {
  background-color: var(--yellow-200);
  height: 400px;
  top: -106px;
  position: relative;
  z-index: -100;
}
.transaction-filter__container {
  display: flex;
  flex-direction: column;
  position: relative;
  top: -20rem;
  align-items: center;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.month-box {
  text-align: center;
  margin-top: 10px;
}

.month-box .nav {
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.month-box .nav span {
  cursor: pointer;
}

.month-box .year {
  font-size: 18px;
  margin-top: 8px;
  color: #444;
}

.month-box .description {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.filter-container {
  background: #fff8e6;
  padding: 20px;
  margin: 30px auto;
  border-radius: 20px;
  max-width: 900px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  font-size: 16px;
  font-weight: bold;
}

.filter-box input[type='date'],
.filter-box select {
  border: none;
  font-family: 'Pretendard';
  font-size: 16px;
  background: none;
  cursor: pointer;
  font-weight: normal;
}

.filter-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #f4c84c;
  color: white;
  border-color: #f4c84c;
}

.transaction-list__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  width: calc(100% - 2rem);
  margin: auto;
  position: relative;
  top: -20rem;
}
.transaction-list__top-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-500);
}
.amount__container {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--gray-500);
}
.transaction-list__bottom-container {
  width: 100%;
  margin-top: 2rem;
}
.transaction-list__list {
  display: flex;
  flex-direction: column;
}
.transaction-list__title {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 1.2rem;
  font-weight: 800;
}
.list__line {
  margin-top: 1rem;
  border-bottom: 1px solid var(--gray-300);
}
.list-content__ctg {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-300);
}
.list-content__ctg img {
  width: 3rem;
}
</style>
