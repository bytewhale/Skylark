import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Layout,
      redirect: '/note-taking',
      children: [
        {
          path: "/note-taking",
          component: () => import('@/views/NoteTaking/index.vue')
        },
        {
          path: "/client-management",
          component: () => import('@/views/ClientManagement/index.vue')
        },
        {
          path: "/case-management",
          component: () => import('@/views/CaseManagement/index.vue')
        },

      ]
    }
  ]
})

export default router
