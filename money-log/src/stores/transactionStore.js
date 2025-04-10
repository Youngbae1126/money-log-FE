import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = 'http://localhost:5500/transactions'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    filteredTransactionData: [],
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
    // 전체 거래 내역 가져와서 오름차순 정렬, 월별 리스트 내역만 필터링
    async getTransactionInfo(month) {
      try {
        const res = await axios.get(API_URL)
        this.transactionData = res.data.sort(
          (item1, item2) => new Date(item1.date) - new Date(item2.date),
        )
        this.filteredTransactionData = this.transactionData.filter(item =>
          item.date.startsWith(month),
        )
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async getMonthIncomeTransaction(month) {
      console.log('실행')
      try {
        const res = await axios.get(API_URL)
        this.transactionData = res.data.filter(item =>
          item.date.startsWith(month),
        )
      } catch (error) {
        console.log(error)
      }
    },
    // async filterMonth(month) {
    //   this.filteredTransactionData = this.transactionData.filter(item =>
    //     item.date.startsWith(month),
    //   )
    // },
    // 선택된 월의 수입만 필터링
    filterMonthIncome(month) {
      console.log('오')
      this.filteredTransactionData = this.transactionData.filter(
        item => item.type === 'income' && item.date.startsWith(month),
      )
    },
    // 선택된 월의 지출만 필터링
    filterMonthExpense(month) {
      this.filteredTransactionData = this.transactionData.filter(
        item => item.type === 'expense' && item.date.startsWith(month),
      )
    },
    // 월 전체 데이터
    filterMonthAll(month) {
      this.filteredTransactionData = this.transactionData.filter(item =>
        item.date.startsWith(month),
      )
    },
  },
})
