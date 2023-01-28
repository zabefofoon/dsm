<template>
  <nav
      class="flex flex-row justify-around md:justify-start md:flex-col
      fixed bottom-0 w-full md:w-auto md:relative md:gap-3 w-auto md:p-2 border shrink-0 bg-white z-20">
    <NuxtLink to="/" class="w-full md:w-fit flex justify-center md:inline">
      <button
          class="w-full md:w-fit flex items-center justify-center text-2xl py-2 md:p-1 md:border md:shadow-md md:rounded-full text-slate-400">
        <img class="w-6"
             alt="dsm"
             src="@/assets/images/logo.png"/>
      </button>
    </NuxtLink>
    <NuxtLink v-if="username"
              class="w-full md:w-fit flex justify-center md:inline"
              to="/">
      <button
          class="w-full md:w-fit flex items-center justify-center text-2xl py-2 md:p-1 md:border md:shadow-md md:rounded-full text-slate-400">
        <i class="icon icon-grid"></i>
      </button>
    </NuxtLink>
    <NuxtLink to="/browse"
              class="w-full md:w-fit flex justify-center md:inline">
      <button
          class="w-full md:w-fit flex items-center justify-center text-2xl py-2 md:p-1 md:border md:shadow-md md:rounded-full text-slate-400">
        <i class="icon icon-explore"></i>
      </button>
    </NuxtLink>
    <NuxtLink v-if="!username"
              to="/sign"
              class="w-full md:w-fit flex justify-center md:inline">
      <button
          class="w-full md:w-fit flex items-center justify-center text-2xl py-2 md:p-1 md:border md:shadow-md md:rounded-full text-slate-400">
        <i class="icon icon-avatar-unsecured"></i>
      </button>
    </NuxtLink>
    <span v-else
          class="w-full md:w-fit flex justify-center md:inline">
      <button
          class="w-full md:w-fit flex items-center justify-center text-2xl py-2 md:p-1 md:border md:shadow-md md:rounded-full-full text-slate-400"
          @click="signOut">
      <i class="icon icon-avatar-secured"></i>
    </button>
    </span>

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
  &:first-child {
    button {
      background: white !important;
    }
  }

  button {
    color: #1B98E0;
    background: #E8F1F2;
  }
}
</style>