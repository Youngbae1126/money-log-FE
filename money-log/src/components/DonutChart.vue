<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { computed } from 'vue'
import { useGoalStore } from '@/stores/goal'
import { useTransactionStore } from '@/stores/transactionStore'

ChartJS.register(ArcElement, Tooltip, Legend)

// Pinia store
const goalStore = useGoalStore()
const transactionStore = useTransactionStore()

// 현재 월 (예: '2025-04')
const currentMonth = new Date().toISOString().slice(0, 7)

// 해당 월 소비 금액만 계산
const currentMonthExpense = computed(() => {
  return transactionStore.monthTotalExpense(currentMonth)
})

// 목표 대비 소비 퍼센트
const percentage = computed(() => {
  const goal = goalStore.targetExpense
  const spend = currentMonthExpense.value
  if (!goal || goal <= 0) return 0
  return Math.min(Math.round((spend / goal) * 100), 100)
})

// 도넛 차트 데이터
const chartData = computed(() => {
  const goal = goalStore.targetExpense
  const spend = currentMonthExpense.value
  const remain = Math.max(goal - spend, 0) // 0 이상만 허용

  return {
    labels: ['소비', '남은 금액'],
    datasets: [
      {
        data: [spend, remain],
        backgroundColor: ['#facc15', '#d4d4d4'],
        borderWidth: 0,
      },
    ],
  }
})

// 도넛 차트 옵션
const chartOptions = {
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div class="donut-chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div class="chart-label">{{ percentage }}%</div>
  </div>
</template>

<style scoped>
.donut-chart-container {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto;
}

.chart-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 1rem;
  color: #feba17;
}
</style>
