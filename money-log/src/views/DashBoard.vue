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
      <hr />
      <GoalTracker />
    </div>
    <div class="dashboard__right-container">
      <IEComparing />
      <RouterLink to="/list">
        <Calender />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  max-width: 1920px;
  padding: 1rem 2rem;
  box-sizing: border-box;
}
.dashboard__left-container {
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 1rem;
}
.dashboard__right-container {
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
