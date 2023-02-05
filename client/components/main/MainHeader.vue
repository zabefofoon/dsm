<template>
  <header class="flex w-full header-bg fixed top-0 left-0 z-20 px-8 py-3 shadow">
    <figure class="flex items-center gap-4 w-6">
      <router-link to="/">
        <img class="w-full"
             src="@/assets/images/logo.png"
             alt="dsm"/>
      </router-link>
    </figure>
    <button class="md:hidden flex items-center ml-auto text-slate-500"
            @click="showNavigationModal">
      <i class="icon icon-bars text-2xl"></i>
    </button>
    <div class="hidden md:flex ml-auto align-items-center gap-3 text-slate-500">
      <button class="text-sm">Docs</button>
      <router-link to="/browse">
        <button class="flex">Browse</button>
      </router-link>
      <router-link v-if="!username"
                   to="/sign">
        <button class="text-sm flex">Sign</button>
      </router-link>
      <router-link v-else
                   to="/myProject">
        <button class="text-sm flex">My Project</button>
      </router-link>
      <span>|</span>
      <button class="text-2xl text-slate-500 flex items-center">
        <i class="icon icon-github"></i>
      </button>
      <button class="text-2xl text-slate-500 flex items-center">
        <i class="icon icon-instargram"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store"
import {storeToRefs} from "pinia"
import {$vfm} from "vue-final-modal"
import ModalNavigation from "./ModalNavigation.vue"
import {onMounted, onUnmounted} from "#imports"

const authStore = useAuthStore()

const {username} = storeToRefs(authStore)

const showNavigationModal = () => {
  $vfm.show({
    component: ModalNavigation
  })
}

onUnmounted(() => {
  $vfm.hideAll()
})

</script>

<style scoped lang="scss">
.header-bg {
  background: rgba(255, 255, 255, .9);
}
</style>