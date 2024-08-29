import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';

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
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next();
    return
  }

  const authStore = useAuthStore();

  if (!authStore.hasLogin) {
    authStore.handleLogin();
    next();
    return
  }

  const userStore = useUserStore();

  if (!userStore.userInfo) {
    await userStore.getUserInfo();
    next();
    return
  }

  next();
})

export default router
