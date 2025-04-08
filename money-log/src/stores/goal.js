import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = 'http://localhost:3000/goal'

export const useGoalStore = defineStore('goal', {
  state: () => ({
    month: '2025-04',
    currentExpense: 100000,
    targetExpense: 200000,
  }),
  getters: {},
  actions: {
    async getGoalInfo() {
      ;(this.nickname = ''), (this.id = 0)

      try {
        const response = await axios.get(API_URL)
        this.month = response.data.month
        this.currentExpense = response.data.currentExpense
        this.targetExpense = response.data.targetExpense
      } catch (error) {
        console.log(error)
      }
    },
    async postGoal() {},
  },
})
