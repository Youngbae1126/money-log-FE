<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useGoalStore } from '@/stores/goal'
import { useTransactionStore } from '@/stores/transactionStore'

const goalStore = useGoalStore()
const transactionStore = useTransactionStore()

// 날짜 → 'YYYY-MM'
const now = new Date()
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

// goalStore 내에 정의된 목표값을 가져옴
const goalAmount = ref(goalStore.targetExpense)
const transactions = ref([])

// 데이터 로딩
onMounted(() => {
  // 목표 예산
  axios
    .get('http://localhost:5500/goal')
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
    .get('http://localhost:5500/transactions')
    .then(response => {
      transactions.value = response.data
    })
    .catch(error => {
      console.error('트랜잭션 불러오기 실패:', error)
    })
})

// 아래 두 변수는 피니아 활용으로 필요 없음.
// 이번 달 지출만 필터링
// const thisMonthExpenses = computed(() =>
//   transactions.value.filter(
//     t => t.type === 'expense' && t.date?.startsWith(currentMonth),
//   ),
// )

// 실제 지출 합계
// const currentSpending = computed(() =>
//   thisMonthExpenses.value.reduce((sum, item) => sum + item.amount, 0),
// )

// 지출 비율 계산(정수부분까지만 표기)
const percentageUsed = computed(() => {
  if (goalAmount.value === 0) return 0
  const percent = (transactionStore.totalExpense / goalAmount.value) * 100
  return percent > 100 ? 100 : Math.floor(percent)
})

// 데이터 로딩
onMounted(() => {
  // axios
  //   .get('http://localhost:5500/goal')
  //   .then(response => {
  //     // const thisMonthGoal = response.data
  //     // thisMonthGoal.find(goal => goal.month === currentMonth)
  //     const thisMonthGoal = response.data.month
  //     if (thisMonthGoal) {
  //       goalAmount.value = goalStore.targetExpense
  //       currentSpending.value = goalStore.currentExpense
  //     }
  //   })
  //   .catch(error => {
  //     console.error('데이터 불러오기 실패:', error)
  //   })

  // 위에 있는 코드를 피니아의 store 활용
  goalStore.getGoalInfo()
  transactionStore.getTransactionInfo()
})
</script>

<template>
  <div class="GoalTracker">
    <p>목표 금액: {{ goalStore.targetExpense.toLocaleString() }}원</p>
    <p>현재 지출: {{ transactionStore.totalExpense.toLocaleString() }}원</p>
    <p>사용 비율: {{ percentageUsed }}%</p>
  </div>
</template>

<style scoped>
.GoalTracker {
  font-family: sans-serif;
  padding: 1rem;
}
</style>
