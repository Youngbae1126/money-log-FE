import DashBoard from '@/views/DashBoard.vue'
import Layout from '@/views/Layout.vue'
import Mypage from '@/views/Mypage.vue'
import TransactionDetail from '@/views/TransactionDetail.vue'
import TransactionList from '@/views/TransactionList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'main',
        component: DashBoard,
      },
      {
        path: '/list',
        name: 'transaction-list',
        component: TransactionList,
      },
      {
        path: '/detail/:id',
        name: 'transaction-detail',
        component: TransactionDetail,
      },
    ],
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
