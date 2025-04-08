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
        <div>{{ item.total.toLocaleString() }} 원</div>
      </li>
    </ul>
    <p v-else>지출 내역이 없습니다.</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'TopCategoryExpense',

  setup() {
    // 임시 더미 데이터
    const transactions = ref([
      { id: 1, type: 'expense', category: '식비', amount: 30000 },
      { id: 2, type: 'expense', category: '교통', amount: 10000 },
      { id: 3, type: 'expense', category: '쇼핑', amount: 50000 },
      { id: 4, type: 'expense', category: '식비', amount: 20000 },
      { id: 5, type: 'expense', category: '교통', amount: 5000 },
      { id: 6, type: 'expense', category: '쇼핑', amount: 15000 },
      { id: 7, type: 'expense', category: '문화생활', amount: 12000 },
    ])

    // 카테고리별 합계 계산
    const categoryTotals = computed(() => {
      const map = {}
      transactions.value
        .filter(t => t.type === 'expense')
        .forEach(t => {
          if (!map[t.category]) {
            map[t.category] = 0
          }
          map[t.category] += t.amount
        })
      return map
    })

    // 전체 지출 합계
    const totalExpense = computed(() =>
      Object.values(categoryTotals.value).reduce((a, b) => a + b, 0),
    )

    // 상위 3개 카테고리 정렬 + 비율 계산
    const topCategories = computed(() => {
      return Object.entries(categoryTotals.value)
        .map(([category, total]) => ({
          category,
          total,
          percentage: ((total / totalExpense.value) * 100).toFixed(1),
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3)
    })

    return {
      topCategories,
    }
  },
}
</script>

<style lang="scss" scoped></style>
