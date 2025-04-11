<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="footer-container">
      <img src="../assets/logo.svg" alt="로고" class="logo" />
      <nav>
        <ul class="footer__link">
          <RouterLink to="/">
            <li>DashBoard</li>
          </RouterLink>
          <RouterLink :to="`/list/${currentYear}/${currentMonth}`">
            <li>List</li>
          </RouterLink>
          <RouterLink to="/mypage">
            <li>Mypage</li>
          </RouterLink>
        </ul>
      </nav>
      <span class="copyright__text"
        >copyright &copy; 2025 Money Log. All rights reserved.</span
      >
    </div>
  </footer>
</template>

<style scoped>
footer {
  /* background-color: var(--yellow-100); */
  background-image: url('@/assets/mypage-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
  margin: auto;
  margin-top: 1rem;
  max-width: 1920px;
  width: calc(100% - 2rem);
  height: 300px;
  font-size: 1rem;
}
ul {
  display: flex;
  list-style: none;
  width: 100%;
  gap: 3.5rem;
  font-weight: bold;
  margin: 1rem 0 3rem;
}
ul li:hover {
  color: #a08e6a;
}
.copyright__text {
  font-size: 0.7rem;
  color: #808080;
  font-weight: 100;
  margin-bottom: 1rem;
}

.logo {
  width: 100px;
  height: 100px;
  margin-top: 2rem;
}

.footer__link {
  color: var(--brown-500);
  font-weight: bold;
}
</style>
