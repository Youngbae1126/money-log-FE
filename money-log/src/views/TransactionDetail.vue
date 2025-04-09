<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import DetailBackground from '@/components/DetailBackground.vue'
import DetailCenter from '@/components/DetailCenter.vue'

export default {
  components: {
    DetailBackground,
    DetailCenter,
  },
  setup() {
    const route = useRoute()
    const transactionId = route.params.id

    const user = ref('홍길동')
    const amount = ref(0)
    const category = ref('')
    const date = ref('')
    const memo = ref('')

    onMounted(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/transactions/${transactionId}`,
        )
        const data = res.data

        amount.value = data.amount
        category.value = data.category
        date.value = data.date
        memo.value = data.content
      } catch (error) {
        console.error('데이터 불러오기 실패:', error)
      }
    })

    return { user, amount, category, date, memo }
  },
}
</script>

<template>
  <div class="transaction-detail">
    <DetailBackground :userName="user" :amount="amount">
      <DetailCenter :category="category" :date="date" :memo="memo" />
    </DetailBackground>
  </div>
</template>

<style scoped>
.transaction-detail {
  min-height: 100vh;
  padding: 64px 48px;
  background-image: url('@/assets/detail-background-color.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  z-index: -1;
  margin-top: -80px;
  padding-top: 48px;
}
</style>
