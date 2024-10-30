import { createRouter, createWebHistory } from 'vue-router'
import { routeList } from './constant'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PLYReader.vue',
      component: () => import('@/views/IO/Geometry/PLYReader.vue'),
    },
    ...routeList,
  ],
})

export default router
