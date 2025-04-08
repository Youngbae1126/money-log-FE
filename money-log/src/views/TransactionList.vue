<script setup>
import ListFilter from '@/components/ListFilter.vue'
import { ref } from 'vue'

const currentMonth = ref(3)
const currentYear = ref(2025)

const monthNames = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

function prevMonth() {
  const date = new Date(currentYear.value, currentMonth.value - 1)
  currentMonth.value = date.getMonth()
  currentYear.value = date.getFullYear()
}

function nextMonth() {
  const date = new Date(currentYear.value, currentMonth.value + 1)
  currentMonth.value = date.getMonth()
  currentYear.value = date.getFullYear()
}
</script>

<template>
  <div class="TransactionList">
    <!-- 달력 상단 바 -->
    <div class="top-bar">
      <div class="logo"></div>
    </div>

    <!-- 달력 -->
    <div class="month-box">
      <div class="nav">
        <span @click="prevMonth">&lt;</span>
        <span>{{ monthNames[currentMonth] }}</span>
        <span @click="nextMonth">&gt;</span>
      </div>
      <div class="year">{{ currentYear }}</div>
      <div class="description">이번 달에는 이렇게 썼어요!</div>
    </div>

    <ListFilter />
  </div>
</template>

<style scoped>
.TransactionList {
  padding-top: 40px;
}

body {
  font-family: 'Pretendard', sans-serif;
  margin: 0;
  background-color: #fdf1d7;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.month-box {
  text-align: center;
  margin-top: 10px;
}

.month-box .nav {
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.month-box .nav span {
  cursor: pointer;
}

.month-box .year {
  font-size: 18px;
  margin-top: 8px;
  color: #444;
}

.month-box .description {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.filter-container {
  background: #fff8e6;
  padding: 20px;
  margin: 30px auto;
  border-radius: 20px;
  max-width: 900px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  font-size: 16px;
  font-weight: bold;
}

.filter-box input[type='date'],
.filter-box select {
  border: none;
  font-family: 'Pretendard';
  font-size: 16px;
  background: none;
  cursor: pointer;
  font-weight: normal;
}

.filter-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #f4c84c;
  color: white;
  border-color: #f4c84c;
}
</style>
