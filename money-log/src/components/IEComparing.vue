<template>
  <div class="p-4 border rounded-lg shadow-md w-96">
    <h2 class="text-lg font-bold mb-2">이번 달, 얼마 남았을까요?</h2>
    <h3>수입에서 소비를 뺀 금액이에요</h3>
    <p>
      총 수입: <strong>{{ totalIncome }}</strong> 원
    </p>
    <p>
      총 지출: <strong>{{ totalExpense }}</strong> 원
    </p>
    <p>
      차이:
      <strong
        :class="{
          'text-red-500': difference < 0,
          'text-green-600': difference >= 0,
        }"
      >
        {{ difference }}
      </strong>
      원
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'SummaryComponent',
  setup() {
    // 수입/지출 데이터
    const transactions = ref([
      { id: 1, type: 'income', amount: 300000 },
      { id: 2, type: 'expense', amount: 100000 },
      { id: 3, type: 'income', amount: 150000 },
      { id: 4, type: 'expense', amount: 50000 },
    ])

    // 계산된 값들
    const totalIncome = computed(() =>
      transactions.value
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
    )

    const totalExpense = computed(() =>
      transactions.value
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    )

    const difference = computed(() => totalIncome.value - totalExpense.value)

    return {
      transactions,
      totalIncome,
      totalExpense,
      difference,
    }
  },
}
</script>

<style lang="scss" scoped></style>
