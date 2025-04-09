<script setup>
import { onMounted } from 'vue'
import { useGoalStore } from '@/stores/goal'
import { useTransactionStore } from '@/stores/transactionStore'
import DonutChart from './DonutChart.vue'

const goalStore = useGoalStore()
const transactionStore = useTransactionStore()

// 필요한 데이터 로딩은 store의 메서드로
onMounted(() => {
  goalStore.getGoalInfo()
  transactionStore.getTransactionInfo()
})
</script>

<template>
  <div class="GoalTracker">
    <h2 class="title">목표 금액까지, <span class="highlight">이만큼</span></h2>
    <br />
    <!-- props 넘기지 않고, DonutChart는 내부적으로 store 사용 -->
    <DonutChart />
    <div class="text-wrap">
      <div class="label">
        <p class="label-name">목표금액</p>
        <span class="label-value goal">
          {{ goalStore.targetExpense.toLocaleString() }}원
        </span>
      </div>
      <div class="label">
        <p class="label-name">현재까지의 소비</p>
        <span class="label-value nowspend">
          {{ transactionStore.totalExpense.toLocaleString() }}원
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.GoalTracker {
  font-family: 'Pretendard', sans-serif;
  padding: 1rem;
  text-align: center;
}

.title {
  text-align: center;
  font-size: 1rem;
  line-height: 1.8;
  font-weight: 900;
}

.highlight {
  color: #f5b63c;
  font-weight: 900;
  text-shadow: 0.8px 0 currentColor;
}

/* 하단 정렬을 위한 flex 적용 */
.text-wrap {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.label {
  display: flex;
  justify-content: space-between;
  width: 240px;
}

.label-name {
  font-weight: 900;
  font-size: 0.95rem;
  margin: 0;
}

.label-value {
  font-weight: 600;
  font-size: 0.8rem;
}

.goal {
  color: #4c4539;
}

.nowspend {
  color: #feba17;
}
</style>
