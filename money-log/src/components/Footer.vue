<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>

<template>
  <footer>
    <div class="footer-container">
      <img src="../assets/logo.svg" alt="로고" />
      <nav>
        <ul>
          <RouterLink to="/">
            <li>DashBoard</li>
          </RouterLink>
          <RouterLink to="/list">
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
  background-color: var(--yellow-100);
}
.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
  margin: auto;
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
}
</style>
