<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.getTransactionInfo()
})

// transactionStore에 있는 data 가져와서 캘린더에 사용할 데이터에 매칭 시켜줌
const transactions = computed(() =>
  transactionStore.transactionData.map(item => ({
    description: `${item.type === 'income' ? '+' : '-'} ${item.amount}`,
    dates: [new Date(item.date)],
    color: item.type === 'income' ? 'blue' : 'red',
    id: item.id,
  })),
)

// 캘린더 내에서 사용될 attribute 설정
const attributes = computed(() => [
  ...transactions.value.map(transaction => ({
    dates: transaction.dates,
    theme: transaction.color,
    content: transaction.description,
    popover: true,
  })),
])

// 거래내역에 있는 날짜와 캘린더 상의 날짜가 같은 attribute만 반환
function getAttributesForDate(date) {
  return attributes.value.filter(attr =>
    attr.dates.some(d => isSameDate(d, date)),
  )
}

// 날짜 비교 함수 (년, 월, 일이 같으면 같은 날짜로 간주)
// 단, 거래내역에 있는 날짜 형식이 YYYY-MM-DD 형식이어야 함.
function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
</script>

<template>
  <div class="Calender">
    <VCalendar borderless expanded :attributes="attributes" class="calender">
      <template #day-content="{ day }">
        <div>
          <div class="fw-semibold text-center">
            {{ day.day }}
          </div>
          <div
            v-for="attr in getAttributesForDate(day.date)"
            :key="attr.id"
            :style="{ color: attr.theme }"
            class="custom-day-content"
          >
            {{ attr.content }}
          </div>
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<style scoped>
::v-deep(.vc-header .vc-title) {
  background-color: var(--yellow-100);
  color: var(--main-color);
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
::v-deep(.vc-header button) {
  background-color: var(--yellow-100);
  color: var(--main-color);
}
::v-deep(.vc-nav-header button) {
  background-color: var(--yellow-100);
  color: var(--main-color);
}
::v-deep(.vc-nav-items button) {
  background-color: var(--yellow-100);
  color: var(--brown-500);
}
::v-deep(.vc-nav-items .is-active) {
  background-color: var(--brown-500);
  color: white;
}
::v-deep(.vc-weekdays) {
  margin: 1.5rem 0;
}
::v-deep(.vc-weekdays > *) {
  color: var(--brown-500);
  font-size: 1.2rem;
}
::v-deep(.vc-day) {
  text-align: center;
  padding: 0.5rem;
  font-size: 1.2rem;
}
.custom-day-content {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
</style>
