<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 날짜 → 'YYYY-MM'
const now = new Date()
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

// 상태값
const goalAmount = ref(0)
const currentSpending = ref(0)

// 지출 비율 계산
const percentageUsed = computed(() => {
  if (goalAmount.value === 0) return 0
  const percent = (currentSpending.value / goalAmount.value) * 100
  return percent > 100 ? 100 : Math.floor(percent)
})

// 데이터 로딩
onMounted(() => {
  axios
    .get('http://localhost:3001/goal')
    .then(response => {
      const thisMonthGoal = response.data.find(
        goal => goal.month === currentMonth,
      )
      if (thisMonthGoal) {
        goalAmount.value = thisMonthGoal.targetExpense
        currentSpending.value = thisMonthGoal.currentExpense
      }
    })
    .catch(error => {
      console.error('데이터 불러오기 실패:', error)
    })
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
