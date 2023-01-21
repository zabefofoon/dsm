<template>
  <nav class="flex flex-col gap-2 w-auto p-2 border shrink-0">
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
    <div class="border"></div>
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
  </nav>
</template>
<script setup lang="ts">
import {useAuthStore} from "~/stores/auth"
import {useRouter} from "#imports"
import authApi from "~/api/auth/authApi"
import {useMyProjectsStore} from "~/stores/myProjects"
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