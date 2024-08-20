import { ref } from 'vue'
import { defineStore } from 'pinia'

const userStore = defineStore('userStore', () => {
  const accessToken = ref("")

  function setAccessToken(token: string) {
    accessToken.value = token;
    localStorage.setItem("accessToken", token)
  }

  function logout() {
    // setAccessToken("")

    // 跳转到登录页面
    // const { origin } = window.location
    // window.location.replace(`${origin}/login`)
  }

  return { accessToken, setAccessToken, logout }
})

export default userStore