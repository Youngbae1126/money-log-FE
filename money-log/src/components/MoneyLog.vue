<script setup>
import { useUserStore } from '@/stores/users'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import shopping from '@/assets/shopping.svg'
import trophy from '@/assets/trophy.svg'
import money from '@/assets/money.svg'

const userStore = useUserStore()
const API_URL = 'http://localhost:3000/log'
const userLogData = ref([])

// 유저 정보 가져오기
onMounted(() => {
  userStore.getUserInfo()
  getUserLog()
})

async function getUserLog() {
  try {
    const response = await axios.get(API_URL)
    userLogData.value = response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
</script>

<template>
  <div class="money-log__container">
    <div class="ml__container-top">
      <p class="ml__container-top__title">
        {{ userStore.nickname }}님의 머니로그
      </p>
      {{ userStore.nickname }}님의 한 달 소비를 분석한 리포트에요!
    </div>
    <div class="ml__container-bottom">
      <ul>
        <li v-for="log in userLogData.userLog" :key="log.id">
          <div class="ml-icon__box">
            <img
              :src="
                log.icon === 'shopping'
                  ? shopping
                  : log.icon === 'trophy'
                    ? trophy
                    : money
              "
              :alt="log.icon"
            />
            <div class="ml-icon__box__text">
              <p class="icon__box__title">{{ log.title }}</p>
              {{ log.description }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.money-log__container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.ml__container-top {
  display: flex;
  flex-direction: column;
  color: var(--gray-400);
  font-size: 1rem;
  font-weight: normal;
}
.ml__container-top__title {
  color: black;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 2.5rem;
}
.ml__container-bottom {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100%;
  padding: 0 2rem;
}
.ml-icon__box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.5rem;
}
.ml-icon__box img {
  width: 100px;
  margin-right: 1.2rem;
}
.ml-icon__box__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.icon__box__title {
  color: black;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 2rem;
}
</style>
