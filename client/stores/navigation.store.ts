import {defineStore, ref} from "#imports"

export type ShowBackButton = {
  href?: string
}

export const useNavigationStore = defineStore('navigation', () => {
  const isShowBackButton = ref<ShowBackButton | boolean>()

  const showBackButton = (value: ShowBackButton | boolean = true) => {
    isShowBackButton.value = value
  }

  return {
    isShowBackButton,
    showBackButton
  }
})