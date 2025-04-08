<template>
  <div>
    <!-- 상단바 -->
    <div class="top-bar">
      <div class="user">
        <img src="@/assets/profile-icon.svg" alt="user icon" />
        <span class="user-name">홍길동<span class="suffix">님!</span></span>
      </div>
      <div class="logo">
        <img src="@/assets/logo.svg" alt="logo icon" />
      </div>
    </div>

    <!-- 달력 -->
    <div class="month-box">
      <div class="nav">
        <span>&lt;</span>
        <span>4월</span>
        <span>&gt;</span>
      </div>
      <div class="year">2025</div>
      <div class="description">이번 달에는 이렇게 썼어요!</div>
    </div>

    <!-- 필터 UI -->
    <div class="filter-container">
      <!-- 날짜 -->
      <div class="filter-box">
        <span>일자</span>
        <input type="date" v-model="date" />
      </div>

      <!-- 카테고리 -->
      <div class="filter-box">
        <span>카테고리</span>
        <select v-model="category">
          <option value=""></option>
          <option>식비</option>
          <option>교통</option>
          <option>쇼핑</option>
          <option>기타</option>
        </select>
      </div>

      <!-- 수입/지출 -->
      <button
        class="filter-btn"
        :class="{ active: type === '수입' }"
        @click="type = '수입'"
      >
        수입
      </button>
      <button
        class="filter-btn"
        :class="{ active: type === '지출' }"
        @click="type = '지출'"
      >
        지출
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const date = ref('2025-04-02')
const category = ref('')
const type = ref('')
</script>

<style scoped>
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

.user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user img {
  width: 50px;
  height: 50px;
}

.user-name {
  font-weight: bold;
  font-size: 24px;
}

.user-name .suffix {
  font-size: 16px;
  font-weight: normal;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 150px;
  height: 150px;
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

.filter-btn img {
  width: 18px;
  height: 18px;
}
</style>
