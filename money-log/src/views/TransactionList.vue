<script setup>
import ListFilter from '@/components/ListFilter.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { computed, onMounted, ref } from 'vue'

import { getCategoryIcon } from '@/stores/categoryIcons'

// transactionStore에 있는 데이터 가져오기
const transactionStore = useTransactionStore()
const currentMonth = ref('04')
const currentYear = ref('2025')

function prevMonth() {
  const date = new Date(
    Number(currentYear.value),
    Number(currentMonth.value) - 1 - 1,
  )
  currentMonth.value = (date.getMonth() + 1).toString().padStart(2, '0')
  currentYear.value = date.getFullYear().toString()
  transactionStore.getTransactionInfo(
    `${currentYear.value}-${currentMonth.value}`,
  )
}

function nextMonth() {
  console.log('실행')
  const date = new Date(Number(currentYear.value), Number(currentMonth.value))
  currentMonth.value = (date.getMonth() + 1).toString().padStart(2, '0')
  currentYear.value = date.getFullYear().toString()
  transactionStore.getTransactionInfo(
    `${currentYear.value}-${currentMonth.value}`,
  )
}

// computed 옵션으로 currentYear나 currentMonth가 바뀌면 자동으로 selectedMonth도 갱신
// 월별 총 수입 정보 가져오기
const selectedMonth = computed(
  () => `${currentYear.value}-${currentMonth.value}`,
)

// 해당 월의 총 수입 계산
const selectedMonthIncome = computed(() =>
  transactionStore.monthTotalIncome(selectedMonth.value),
)
// 해당 월의 총 지출 계산
const selectedMonthExpense = computed(() =>
  transactionStore.monthTotalExpense(selectedMonth.value),
)

onMounted(() => {
  const currMonth = new Date()
  currentMonth.value =
    currMonth.getMonth() < 10
      ? `0${currMonth.getMonth() + 1}`
      : `${currMonth.getMonth() + 1}`

  const targetDate = `${currentYear.value}-${currentMonth.value}`
  transactionStore.getTransactionInfo(targetDate)
})
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
          <span>{{ `${currentMonth}월` }}</span>
          <span @click="nextMonth">&gt;</span>
        </div>
        <div class="year">{{ currentYear }}</div>
        <div class="description">이번 달에는 이렇게 썼어요!</div>
      </div>
      <ListFilter :currentMonth="currentMonth" :selectedMonth="selectedMonth" />
    </div>

    <!-- 리스트 -->
    <div class="transaction-list__container">
      <div class="transaction-list__top-container">
        전체 내역 {{ transactionStore.countTransactionData(selectedMonth) }} 건
        <div class="amount__container">
          <span
            ><span class="amount__container-label">수입</span>
            <span class="income-amount__text"
              >{{ selectedMonthIncome.toLocaleString() }}&nbsp;원</span
            ></span
          >
          |
          <span>
            <span class="amount__container-label">지출</span>
            <span class="expense-amount__text">{{
              selectedMonthExpense.toLocaleString()
            }}</span
            >&nbsp;원
          </span>
        </div>
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
            <li
              v-for="list in transactionStore.filteredTransactionData"
              :key="list.id"
              class="list-content"
            >
              <div class="list-content__ctg">
                <img :src="getCategoryIcon(list.code)" alt="아이콘" />
                <div class="list-content__text">
                  <p>{{ list.amount.toLocaleString() }}원</p>
                  <p>{{ list.content }}</p>
                </div>
              </div>
              <div class="list-content__date">{{ list.date }}</div>
              <div class="list-content__memo">{{ list.content }}</div>
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
  padding: 0 0.8rem;
}
.amount__container {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  flex-grow: 0.2;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--gray-500);
}
.amount__container-label {
  margin-right: 1rem;
}
.income-amount__text {
  color: var(--blue);
}
.expense-amount__text {
  color: var(--point-color);
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
  height: 2rem;
  padding: 0 1.2rem;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 1.2rem;
  font-weight: 800;
}
.transaction-list__title span:nth-child(3) {
  padding-right: 2rem;
}
.list__line {
  margin-top: 1rem;
  border-bottom: 1px solid var(--gray-300);
}
.list-content {
  display: flex;
  border-bottom: 1px solid var(--gray-300);
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 1.5rem;
  font-weight: 400;
}
.list-content__ctg {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 50%;
  /* flex-grow: 0.4; */
}
.list-content__ctg img {
  width: 4.375rem;
}
.list-content__date {
  display: flex;
  /* flex-grow: 0.6; */
  align-items: center;
  width: 32%;
}
.list-content__memo {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
</style>
