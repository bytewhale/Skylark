import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './userStore';
import API from '@/api';

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'));
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'));
  const hasLogin = computed(() => {
    return accessToken.value
  })

  const setAccessToken = (payload: string) => {
    accessToken.value = payload;
    localStorage.setItem("accessToken", payload);
  }
  const setRefreshToken = (payload: string) => {
    accessToken.value = payload;
    localStorage.setItem("refreshToken", payload);
  }

  const handleLogin = () => {
    setAccessToken('');
    useUserStore().setUid(0);
    message.info('正在为您跳转登录...', 2500);

    const timer = setTimeout(() => {
      window.location.href = `${window.location.origin}/login`;
      clearTimeout(timer);
    }, 2500);
  }

  const handleRefreshToken = async () => {
    try {

      const { accessToken, refreshToken: newRefreshToken } = await API.refreshToken({ refreshToken })

      setAccessToken(accessToken);
      setRefreshToken(newRefreshToken);

    } catch (error) {
      console.log(`error`, error);
    }
  }

  const login = async (payload: { phone: string, password: string }) => {
    try {
      const { phone, password } = payload;
      const {
        uid, accessToken, refreshToken
      } = await API.login({
        phone: Number(phone),
        password,
      });

      useUserStore().setUid(+uid);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      message.success('登录成功', 2500);

      const timer = setTimeout(() => {
        window.location.href = window.location.origin;
        clearTimeout(timer);
      }, 2500);

    } catch (error) {
      console.log(`error`, error);
    }
  }

  return {
    accessToken,
    hasLogin,
    setAccessToken,
    handleLogin,
    handleRefreshToken,
    login
  }
})