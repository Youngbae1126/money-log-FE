import axios from 'axios'
import { defineStore } from 'pinia'
import { errorMessages } from 'vue/compiler-sfc'

const API_URL = 'http://localhost:5500/transactions'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactionData: [],
  }),
  getters: {
    // 수입 계산
    totalIncome(state) {
      let filterData = state.transactionData.filter(
        item => item.type === 'income',
      )
      // reduce 함수 : 배열에서 값들을 누적해서 하나의 결과값으로 만들 때 사용하는 고급 배열 메서드
      // array.reduce((누적값, 현재값) => {  // 로직  return 새로운 누적값}, 초기값)
      return filterData.reduce((total, item) => total + item.amount, 0)
    },
    // 지출 계산
    totalExpense(state) {
      return state.transactionData
        .filter(item => item.type === 'expense')
        .reduce((sum, item) => sum + item.amount, 0)
    },
    // 수입 - 지출 계산
    remainAmount(state) {
      return (
        state.transactionData
          .filter(item => item.type === 'income')
          .reduce((sum, item) => sum + item.amount, 0) -
        state.transactionData
          .filter(item => item.type === 'expense')
          .reduce((sum, item) => sum + item.amount, 0)
      )
    },
  },
  actions: {
    async getTransactionInfo() {
      try {
        const response = await axios.get(API_URL)
        this.transactionData = response.data
      } catch (err) {
        console.log(errorMessages)
        throw err
      }
    },
  },
})
