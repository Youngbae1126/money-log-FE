<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { computed } from 'vue'
import { useGoalStore } from '@/stores/goal'
import { useTransactionStore } from '@/stores/transactionStore'

ChartJS.register(ArcElement, Tooltip, Legend)

// Pinia store 사용
const goalStore = useGoalStore()
const transactionStore = useTransactionStore()

// 목표 대비 소비 퍼센트
const percentage = computed(() => {
  if (!goalStore.targetExpense) return 0
  return Math.min(
    Math.round((transactionStore.totalExpense / goalStore.targetExpense) * 100),
    100,
  )
})

// 차트 데이터
const chartData = computed(() => ({
  labels: ['소비', '남은 금액'],
  datasets: [
    {
      data: [
        transactionStore.totalExpense,
        goalStore.targetExpense - transactionStore.totalExpense,
      ],
      backgroundColor: ['#facc15', '#d4d4d4'],
      borderWidth: 0,
    },
  ],
}))

// 차트 옵션
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