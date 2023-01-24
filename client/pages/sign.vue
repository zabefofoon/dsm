<template>
  <div class="flex items-center justify-center h-full">
    <Spinner v-if="loading"/>
    <div v-else
         class="flex flex-col gap-4 text-slate-500 w-80 h-3/6">
      <div class="flex flex-col gap-4 mb-4">
        <h3 class="text-2xl mb-1">Welcome</h3>
        <p class="text-sm mb-2">To save your create in server, you should sign in our website.</p>
        <div class="flex">
          <button class="w-full py-1 border shadow-md disabled:text-white disabled:shadow-none"
                  :disabled="signMode === 'IN'"
                  :style="signMode === 'IN' ? {background:'#1B98E0'} : {}"
                  @click="setSignMode('IN')">
            Sign in
          </button>
          <button class="w-full py-1 border shadow-md disabled:text-white disabled:shadow-none"
                  :disabled="signMode === 'UP'"
                  :style="signMode === 'UP' ? {background:'#1B98E0'} : {}"
                  @click="setSignMode('UP')">
            Sign up
          </button>
        </div>
        <form class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <label class="text-xs"
                   for="name">name</label>
            <input ref="name"
                   v-model="authData.name"
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
                   :autocomplete="false"
                   @keydown.enter="enter"/>
            <span v-if="invalidPassword"
                  class="text-xs text-red-500">check password</span>
          </div>
        </form>

        <button class="w-full py-1 border text-slate-700 shadow-md"
                @click="enter">Enter
        </button>
        <span v-if="isFailSignedUp"
              class="text-xs text-red-500">{{ isFailSignedUp }}</span>
        <span v-if="isFailSignedIn"
              class="text-xs text-red-500">{{ isFailSignedIn }}</span>

      </div>
      <div v-if="signMode === 'UP'"
           class="border border-x-0 border-y-1 border-slate-300 py-4">
        <h3 class="mb-2">Warning</h3>
        <p class="text-sm">
          We are not responsible for security, so register a simple name and password.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta, onMounted, useRouter, useState, watch} from "#imports"
import {SeoData} from "~/middleware/seo"
import {ref} from "vue"
import {AuthType} from "~/../server/model/AuthType"
import authApi from "~/api/auth/authApi"
import {useAuthStore} from "~/stores/auth"
import {AxiosResponse} from "axios"

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

const isFailSignedIn = ref()
const signIn = async () => {
  if (!validate()) return
  setLoading(true)
  const result = <AxiosResponse>await authApi.signIn(authData.value)
      .catch(() => isFailSignedIn.value = 'Check your name or password')
  setLoading(false)
  if (String(result.status).startsWith('2')) {
    authStore.setName(authData.value.name)
    setTimeout(() => router.push('/'))
  }
}

const enter = () => signMode.value === 'IN' ? signIn() : signUp()

const isFailSignedUp = ref()
const signUp = async () => {
  if (!validate()) return
  if (confirm('Would you like to sign up?')) {
    setLoading(true)

    const result = await authApi.signUp(authData.value)
        .catch((error) => isFailSignedUp.value = error.response.data.message)

    if (String(result.status).startsWith('2')) {
      authData.value.name = ''
      authData.value.password = ''
      alert('Try sign in your created name and password')
      signMode.value = 'IN'
    }

    setLoading(false)
  }

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
const name = ref<HTMLElement>()
const password = ref<HTMLElement>()

const focusPassword = () => password.value?.focus()

const loading = ref(false)
const setLoading = (value: boolean) => {
  loading.value = value
}

const signMode = ref<'IN' | 'UP'>('IN')
const setSignMode = (value: 'IN' | 'UP') => {
  signMode.value = value
}
watch(signMode, () => name.value?.focus())
onMounted(() => name.value?.focus())
</script>

<style scoped lang="scss">
button.active {
  background: #1B98E0;
  color: white;
}
</style>