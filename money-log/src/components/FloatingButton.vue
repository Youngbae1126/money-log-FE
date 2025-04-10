<script setup>
defineProps({
  onClick: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <button class="floating-button" @click="onClick">
    <span class="plus-icon">+</span>
  </button>
</template>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.floating-button:hover {
  background-color: #ffb300;
  transform: translateY(-2px);
  padding: 2rem 3rem;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.plus-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.button-text {
  white-space: nowrap;
}
</style>
