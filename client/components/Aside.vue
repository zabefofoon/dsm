<template>
  <nav class="flex flex-col gap-3 w-auto p-2 border shrink-0">
    <NuxtLink to="/">
      <button class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400">
        <img class="w-6"
             alt="dsm"
             src="@/assets/images/logo.png"/>
      </button>
    </NuxtLink>
    <NuxtLink v-if="username"
              to="/">
      <button class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400">
        <i class="icon icon-grid"></i>
      </button>
    </NuxtLink>
    <NuxtLink to="/browse">
      <button class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400">
        <i class="icon icon-explore"></i>
      </button>
    </NuxtLink>
    <NuxtLink v-if="!username"
              to="/sign">
      <button class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400">
        <i class="icon icon-avatar-unsecured"></i>
      </button>
    </NuxtLink>
    <button v-else
            class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400"
            @click="signOut">
      <i class="icon icon-avatar-secured"></i>
    </button>
  </nav>
</template>
<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store"
import {useRouter} from "#imports"
import authApi from "~/api/auth/auth.api"
import {useMyProjectsStore} from "~/stores/myProjects.store"
import {storeToRefs} from "pinia"

const router = useRouter()
const authStore = useAuthStore()
const myProjectsStore = useMyProjectsStore()
const {username} = storeToRefs(authStore)

const signOut = async () => {
  const result = confirm('Do you want to sign out?')
  if (!result) return
  await authApi.signOut()
  myProjectsStore.clear()
  authStore.clear()
  await router.push('sign')
}

</script>

<style lang="scss">
.router-link-exact-active {
  button {
    color: #1B98E0;
    background: #E8F1F2;
  }
}
</style>