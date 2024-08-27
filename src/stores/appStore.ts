import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const appStore = defineStore('appStore', () => {
  const accessToken = ref("")
  const clientSelectOptions = ref<ISelectOption[]>([]);

  const setAccessToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem("accessToken", token)
  }
  const logout = () => {
    setAccessToken("")
    // 跳转到登录页面
    const { origin } = window.location
    window.location.replace(`${origin}/login`)
  }
  const setClientSelectOptions = (payload: ISelectOption[]) => {
    clientSelectOptions.value = payload
  }

  return { accessToken, clientSelectOptions, setAccessToken, logout, setClientSelectOptions }
})

export default appStore