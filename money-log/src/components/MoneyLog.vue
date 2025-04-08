<script setup></script>

<template>
  <div class="money-log__container">
    <div class="ml__container-top">
      <p class="ml__container-top__title">홍길동님의 머니로그</p>
      홍길동님의 한 달 소비를 분석한 리포트에요!
    </div>
    <div class="ml__container-bottom">
      <ul>
        <li>
          <div class="ml-icon__box">
            <img src="../assets/shopping.svg" alt="쇼핑" />
            <div class="ml-icon__box__text">
              <p class="icon__box__title">쇼핑왕</p>
              이번 한 달 동안 쇼핑에 가장 많이 소비했어요
            </div>
          </div>
        </li>
        <li>
          <div class="ml-icon__box">
            <img src="../assets/trophy.svg" alt="트로피" />
            <div class="ml-icon__box__text">
              <p class="icon__box__title">출석왕</p>
              이번 한 달 동안 쇼핑에 가장 많이 소비했어요
            </div>
          </div>
        </li>
        <li>
          <div class="ml-icon__box">
            <img src="../assets/money.svg" alt="돈" />
            <div class="ml-icon__box__text">
              <p class="icon__box__title">소비왕</p>
              이번 한 달 동안 쇼핑에 가장 많이 소비했어요
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
