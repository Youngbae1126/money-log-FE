<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import DetailBackground from '@/components/DetailBackground.vue'
import DetailCenter from '@/components/DetailCenter.vue'

const route = useRoute()
const transactionId = route.params.id

// 거래 내역 데이터를 담을 변수
const user = ref('')
const amount = ref(0)
const category = ref('')
const date = ref('')
const content = ref('')
const type = ref('') // 'income' 또는 'expense'

// 페이지가 마운트될 때 거래 데이터를 API에서 불러 옴
onMounted(async () => {
  // 스크롤을 맨 위로 이동
  window.scrollTo(0, 0)
  try {
    // 모든 거래 내역을 가져온 후 해당 ID의 거래를 찾음
    const res = await axios.get('http://localhost:5500/transactions')
    const transactions = res.data
    const data = transactions.find(t => t.id === Number(transactionId))

    if (!data) {
      throw new Error('해당 거래 내역을 찾을 수 없습니다.')
    }
    amount.value = data.amount
    category.value = data.category
    date.value = data.date
    content.value = data.content
    type.value = data.type // type 데이터 추가
  } catch (error) {
    console.error('데이터를 불러오는 데 실패했습니다:', error)
  }
})
</script>

<template>
  <div class="transaction-detail">
    <DetailBackground :userName="user" :amount="amount">
      <DetailCenter
        :category="category"
        :date="date"
        :content="content"
        :type="type"
        :id="Number(transactionId)"
        :amount="amount"
      />
    </DetailBackground>
  </div>
</template>

<style scoped>
.transaction-detail {
  position: relative;
  overflow: hidden;
}
</style>
