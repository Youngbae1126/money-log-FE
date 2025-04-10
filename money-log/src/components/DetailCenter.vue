<!-- 상세페이지 흰색 카드 컴포넌트 -->
<template>
  <div class="detail-center">
    <!-- 버튼 그룹 -->
    <div class="detail-center__button-group">
      <button
        class="detail-center__btn detail-center__edit"
        @click="openEditModal"
      >
        수정
      </button>
      <button
        class="detail-center__btn detail-center__delete"
        @click="deleteTransaction"
      >
        삭제
      </button>
      <button
        class="detail-center__btn detail-center__close"
        @click="$router.back()"
      >
        닫기
      </button>
    </div>

    <!-- 카테고리 표시 -->
    <div class="detail-center__item">
      🍔
      <span
        class="detail-center__highlight detail-center__highlight--category"
        >{{ transactionData.category }}</span
      >
      <div v-if="transactionData.type === 'income'">
        카테고리로 들어온 돈이에요
      </div>
      <div v-else>카테고리에 소비하셨어요</div>
    </div>

    <!-- 날짜 표시 -->
    <div class="detail-center__item">
      📅
      <span class="detail-center__highlight detail-center__highlight--date">{{
        transactionData.date
      }}</span>
      <div v-if="transactionData.type === 'income'">에 들어온 돈이에요</div>
      <div v-else>에 사용하셨어요</div>
    </div>

    <!-- 메모 표시 -->
    <div class="detail-center__item">
      📢
      <span class="detail-center__highlight detail-center__highlight--content"
        >"{{ transactionData.content }}"</span
      >
      메모를 남기셨어요
    </div>

    <!-- 수정 모달 -->
    <MoneyEditModal
      :isOpen="isEditModalOpen"
      :initialData="transactionData"
      @close="closeEditModal"
      @submit="handleEditSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // axios 임포트 추가
import MoneyEditModal from './MoneyEditModal.vue' // 모달 컴포넌트 임포트

const API_URL = 'http://localhost:5500/transactions'
const router = useRouter()

// TransactionDetail.vue로부터 전달받는 상세 데이터
const props = defineProps({
  id: Number,
  category: String,
  date: String,
  content: String,
  type: String, // 'income' 또는 'expense'
  amount: Number, // 금액 prop 추가
  transactionData: Object,
})

const isEditModalOpen = ref(false) // 모달 열림 상태

// 모달에 전달할 초기 데이터 객체 생성
// const transactionData = computed(() => ({
//   id: props.id,
//   amount: props.amount,
//   date: props.date,
//   content: props.content,
//   category: props.category,
//   type: props.type,
// }))

const openEditModal = () => {
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const handleEditSubmit = async formData => {
  try {
    const response = await axios.put(
      `http://localhost:5500/transactions/${props.id}`,
      {
        ...formData, // 모달에서 받은 데이터
        id: props.id, // ID는 props에서 가져옴
      },
    )

    // axios는 성공 시 2xx 상태 코드를 반환합니다.
    if (response.status >= 200 && response.status < 300) {
      // console.log('수정 성공')
      closeEditModal()
      router.go(0) // 현재 페이지 새로고침
    } else {
      // axios는 2xx 외의 상태 코드에서 에러를 발생시키므로, 이 부분은 보통 catch 블록에서 처리됩니다.
      // 하지만 만약을 위해 남겨둘 수 있습니다.
      console.error('수정 실패 - 상태 코드:', response.status)
    }
  } catch (error) {
    console.error(
      '수정 중 오류 발생:',
      error.response ? error.response.data : error.message,
    )
  }
}

// 해당 거래내역 삭제 함수
const deleteTransaction = async () => {
  let isDelete = false
  if (!props.transactionData.id) {
    console.error('삭제할 거래의 ID가 없습니다.')
    return
  } else {
    isDelete = confirm('삭제하시겠습니까?')
    if (isDelete) {
      try {
        const response = await axios.delete(`${API_URL}/${props.id}`)
        if (response.status === 200 || response.status === 204) {
          // 삭제 성공 시 목록 페이지로 이동
          router.push('/list')
        } else {
          console.error('삭제 실패 - 상태 코드:', response.status)
        }
      } catch (error) {
        console.error('삭제 중 오류 발생:', error)
      }
    }
  }
}
</script>

<style scoped>
.detail-center {
  position: relative;
  background-color: #ffffff;
  padding: 64px 60px;
  border-radius: 28px;

  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  margin: 0 auto;

  font-size: 28px;
  line-height: 1.9;
  display: flex;
  flex-direction: column;
  gap: 48px;
  font-weight: bold;
}

.detail-center__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  word-break: keep-all;
  line-height: 1.7;
}

.detail-center__highlight {
  font-weight: 700;
  margin: 0 8px;
}

.detail-center__highlight--category {
  color: var(--point-color);
}
.detail-center__highlight--date {
  color: var(--blue);
}
.detail-center__highlight--content {
  color: var(--green-500);
}

.detail-center__button-group {
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  gap: 10px;
}

.detail-center__btn {
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.detail-center__btn:hover {
  background: var(--gray-100);
}

.detail-center__edit {
  background-color: #ffc107;
  color: white;
  border: none;
}

.detail-center__edit:hover {
  background-color: #ffb300;
}

.detail-center__delete {
  background-color: #dc3545;
  color: white;
  border: none;
}

.detail-center__delete:hover {
  background-color: #c82333;
}

.detail-center__close {
  background-color: #6c757d;
  color: white;
  border: none;
}

.detail-center__close:hover {
  background-color: #5a6268;
}
</style>
