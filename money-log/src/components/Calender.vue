<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const transactionStore = useTransactionStore()
const today = ref(new Date())
const PageAddress = ref({})

onMounted(() => {
  transactionStore.getTransactionInfo()
  // 대시보드에 항상 이번 달이 뜨도록 하기 위한 설정 값
  today.value = new Date()
  PageAddress.value = {
    day: today.value.getDate(),
    week: 1,
    month: today.value.getMonth() + 1,
    year: today.value.getFullYear(),
  }
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

const calendarYear = ref(2025)
const calendarMonth = ref(4)
function onPageUpdate(pages) {
  calendarYear.value = pages[0].year
  calendarMonth.value = pages[0].month // 1월이면 0, 2월이면 1이 아님! → 1부터 시작함
}
</script>

<template>
  <div class="Calender">
    <VCalendar
      borderless
      expanded
      :attributes="attributes"
      class="calender"
      :key="today"
      :initial-page="PageAddress"
      @update:pages="onPageUpdate"
    >
      <template #day-content="{ day }">
        <div>
          <RouterLink :to="`/list/${calendarYear}/${calendarMonth}`">
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
          </RouterLink>
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<style scoped>
.Calender {
  background-color: white;
  border-radius: 3rem;
  padding: 3em;
  box-shadow: 0 0 2.5rem var(--gray-200);
}

::v-deep(.vc-header .vc-title) {
  background-color: white;
  color: var(--main-color);
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
::v-deep(.vc-header button) {
  background-color: transparent;
  color: var(--main-color);
}
::v-deep(.vc-nav-header button) {
  background-color: transparent;
  color: var(--main-color);
}
::v-deep(.vc-nav-items button) {
  background-color: transparent;
  color: var(--brown-500);
  font-size: 0.7rem;
}
::v-deep(.vc-nav-items .is-active) {
  background-color: var(--brown-500);
  border-radius: 1rem;
  color: white;
}
::v-deep(.vc-weekdays) {
  margin: 2rem 0;
}
::v-deep(.vc-weekdays > *) {
  color: var(--brown-700);
  font-size: 1rem;
}
::v-deep(.vc-day) {
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--gray-400);
}
.custom-day-content {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
</style>
