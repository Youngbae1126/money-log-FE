<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import MoneyInputModal from './components/MoneyInputModal.vue'
import FloatingButton from './components/FloatingButton.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleSubmit = formData => {
  console.log('제출된 데이터:', formData)
  // TODO: 여기에서 데이터를 저장하거나 처리하는 로직을 추가하세요
}
</script>

<template>
  <div class="app-container">
    <RouterView />
    <FloatingButton :onClick="openModal" />
    <MoneyInputModal
      :isOpen="isModalOpen"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped></style>
