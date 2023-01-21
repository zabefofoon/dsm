import {defineStore, ref} from "#imports"

export const useAuthStore = defineStore('auth', () => {
  const username = ref<string>()
  const setName = (value: string) => {
    username.value = value
  }

  const clear = () => {
    setName('')
  }
  return {
    setName,
    username,
    clear
  }
}, {persist: true})