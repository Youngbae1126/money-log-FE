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
    .get('http://localhost:5500/transactions')
    .then(response => {
      transactions.value = response.data
      assignColorsToCategories()
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

// 사용할 색상 팔레트 (카테고리 개수보다 많게 준비)
const colorPalette = ['#ef4444', '#facc15', '#22c55e', '#3b82f6', '#a855f7']

// 카테고리별 색상 매핑을 저장할 ref
const categoryColorMap = ref({})

// 카테고리에 색상 자동 매핑
function assignColorsToCategories() {
  const categories = [
    ...new Set(
      transactions.value.filter(t => t.type === 'expense').map(t => t.category),
    ),
  ]
  const map = {}
  categories.forEach((cat, i) => {
    map[cat] = colorPalette[i % colorPalette.length]
  })
  categoryColorMap.value = map
}
</script>

<template>
  <div class="most-spent p-4 w-[400px] rounded-lg shadow-md">
    <div class="wrapper">
      <h2 class="title mb-4">
        이번 달에는 <br />
        <span class="highlight">{{ topCategories[0]?.category || '...' }}</span
        >에 가장 많이 쓰셨네요!
      </h2>
      <ul v-if="topCategories.length">
        <li
          v-for="(item, index) in topCategories"
          :key="index"
          class="category-item flex justify-between items-center mb-3"
        >
          <div class="left flex items-center">
            <span
              class="dot"
              :style="{ backgroundColor: categoryColorMap[item.category] }"
            ></span>
            <span class="category-name">{{ item.category }}</span>
          </div>
          <div class="right">
            <span class="percentage">{{ item.percentage }}%</span>
          </div>
        </li>
      </ul>
      <p v-else>지출 내역이 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.most-spent {
  font-family: 'Pretendard', sans-serif;
}

.wrapper {
  margin: 1rem;
}

.title {
  text-align: center;
  font-size: 1rem;
  line-height: 1.8;
  font-weight: 900;
}

.highlight {
  color: #dc2626;
  font-size: 1rem;
  font-weight: 900;
  text-shadow: 0.8px 0 currentColor;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 2px;
  display: inline-block;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-name {
  font-size: 1rem;
  font-weight: 600;
}

.percentage {
  font-size: 0.8rem;
  color: #808080;
}

/* 동적으로 사용할 색상 클래스 */
.red {
  background-color: #e25858;
}
.yellow {
  background-color: #feba17;
}
.green {
  background-color: #509843;
}
.blue {
  background-color: #007aff;
}
.purple {
  background-color: #a855f7;
}
</style>
