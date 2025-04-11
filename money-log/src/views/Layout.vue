<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import TheHeader from '../components/Header.vue'
import TheFooter from '../components/Footer.vue'
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<style scoped></style>
