<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 현재 날짜 기준 월 (YYYY-MM)
const now = new Date()
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

// 트랜잭션 데이터
const transactions = ref([])

// API 호출
onMounted(() => {
  axios
    .get('http://localhost:3001/transactions')
    .then(response => {
      transactions.value = response.data
    })
    .catch(error => {
      console.error('지출 데이터 불러오기 실패:', error)
    })
})

// 이번 달 지출만 필터링
const transactionsThisMonth = computed(() =>
  transactions.value.filter(
    t => t.type === 'expense' && t.date?.startsWith(currentMonth),
  ),
)

// 카테고리별 합계 계산
const categoryTotals = computed(() => {
  const map = {}
  transactionsThisMonth.value.forEach(t => {
    if (!map[t.category]) map[t.category] = 0
    map[t.category] += t.amount
  })
  return map
})

// 전체 지출 총합
const totalExpense = computed(() =>
  Object.values(categoryTotals.value).reduce((a, b) => a + b, 0),
)

// 상위 3개 카테고리 추출
const topCategories = computed(() => {
  return Object.entries(categoryTotals.value)
    .map(([category, total]) => ({
      category,
      total,
      percentage: totalExpense.value
        ? ((total / totalExpense.value) * 100).toFixed(1)
        : 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3)
})
</script>

<template>
  <div class="p-4 w-[400px] border rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">
      이번 달에는 {{ topCategories[0]?.category || '...' }}에 가장 많이
      쓰셨네요!
    </h2>
    <ul v-if="topCategories.length">
      <li
        v-for="(item, index) in topCategories"
        :key="index"
        class="mb-2 flex justify-between items-center"
      >
        <div>
          <span class="font-semibold">{{ item.category }}</span>
          <span class="text-gray-500 text-sm">({{ item.percentage }}%)</span>
        </div>
        <div>{{ (item.total || 0).toLocaleString() }} 원</div>
      </li>
    </ul>
    <p v-else>지출 내역이 없습니다.</p>
  </div>
</template>

<style scoped lang="scss"></style>
