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

const transactionData = ref({})
// 페이지가 마운트될 때 URL에 있는 id의 거래 내역 데이터를 불러 옴
const API_URL = 'http://localhost:5500/transactions'
onMounted(async () => {
  // 스크롤을 맨 위로 이동
  window.scrollTo(0, 0)
  try {
    const res = await axios.get(`${API_URL}/${transactionId}`)
    transactionData.value = res.data
  } catch (error) {
    console.log('데이터 요청 실패: ', error)
  }
})
</script>

<template>
  <div class="transaction-detail">
    <DetailBackground
      :userName="user"
      :amount="amount"
      :type="type"
      :date="date"
      :transactionData="transactionData"
    >
      <DetailCenter
        :category="category"
        :date="date"
        :content="content"
        :type="type"
        :id="Number(transactionId)"
        :amount="amount"
        :transactionData="transactionData"
      />
    </DetailBackground>
  </div>
</template>

<style scoped>
.transaction-detail {
  position: relative;
  max-height: 630px;
}
</style>
