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
    // 렌더링 될 데이터 개수 계산
    countTransactionData: state => {
      return month => {
        return state.filteredTransactionData.filter(item =>
          item.date.startsWith(month),
        ).length
      }
    },
    // 전체 수입 계산
    totalIncome(state) {
      let filterData = state.transactionData.filter(
        item => item.type === 'income',
      )
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
    // 수입 - 지출 (차액) 계산
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
    // 선택된 월의 수입만 필터링
    filterMonthIncome(month) {
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
    // 선택된 월의 카테고리별 필터링
    filterCategoryList(month, code) {
      console.log('카테고리 실행!')
      console.log(code)
      this.filteredTransactionData = this.transactionData.filter(
        item => item.date.startsWith(month) && item.code === code,
      )
    },
  },
})
