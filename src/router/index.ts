import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: "/dashboard",
          component: () => import('@/views/Dashboard/index.vue')
        }
      ]
    }
  ]
})

export default router
