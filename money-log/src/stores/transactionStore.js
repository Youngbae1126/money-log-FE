import axios from 'axios'
import { defineStore } from 'pinia'
import { errorMessages } from 'vue/compiler-sfc'

const API_URL = 'http://localhost:5500/transactions'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactionData: [],
    month: '',
  }),
  getters: {
    // 월별 데이터 개수 계산
    countTransactionData: state => {
      return month => {
        return state.transactionData.filter(item => item.date.startsWith(month))
          .length
      }
    },
    // 수입 계산
    totalIncome(state) {
      let filterData = state.transactionData.filter(
        item => item.type === 'income',
      )
      // reduce 함수 : 배열에서 값들을 누적해서 하나의 결과값으로 만들 때 사용하는 고급 배열 메서드
      // array.reduce((누적값, 현재값) => {  // 로직  return 새로운 누적값}, 초기값)
      return filterData.reduce((total, item) => total + item.amount, 0)
    },
    // 월별 수입 계산
    monthTotalIncome: state => {
      return month => {
        const incomeFilterData = state.transactionData.filter(
          item => item.type === 'income' && item.date.startsWith(month),
        )
        const total = incomeFilterData.reduce(
          (sum, item) => sum + item.amount,
          0,
        )
        return total
      }
    },
    // 지출 계산
    totalExpense(state) {
      return state.transactionData
        .filter(item => item.type === 'expense')
        .reduce((sum, item) => sum + item.amount, 0)
    },
    // 월별 지출 계산
    monthTotalExpense: state => {
      return month => {
        const expenseFilterData = state.transactionData.filter(
          item => item.type === 'expense' && item.date.startsWith(month),
        )
        const total = expenseFilterData.reduce(
          (sum, item) => sum + item.amount,
          0,
        )
        return total
      }
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
    // 특정 월('YYYY-MM')에 해당하는 거래 내역 필터링
    monthFilterList(state) {
      return month => {
        return state.transactionData.filter(item => item.date.startsWith(month))
      }
    },
  },
  actions: {
    // 전체 거래 내역 가져오기
    async getTransactionInfo() {
      try {
        const response = await axios.get(API_URL)
        this.transactionData = response.data
      } catch (err) {
        console.log(errorMessages)
        throw err
      }
    },
    // 선택된 월별 필터링된 거래내역 오름차순 정렬
    async getMonthTransaction(month) {
      this.month = month.slice(5, 7)
      try {
        const res = await axios.get(API_URL)
        this.transactionData = res.data
          .filter(item => item.date.startsWith(month))
          .sort((item1, item2) => {
            new Date(item1.date) - new Date(item2.date)
          })
      } catch (error) {
        console.log(error)
      }
    },
    //
    async getMonthIncomeTransaction(month) {
      this.month = month.slice(5, 7)
      try {
        const res = await axios.get(API_URL)
        this.transactionData = res.data
          .filter(item => item.date.startsWith(month))
          .filter(item => item.type === 'income')
          .sort((item1, item2) => {
            new Date(item1.date) - new Date(item2.date)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
})
