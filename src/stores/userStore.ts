import { ref } from 'vue'
import { defineStore } from 'pinia'

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