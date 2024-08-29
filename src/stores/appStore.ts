import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const clientSelectOptions = ref<ISelectOption[]>([]);

  const setClientSelectOptions = (payload: ISelectOption[]) => {
    clientSelectOptions.value = payload
  }

  return { clientSelectOptions, setClientSelectOptions }
})

