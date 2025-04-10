<script setup>
import IEComparing from '@/components/IEComparing.vue'
import Calender from '../components/Calender.vue'
import GoalTracker from '@/components/GoalTracker.vue'
import MostSpent from '@/components/MostSpent.vue'
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__left-container">
      <MostSpent />
      <GoalTracker />
    </div>
    <div class="dashboard__right-container">
      <IEComparing />
      <Calender />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  width: calc(100% - 2rem);
  max-width: 1920px;
  margin: 1rem;
  padding: 1rem;
  padding-bottom: 5rem;
  justify-content: space-between;
  gap: 1rem;
}
.dashboard__left-container {
  flex-grow: 0.05;
}
.dashboard__right-container {
  flex-grow: 0.95;
}
</style>
