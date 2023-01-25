import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {defineNuxtPlugin} from "#imports"
import {createPinia} from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  createPinia().use(piniaPluginPersistedstate)
})