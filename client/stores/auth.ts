import {defineStore, ref} from "#imports"

export const useAuthStore = defineStore('auth', () => {
  const username = ref<string>()

  return {
    name: username
  }
}, {persist: true})