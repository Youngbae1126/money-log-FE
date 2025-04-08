import DashBoard from '@/views/DashBoard.vue'
import Layout from '@/views/Layout.vue'
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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
