import axios from 'axios'
import { defineStore } from 'pinia'
import { errorMessages } from 'vue/compiler-sfc'

const API_URL = 'http://localhost:3000/transactions'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    // id: '',
    // type: '',
    // category: '',
    // content: '',
    // date: '',
    // amount: 0,
    transactionData: [],
  }),
  getters: {},
  actions: {
    async getTransactionInfo() {
      try {
        const response = await axios.get(API_URL)
        this.transactionData = response.data
        // this.id = response.data.id
        // this.type = response.data.type
        // this.category = response.data.category
        // this.content = response.data.content
        // this.date = response.data.date
        // this.amount = response.data.amount
      } catch (err) {
        console.log(errorMessages)
        throw err
      }
    },
  },
})
