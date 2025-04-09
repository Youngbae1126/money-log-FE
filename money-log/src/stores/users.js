import axios from 'axios'
import { defineStore } from 'pinia'
import { errorMessages } from 'vue/compiler-sfc'

const API_URL = 'http://localhost:5500/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    nickname: '홍길동',
    id: 0,
  }),
  getters: {},
  actions: {
    async getUserInfo() {
      ;(this.nickname = ''), (this.id = 0)

      try {
        const response = await axios.get(API_URL)
        this.nickname = response.data.nickname
        this.id = response.data.id
      } catch (error) {
        alert(errorMessages)
        throw error
      }
    },
  },
})
