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
      <Calender />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  /* width: calc(100% - 2rem); */
  max-width: 1920px;
  /* margin: 2rem auto; */
  /* margin-right: 2rem; */
  padding: 1rem 2rem;
  box-sizing: border-box;
  /* justify-content: space-between; */
}
.dashboard__left-container {
  /* flex-grow: 0.1; */
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 1rem;
}
.dashboard__right-container {
  /* flex-grow: 0.9; */
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
