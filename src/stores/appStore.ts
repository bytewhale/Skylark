import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const appStore = defineStore('appStore', () => {
  // 请求 loading 计数器
  const loadingCount = ref<number>(0);

  function incrementCount() {
    loadingCount.value = loadingCount.value + 1;
  }
  function decrementCount() {
    loadingCount.value = loadingCount.value - 1;
  }
  return { loadingCount, incrementCount, decrementCount }
})

export default appStore