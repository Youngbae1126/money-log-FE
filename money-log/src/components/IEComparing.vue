<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 현재 날짜 기준 월 구하기 → 'YYYY-MM' 형식
const now = new Date()
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

// 거래 목록
const transactions = ref([])

// 이번 달 거래만 필터링
const transactionsThisMonth = computed(() =>
  transactions.value.filter(t => t.date.startsWith(currentMonth)),
)

// 총 수입
const totalIncome = computed(() =>
  transactionsThisMonth.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0),
)

// 총 지출
const totalExpense = computed(() =>
  transactionsThisMonth.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0),
)

// 차이
const difference = computed(() => totalIncome.value - totalExpense.value)

// 데이터 불러오기
onMounted(() => {
  axios
    .get('http://localhost:5500/transactions')
    .then(response => {
      transactions.value = response.data
    })
    .catch(error => {
      console.error('거래 내역 불러오기 실패:', error)
    })
})
</script>

<template>
  <div class="IEComparing">
    <div class="info-wrapper">
      <span class="Title">
        <h2 class="text-lg font-bold mb-2">이번 달, 얼마 남았을까요</h2>
        <h3 class="mb-4 text-gray-500 font-normal">
          수입에서 소비를 뺀 금액이에요
        </h3>
      </span>
      <span class="Income">
        <p>
          수입 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <strong class="Income-value">
            {{ totalIncome.toLocaleString() }}원</strong
          >
        </p>
      </span>
      <span class="Outcome">
        <p>
          지출 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <strong class="Outcome-value">
            {{ totalExpense.toLocaleString() }}원</strong
          >
        </p>
      </span>
      <span class="Leftover">
        <p>
          남은 금액 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <strong
            class="Leftover-value"
            :class="{
              'text-red-500': difference < 0,
              'text-green-600': difference >= 0,
            }"
          >
            {{ difference.toLocaleString() }}원</strong
          >
        </p>
      </span>
    </div>
  </div>
</template>

<style scoped>
.IEComparing {
  padding-left: 2rem;
  padding-right: 3rem;
}
.info-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; /* 요소 간 간격 */
  justify-content: space-between;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.info-wrapper span {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  flex: 1; /* 동일한 너비 분배 */
  min-width: 150px;
  text-align: center;
}

.Title h2 {
  color: #000;
  font-weight: 900;
}

.Title h3 {
  color: #888;
  font-weight: 400;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.Income {
  font-weight: 900;
}

.Outcome {
  font-weight: 900;
}

.Leftover {
  font-weight: 900;
}

.Income-value {
  color: #007aff;
  font-weight: 900;
  text-shadow: 0.5px 0 currentColor;
}

.Outcome-value {
  color: #e25858;
  font-weight: 900;
  text-shadow: 0.5px 0 currentColor;
}

.Leftover-value {
  color: #509843;
  font-weight: 900;
  text-shadow: 0.5px 0 currentColor;
}
</style>
