<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import MoneyLog from '@/components/MoneyLog.vue'
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
            <p>홍길동님!</p>
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
            현재 목표 금액&nbsp; :&nbsp; 100,000원
          </p>
          <div class="goal__input-box">
            ￦
            <input
              type="number"
              name="goal"
              min="1"
              placeholder="목표 금액을 입력하세요"
            />
          </div>
        </div>
        <div class="theme__container">
          <div class="theme__text">
            <p class="theme__title">테마를 변경하시겠어요?</p>
            아래의 버튼을 누르면 모드가 변경됩니다
          </div>
          <div class="theme__btn-box">
            <button class="light-mode__btn">라이트모드</button>
            <button class="dark-mode__btn">다크모드</button>
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
  margin-top: 1.5rem;
  width: 100%;
  color: var(--gray-400);
  font-size: 1.2rem;
  font-weight: 800;
}
.goal__input-box > input {
  width: 100%;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}
.theme__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;
  font-weight: 400;
  font-size: 1rem;
  color: var(--gray-400);
}
.theme__text {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
.theme__title {
  color: black;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2.5rem;
}
.theme__btn-box {
  display: flex;
  flex-grow: 0.8;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
}
.theme__btn-box button {
  width: 100%;
  padding: 0.7rem 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 400;
  background-color: #f6f6f6;
  border: 1px solid var(--gray-300);
  color: black;
}
.light-mode__btn:hover {
  background-color: var(--yellow-100);
  border: 1px solid var(--yellow-100);
}
.dark-mode__btn:hover {
  background-color: #02003a;
  border: 1px solid #02003a;
  color: white;
}
.bottom-container-right {
  display: flex;
  /* flex-grow: 1; */
  padding: 2rem 0;
  padding-right: 4rem;
}
</style>
