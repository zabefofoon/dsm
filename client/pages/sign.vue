<template>
  <div class="flex items-center justify-center h-full">
    <Spinner v-if="loading"/>
    <div v-else
         class="flex flex-col gap-4 text-slate-500 w-80">
      <div class="flex flex-col gap-4 mb-4">
        <h3 class="text-2xl mb-1">Welcome</h3>
        <p class="text-sm mb-2">To save your create in server, you should sign in our website.</p>
        <div class="flex flex-col gap-2">
          <label class="text-xs"
                 for="name">name</label>
          <input v-model="authData.name"
                 id="name"
                 class="border p-1"
                 placeholder="name"
                 @keydown.enter="focusPassword"/>
          <span v-if="invalidName"
                class="text-xs text-red-500">check name</span>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs"
                 for="password">password</label>
          <input ref="password"
                 v-model="authData.password"
                 id="password"
                 class="border p-1"
                 type="password"
                 placeholder="password"
                 @keydown.enter="signIn"/>
          <span v-if="invalidPassword"
                class="text-xs text-red-500">check password</span>
        </div>
        <button class="w-full py-1 border text-slate-700 shadow-md"
                @click="signIn">Sign In
        </button>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-sm">If you haven't signed up yet</p>
        <button class="w-full py-1 text-white shadow-md"
                style="background:#1B98E0;"
                @click="signUp">Sign up
        </button>
        <span v-if="isFailSignedUp"
              class="text-xs text-red-500">{{ isFailSignedUp }}</span>
      </div>
      <div class="border border-x-0 border-y-1 border-slate-300 py-4">
        <h3 class="mb-2">Warning</h3>
        <p class="text-sm">
          We are not responsible for security, so register a simple name and password.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta, useRouter, useState} from "#imports"
import {SeoData} from "~/middleware/seo"
import {ref} from "vue"
import {AuthType} from "~/../server/model/AuthType"
import authApi from "~/api/auth/authApi"
import {useAuthStore} from "~/stores/auth"

const router = useRouter()

const authStore = useAuthStore()

const seoData = useState<SeoData>('seoData')
seoData.value = {
  pageTitle: 'DSM - Sign',
  displayTitle: 'Sign'
}

definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

//const navigationStore = useNavigationStore()
//navigationStore.showBackButton({href: '/'})

const authData = ref<AuthType>({
  name: '',
  password: ''
})
const invalidName = ref(false)
const invalidPassword = ref(false)
const signIn = async () => {
  if (!validate()) return
  setLoading(true)
  await authApi.signIn(authData.value).catch((e) => console.log(e))
  setLoading(false)
  authStore.setName(authData.value.name)
  await router.push('/')
}

const isFailSignedUp = ref()
const signUp = async () => {
  if (!validate()) return
  setLoading(true)
  const result = await authApi.signUp(authData.value)
      .catch((e) => isFailSignedUp.value = e.response.data.message)

  if (String(result.status).startsWith('2')) {
    authData.value.name = ''
    authData.value.password = ''
    alert('Try sign in your created name and password')
  }

  setLoading(false)
}
const validate = () => {
  const isEmpty = !authData.value.name || !authData.value.password
  if (isEmpty) {
    invalidName.value = !authData.value.name
    invalidPassword.value = !authData.value.password
    return
  }

  invalidName.value = false
  invalidPassword.value = false

  return !isEmpty
}
const password = ref<HTMLElement>()

const focusPassword = () => password.value?.focus()

const loading = ref(false)
const setLoading = (value: boolean) => {
  loading.value = value
}
</script>

<style scoped lang="scss">

</style>