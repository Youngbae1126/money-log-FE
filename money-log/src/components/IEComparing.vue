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
    .get('http://localhost:3001/transactions')
    .then(response => {
      transactions.value = response.data
    })
    .catch(error => {
      console.error('거래 내역 불러오기 실패:', error)
    })
})
</script>

<template>
  <div class="IEComparing p-4 border rounded-lg shadow-md w-96">
    <h2 class="text-lg font-bold mb-2">
      {{ currentMonth }}에는 얼마 남았을까요?
    </h2>
    <h3 class="mb-4">수입에서 소비를 뺀 금액이에요</h3>

    <p>
      총 수입: <strong>{{ totalIncome.toLocaleString() }}</strong> 원
    </p>
    <p>
      총 지출: <strong>{{ totalExpense.toLocaleString() }}</strong> 원
    </p>
    <p>
      차이:
      <strong
        :class="{
          'text-red-500': difference < 0,
          'text-green-600': difference >= 0,
        }"
      >
        {{ difference.toLocaleString() }}
      </strong>
      원
    </p>
  </div>
</template>

<style scoped>
.IEComparing {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
