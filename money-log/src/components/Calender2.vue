<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed } from 'vue'

// 🔧 날짜 비교 함수
const isSameDate = (d1, d2) => {
  return (
    new Date(d1).getFullYear() === new Date(d2).getFullYear() &&
    new Date(d1).getMonth() === new Date(d2).getMonth() &&
    new Date(d1).getDate() === new Date(d2).getDate()
  )
}

const transactions = ref([
  {
    type: '지출',
    amount: 50000,
    dates: [new Date(2025, 3, 8)],
    color: 'red',
  },
  {
    type: '수입',
    amount: 100000,
    dates: [new Date(2025, 3, 8)],
    color: 'blue',
  },
  {
    type: '수입',
    amount: 80000,
    dates: [new Date(2025, 3, 10)],
    color: 'blue',
  },
])

const attributes = computed(() => [
  ...transactions.value.map(transaction => ({
    dates: transaction.dates,
    dot: {
      color: transaction.color,
    },
    popover: {
      label: `${transaction.type} : ${transaction.amount.toLocaleString()}원`,
    },
    customData: transaction,
  })),
])

// 🔧 해당 날짜의 수입/지출 합계 구하는 함수
const getSummaryForDate = date => {
  const income = transactions.value
    .filter(tx => tx.type === '수입' && tx.dates.some(d => isSameDate(d, date)))
    .reduce((sum, tx) => sum + tx.amount, 0)

  const expense = transactions.value
    .filter(tx => tx.type === '지출' && tx.dates.some(d => isSameDate(d, date)))
    .reduce((sum, tx) => sum + tx.amount, 0)

  return { income, expense }
}

// 날짜 포맷 함수
const formatDate = date => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date)
}
</script>

<template>
  <div class="Calender">
    <VCalendar
      borderless
      expanded
      :attributes="attributes"
      class="calender bg-white"
    >
      <!-- 🔧 날짜 셀 안에 수입/지출 표시 -->
      <template #day-content="{ day }">
        <div class="text-xs text-center">
          <div class="font-semibold text-sm">{{ day.day }}</div>

          <!-- 날짜별 요약 표시 -->
          <div v-if="getSummaryForDate(day.date).income" class="text-green-600">
            +{{ getSummaryForDate(day.date).income.toLocaleString() }}
          </div>
          <div v-if="getSummaryForDate(day.date).expense" class="text-red-600">
            -{{ getSummaryForDate(day.date).expense.toLocaleString() }}
          </div>
        </div>
      </template>

      <!-- 툴팁에 날짜 + 수입/지출 상세 표시 -->
      <template #day-popover="{ day }">
        <div class="text-xs text-gray-700 dark:text-gray-300">
          {{ formatDate(day.date) }} <br />
          <span v-if="getSummaryForDate(day.date).income"
            >수입 :
            {{ getSummaryForDate(day.date).income.toLocaleString() }}원</span
          ><br v-if="getSummaryForDate(day.date).income" />
          <span v-if="getSummaryForDate(day.date).expense"
            >지출 :
            {{ getSummaryForDate(day.date).expense.toLocaleString() }}원</span
          >
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<style scoped>
::v-deep(.vc-header .vc-title) {
  background-color: #f0f9ff;
  color: #2563eb;
  font-weight: bold;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
