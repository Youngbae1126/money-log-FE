<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 날짜 → 'YYYY-MM'
const now = new Date()
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

// 상태값
const goalAmount = ref(0)
const transactions = ref([])

// 데이터 로딩
onMounted(() => {
  // 목표 예산
  axios
    .get('http://localhost:3001/goal')
    .then(response => {
      const goalData = response.data
      if (goalData.month === currentMonth) {
        goalAmount.value = goalData.targetExpense
      }
    })
    .catch(error => {
      console.error('목표 예산 불러오기 실패:', error)
    })

  // 트랜잭션 내역
  axios
    .get('http://localhost:3001/transactions')
    .then(response => {
      transactions.value = response.data
    })
    .catch(error => {
      console.error('트랜잭션 불러오기 실패:', error)
    })
})

// 이번 달 지출만 필터링
const thisMonthExpenses = computed(() =>
  transactions.value.filter(
    t => t.type === 'expense' && t.date?.startsWith(currentMonth),
  ),
)

// 실제 지출 합계
const currentSpending = computed(() =>
  thisMonthExpenses.value.reduce((sum, item) => sum + item.amount, 0),
)

// 지출 비율 계산(정수부분까지만 표기)
const percentageUsed = computed(() => {
  if (goalAmount.value === 0) return 0
  const percent = (currentSpending.value / goalAmount.value) * 100
  return percent > 100 ? 100 : Math.floor(percent)
})
</script>

<template>
  <div class="GoalTracker">
    <p>목표 금액: {{ goalAmount.toLocaleString() }}원</p>
    <p>현재 지출: {{ currentSpending.toLocaleString() }}원</p>
    <p>사용 비율: {{ percentageUsed }}%</p>
  </div>
</template>

<style scoped>
.GoalTracker {
  font-family: sans-serif;
  padding: 1rem;
}
</style>
