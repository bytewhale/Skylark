import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout
    }
  ]
})

export default router
