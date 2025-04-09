<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import MoneyLog from '@/components/MoneyLog.vue'
import { useGoalStore } from '@/stores/goal'
import { useTransactionStore } from '@/stores/transactionStore'
import { useUserStore } from '@/stores/users'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const userStore = useUserStore()
const goalStore = useGoalStore()
const transactionStore = useTransactionStore()
const newGoalAmount = ref('')
const newNickname = ref('')

// 유저, 목표 정보 가져오기
onMounted(() => {
  userStore.getUserInfo()
  goalStore.getGoalInfo()
  transactionStore.getTransactionInfo()
})

// 목표 금액 업데이트
const updateGoal = async () => {
  if (!newGoalAmount.value) return

  try {
    // 현재 goal 데이터 가져오기
    const { data: currentGoal } = await axios.get('http://localhost:5500/goal')

    // 새로운 targetExpense로 업데이트
    await axios.put('http://localhost:5500/goal', {
      ...currentGoal,
      targetExpense: Number(newGoalAmount.value),
    })

    // store 업데이트
    goalStore.targetExpense = Number(newGoalAmount.value)
    newGoalAmount.value = ''
  } catch (error) {
    console.error('목표 금액 업데이트 실패:', error)
  }
}

// 닉네임 업데이트
const updateNickname = async () => {
  if (!newNickname.value) return

  try {
    // 현재 user 데이터 가져오기
    const { data: currentUser } = await axios.get('http://localhost:5500/user')

    // 새로운 닉네임으로 업데이트
    await axios.put('http://localhost:5500/user', {
      ...currentUser,
      nickname: newNickname.value,
    })

    // store 업데이트
    userStore.nickname = newNickname.value
    newNickname.value = ''
  } catch (error) {
    console.error('닉네임 업데이트 실패:', error)
  }
}
</script>

<template>
  <div>
    <div class="mypage__top-container">
      <div class="mypage__top-container-title">
        <div class="top-container-title__logo">
          <RouterLink to="/"
            ><img src="../assets/logo.svg" alt="로고" id="logo"
          /></RouterLink>
        </div>
        <div class="top-container-title">
          <div class="top-container-title__text">
            <p>쇼핑에 살고 죽는 쇼핑왕,</p>
            <p>{{ userStore.nickname }}님!</p>
          </div>
          <img
            src="../assets/profile-icon.svg"
            alt="pig아이콘"
            id="user__icon"
          />
        </div>
      </div>
    </div>
    <div class="mypage__bottom-container">
      <div class="bottom-container-left">
        <div class="goal__container">
          <p class="goal__container-title">목표 금액을 설정하세요</p>
          이번 달의 소비 목표 금액을 설정해보세요
          <p class="current-goal__text">
            현재 목표 금액&nbsp; :&nbsp;
            {{ goalStore.targetExpense.toLocaleString() }}&nbsp;원
          </p>
          <div class="goal__input-box">
            ￦
            <input
              type="number"
              name="goal"
              min="1"
              placeholder="목표 금액을 입력하세요"
              v-model="newGoalAmount"
            />
            <button class="goal-update-btn" @click="updateGoal">설정</button>
          </div>
        </div>
        <div class="nickname__container">
          <div class="nickname__text">
            <p class="nickname__title">닉네임을 변경하시겠어요?</p>
            자신만의 독특한 닉네임을 만들어보세요
          </div>
          <div class="nickname__input-box">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              v-model="newNickname"
            />
            <button class="nickname-update-btn" @click="updateNickname">
              설정
            </button>
          </div>
        </div>
      </div>
      <div class="bottom-container-right">
        <MoneyLog />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mypage__top-container {
  height: 500px;
  background-image: url('../assets/mypage-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.mypage__top-container-title {
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  height: 100%;
  margin: auto;
  padding: 2rem;
  align-items: center;
}
.top-container-title__logo {
  display: flex;
  justify-content: end;
  align-items: center;
  max-width: 1280px;
  width: 100%;
}
.mypage__top-container-title #logo {
  width: 100px;
  position: relative;
  right: 3rem;
}
.top-container-title {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  padding-top: 3rem;
  max-width: 1280px;
  width: 100%;
}
.top-container-title #user__icon {
  position: relative;
  top: 1.5rem;
  right: 3rem;
  width: 380px;
}
.top-container-title__text {
  padding-top: 1.5rem;
}
.top-container-title__text > p:nth-child(1) {
  color: var(--main-color);
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
.top-container-title__text > p:nth-child(2) {
  color: var(--sub-color1);
  font-size: 5.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
.mypage__bottom-container {
  display: flex;
  max-width: 1280px;
  margin: auto;
  padding: 2rem;
  /* gap: 4rem; */
  justify-content: space-between;
}
.bottom-container-left {
  display: flex;
  flex-direction: column;
  flex-grow: 0.4;
  padding-left: 2rem;
}
.goal__container {
  display: flex;
  flex-direction: column;
  flex-grow: 0.5;
  padding: 2rem;
  font-weight: 400;
  font-size: 1rem;
  color: var(--gray-400);
}
.goal__container-title {
  color: black;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2.5rem;
}
.current-goal__text {
  color: var(--green-500);
  font-size: 1rem;
  font-weight: 800;
  margin-top: 2rem;
}
.goal__input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  box-shadow: 1px 2px 2px rgba(109, 109, 109, 0.3);
  padding: 0.8rem;
  margin-top: 0.5rem;
  width: 100%;
  color: var(--gray-400);
  font-size: 1.2rem;
  font-weight: 800;
}

/* 숫자 입력 화살표 제거 */
.goal__input-box > input::-webkit-outer-spin-button,
.goal__input-box > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.goal__input-box > input[type='number'] {
  -moz-appearance: textfield;
}

.goal-update-btn,
.nickname-update-btn {
  width: 5rem;
  padding: 0.7rem;
  background-color: #feba17;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}
.goal-update-btn:hover,
.nickname-update-btn:hover {
  background-color: #ffedcb;
}
/* 닉네임 수정 버튼 관련 스타일 */
.nickname__input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  box-shadow: 1px 2px 2px rgba(109, 109, 109, 0.3);
  padding: 0.8rem;
  margin-top: 0.5rem;
  width: 100%;
  color: var(--gray-400);
  font-size: 1.2rem;
  font-weight: 800;
}
.goal__input-box > input,
.nickname__input-box > input {
  width: 100%;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}
.nickname__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;
  font-weight: 400;
  font-size: 1rem;
  color: var(--gray-400);
}
.nickname__text {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
.nickname__title {
  color: black;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2.5rem;
}
.bottom-container-right {
  display: flex;
  /* flex-grow: 1; */
  padding: 2rem 0;
  padding-right: 4rem;
}
</style>
