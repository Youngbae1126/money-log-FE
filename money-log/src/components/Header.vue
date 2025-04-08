<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../stores/users'

const userStore = useUserStore()

onMounted(() => {
  userStore.getUserInfo()
})
</script>

<template>
  <header>
    <div class="header">
      <div class="nickname-container">
        <img
          src="../assets/profile-icon.svg"
          alt="프로필 아이콘"
          class="profile__icon"
        />
        <span class="nickname__text">{{ userStore.nickname }}</span> 님!
      </div>
      <h1>
        <RouterLink to="/"
          ><img src="../assets/logo.svg" alt="로고"
        /></RouterLink>
      </h1>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 0.8rem;
  background-color: transparent;
}
.header {
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2rem);
  margin: auto;
}
.nickname-container {
  font-family: 'Pretendard-Regular';
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.3rem;
  font-size: 1.3rem;
}
.profile__icon {
  width: 40px;
  height: 40px;
}
.nickname__text {
  color: var(--main-color);
  font-weight: bold;
  font-size: 1.35rem;
}
</style>
