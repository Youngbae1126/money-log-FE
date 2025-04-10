<script setup>
import { onMounted, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const transactionStore = useTransactionStore()

const props = defineProps({
  currentMonth: String,
  selectedMonth: String,
})

const selectedMonth = props.selectedMonth
const selectedCategory = ref('')
const type = ref('')
const isIncomeClick = ref(false)
const isExpenseClick = ref(false)

function onClickIncome(month) {
  isIncomeClick.value = !isIncomeClick.value
  console.log('isIncomeClick:', isIncomeClick)
  console.log('select month:', month)
  if (isIncomeClick.value) {
    type.value = '수입'
    transactionStore.filterMonthIncome(month)
  } else {
    type.value = '전체'
    transactionStore.getTransactionInfo(month)
  }
}
function onClickExpense(month) {
  isExpenseClick.value = !isExpenseClick.value
  console.log('isExpenseClick:', isExpenseClick)
  console.log('select month:', month)
  if (isExpenseClick.value) {
    type.value = '지출'
    transactionStore.filterMonthExpense(month)
  } else {
    type.value = '전체'
    transactionStore.getTransactionInfo(month)
  }
}

onMounted(() => {
  type.value = false
})
</script>

<template>
  <div>
    <!-- 필터 UI -->
    <div class="filter-container">
      <!-- 날짜 -->
      <div class="filter-box">
        <span>일자</span>
        <input type="date" v-model="selectedMonth" />
      </div>

      <!-- 카테고리 -->
      <div class="filter-box">
        <span>카테고리</span>
        <select v-model="selectedCategory">
          <option></option>
          <option>식비</option>
          <option>교통</option>
          <option>쇼핑</option>
          <option>기타</option>
        </select>
      </div>

      <button
        class="filter-btn"
        :class="{ active: type === '수입' }"
        @click="onClickIncome(selectedMonth)"
      >
        수입
      </button>
      <button
        class="filter-btn"
        :class="{ active: type === '지출' }"
        @click="onClickExpense(selectedMonth)"
      >
        지출
      </button>
    </div>
  </div>
</template>

<style scoped>
.ListFilter {
}
</style>

<script></script>

<style scoped>
body {
  font-family: 'Pretendard', sans-serif;
  margin: 0;
  background-color: #fdf1d7;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user img {
  width: 50px;
  height: 50px;
}

.user-name {
  font-weight: bold;
  font-size: 24px;
}

.user-name .suffix {
  font-size: 16px;
  font-weight: normal;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 150px;
  height: 150px;
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
</style>
