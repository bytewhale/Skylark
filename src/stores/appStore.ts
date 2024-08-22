import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const appStore = defineStore('appStore', () => {
  // 请求 loading 计数器
  const loadingCount = ref<number>(0);
  const accessToken = ref("")

  function incrementCount() {
    loadingCount.value = loadingCount.value + 1;
  }
  function decrementCount() {
    loadingCount.value = loadingCount.value - 1;
  }
  function setAccessToken(token: string) {
    accessToken.value = token;
    localStorage.setItem("accessToken", token)
  }
  function logout() {
    setAccessToken("")

    // 跳转到登录页面
    const { origin } = window.location
    window.location.replace(`${origin}/login`)
  }

  return { loadingCount, accessToken, incrementCount, decrementCount, setAccessToken, logout }
})

export default appStore