import { ref } from 'vue'
import { defineStore } from 'pinia'
import API from '@/api';

export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<IUserInfo | null>(null)
  const uid = ref<number>(Number(localStorage.getItem('uid')));

  const setUid = (payload: number) => {
    uid.value = payload;

    localStorage.setItem("uid", String(payload));
  }
  const setUserInfo = (payload: IUserInfo) => {
    userInfo.value = payload;
  }

  const getUserInfo = async () => {
    try {
      const data: IUserInfo = await API.getUserInfo({ uid: uid.value });

      setUserInfo(data);
    } catch (error) {
      console.log(`error`, error);
    }
  }


  return {
    setUid,
    userInfo,
    getUserInfo
  }
})
