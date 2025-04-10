<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { useCategoryStore } from '@/stores/categoryIcons.js'

const transactionStore = useTransactionStore()
// 카테고리 스토어
const categoryStore = useCategoryStore()

const selectedCategory = ref('')
const type = ref('전체')
const isIncomeClick = ref(false)
const isExpenseClick = ref(false)
const isCategoryClick = ref(true)

const props = defineProps({
  selectedMonth: String,
  currentMonth: Number,
  currentYear: Number,
})

// selectedMonth를 computed로 다시 구성해서 내부 반응형 유지
const selectedMonth = computed(
  () =>
    `${props.currentYear}-${props.currentMonth.toString().padStart(2, '0')}`,
)

function onClickIncome(month) {
  // console.log('income month:', month)
  isIncomeClick.value = !isIncomeClick.value
  if (isIncomeClick.value) {
    type.value = '수입'
    transactionStore.filterMonthIncome(month)
  } else {
    type.value = '전체'
    transactionStore.getTransactionInfo(month)
  }
}
function onClickExpense(month) {
  // console.log('expense month:', month)
  isExpenseClick.value = !isExpenseClick.value
  if (isExpenseClick.value) {
    type.value = '지출'
    transactionStore.filterMonthExpense(month)
  } else {
    type.value = '전체'
    transactionStore.getTransactionInfo(month)
  }
}
function onClickCategory(month, code) {
  // console.log('ctg month:', month)
  isExpenseClick.value = !isExpenseClick.value
  if (isCategoryClick.value) {
    // 카테고리 필터링된 리스트만 불러옴.
    transactionStore.filterCategoryList(month, code)
  } else {
    transactionStore.getTransactionInfo(month)
  }
}

watch(
  () => props.selectedMonth,
  newVal => {
    // 월이 변경되었을 때 수입 필터 초기화
    if (isIncomeClick.value) {
      isIncomeClick.value = false
      type.value = '전체'
      transactionStore.getTransactionInfo(newVal)
    }
  },
)

onMounted(() => {
  type.value = false
  categoryStore.getCategoryInfo()
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
        <select
          v-model="selectedCategory"
          @change="onClickCategory(selectedMonth, selectedCategory.code)"
        >
          <option
            v-for="(category, index) in categoryStore.categoryData"
            :key="index"
            :value="category"
            :code="category.code"
          >
            {{ category.name }}
          </option>
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
