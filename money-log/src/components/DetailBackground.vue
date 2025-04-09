<template>
  <div class="detail-background">
    <div class="detail-background__top">
      <div class="detail-background__desc">
        해당 거래 내역의 상세 페이지예요
      </div>
      <div class="detail-background__amount">
        <span class="detail-background__amount-number">
          {{ formattedAmount }}
        </span>
        <span class="detail-background__amount-text">
          원 {{ incomeText }}
        </span>
      </div>
    </div>

    <div class="detail-background__content">
      <slot></slot>
    </div>

    <img
      src="../assets/profile-icon.svg"
      alt="저금통"
      class="transaction-detail__pig"
    />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  props: {
    userName: String,
    amount: Number,
    isIncome: [Boolean, String],
  },
  setup(props) {
    const { amount, isIncome } = toRefs(props)

    const formattedAmount = computed(() => {
      return amount.value ? amount.value.toLocaleString() : '0'
    })

    const incomeText = computed(() => {
      return String(isIncome.value).toLowerCase() === 'true'
        ? '버셨어요!'
        : '쓰셨네요!'
    })

    return { formattedAmount, incomeText }
  },
}
</script>

<style scoped>
.detail-background {
  position: relative;
  min-height: 100%;
  padding: 64px 0;
}

.detail-background__desc {
  margin-top: 8px;
  font-size: 16px;
  color: var(--sub-color2);
}

.detail-background__amount {
  font-size: 60px;
  font-weight: bold;
  margin-top: 14px;
}

.detail-background__amount-number {
  color: var(--main-color);
  margin-right: 4px;
}

.detail-background__amount-text {
  color: #000000;
}

.detail-background__content {
  margin-top: 48px;
}

.transaction-detail__pig {
  position: absolute;
  bottom: 0;
  right: 0;
  width: clamp(180px, 35vw, 400px);
  height: auto;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}
</style>
