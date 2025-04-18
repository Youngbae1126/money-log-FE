import eatIcon from '@/assets/eat.svg'
import marketIcon from '@/assets/market.svg'
import moneyIcon from '@/assets/money.svg'
import shoppingIcon from '@/assets/shopping.svg'
import drinkIcon from '@/assets/drink.svg'
import cafeIcon from '@/assets/cafe.svg'
import medicalIcon from '@/assets/medical.svg'
import hobbyIcon from '@/assets/hobby.svg'
import taxIcon from '@/assets/tax.svg'
import carIcon from '@/assets/car.svg'
import tripIcon from '@/assets/trip.svg'
import eduIcon from '@/assets/edu.svg'
import atmIcon from '@/assets/atm.svg'
import beautyIcon from '@/assets/beauty.svg'
import eventIcon from '@/assets/event.svg'
import defaultIcon from '../assets/profile-icon.svg'
import { defineStore } from 'pinia'
import axios from 'axios'

// 카테고리 코드와 아이콘 매핑
export const categoryIcons = {
  eat: eatIcon,
  market: marketIcon,
  money: moneyIcon,
  shopping: shoppingIcon,
  drink: drinkIcon,
  cafe: cafeIcon,
  medical: medicalIcon,
  hobby: hobbyIcon,
  tax: taxIcon,
  car: carIcon,
  trip: tripIcon,
  edu: eduIcon,
  atm: atmIcon,
  beauty: beautyIcon,
  event: eventIcon,
  default: defaultIcon,
}

// 카테고리 데이터에 아이콘 정보 추가
export const addIconsToCategories = categories => {
  return categories.map(category => ({
    ...category,
    icon: categoryIcons[category.code] || null,
  }))
}

// 카테고리 코드로 아이콘 가져오기
export const getCategoryIcon = code => {
  return categoryIcons[code] || defaultIcon
}

const API_URL = 'http://localhost:5500/categories'
export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    code: 'money',
    categoryData: [],
  }),
  getters: {},
  actions: {
    async getCategoryInfo() {
      const response = await axios.get(API_URL)
      // console.log(response.data)
      this.categoryData = response.data
    },
  },
})
