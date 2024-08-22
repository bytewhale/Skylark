import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IUserInfo } from '@/utils/type';

const userStore = defineStore('userStore', () => {
  const userInfo = ref<IUserInfo | null>()

  function setUserInfo(payload: IUserInfo) {
    userInfo.value = payload;
  }

  return {
    userInfo,
    setUserInfo
  }
})

export default userStore