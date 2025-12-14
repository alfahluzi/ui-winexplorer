import DrivePage from '@/views/drive/drive.page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Drive',
      component: DrivePage,
    },
  ],
})

export default router
