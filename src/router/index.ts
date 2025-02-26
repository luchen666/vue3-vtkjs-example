import { createRouter, createWebHistory } from 'vue-router'
import { routeList } from './constant'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
    },
    ...routeList,
  ],
})

export default router
