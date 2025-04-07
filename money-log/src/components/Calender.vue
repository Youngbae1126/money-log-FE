<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed } from 'vue'

const transactions = ref([
  {
    description: '지출 : 50,000',
    dates: [new Date(2025, 3, 8)],
    color: 'red',
  },
  {
    description: '수입 : 100,000',
    dates: [new Date(2025, 3, 8).toLocaleDateString()],
    color: 'blue',
  },
])

const attributes = computed(() => [
  // Attributes for transactions
  ...transactions.value.map(transaction => ({
    dates: transaction.dates,
    popover: {
      label: transaction.description,
    },
    customData: transaction,
  })),
])

// 날짜 포맷 함수
// const formatDate = date => {
//   return new Intl.DateTimeFormat('ko-KR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     weekday: 'long',
//   }).format(date)
// }
</script>

<template>
  <div class="Calender">
    <VCalendar expanded :attributes="attributes" class="calender bg-white">
      <template #day-content="{ day }">
        <div class="text-xs text-gray-700 dark:text-gray-300">
          <!-- {{ day.date }} -->
          <div class="fw-semibold text-center">
            {{ day.day }}
          </div>
          <div class="custom-day-content">
            +100,000<br />
            -50,000
          </div>
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
::v-deep(.vc-weekdays) {
  margin: 1.5rem 0;
}
::v-deep(.vc-weekdays > *) {
  color: blue;
  font-size: 1.2rem;
}
::v-deep(.vc-day) {
  text-align: center;
}
.custom-day-content {
  margin: 0.5rem 0;
  font-size: 0.8rem;
}
</style>
