<template>
  <div class="p-6 w-[400px] border rounded-xl shadow-md space-y-4">
    <h2 class="text-lg font-bold">목표 금액까지는, 이만큼</h2>

    <!-- 퍼센트 진행 바 -->
    <div class="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
      <div
        class="bg-red-400 h-full transition-all duration-300"
        :style="{ width: percentageUsed + '%' }"
      ></div>
    </div>

    <!-- 텍스트 정보 -->
    <div class="text-sm space-y-1">
      <p>
        목표 금액: <strong>{{ goalAmount.toLocaleString() }}</strong> 원
      </p>
      <p>
        현재 소비 금액:
        <strong>{{ currentSpending.toLocaleString() }}</strong> 원
      </p>
      <!--얘를 원형 차트로 만들어야 하는데 어려움.. -->
      <p>
        사용률: <strong>{{ percentageUsed }}%</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalTracker',
  data() {
    return {
      // 임시 데이터 (나중에 JSON 서버로 대체 예정)
      goalAmount: 1000000, // 목표 100만원
      currentSpending: 420000, // 현재 소비 42만원
    }
  },
  computed: {
    percentageUsed() {
      const percent = (this.currentSpending / this.goalAmount) * 100
      return percent > 100 ? 100 : Math.floor(percent)
    },
  },
}
</script>

<style scoped></style>
