<template>
  <VueFinalModal v-slot="{ close }"
                 v-bind="$attrs"
                 content-class="w-full h-full">
    <div class="ml-auto bg-white w-3/4 h-full relative p-4 flex flex-col items-center justify-center"
         v-click-away="() => close()">
      <button class="absolute top-4 right-8 text-slate-500"
              @click="close()">
        <i class="icon icon-close text-2xl"></i>
      </button>
      <ul class="w-full text-xl flex flex-col gap-2">
        <li>
          <button>Docs</button>
        </li>
        <li>
          <router-link to="/browse">
            <button class="flex">Browse</button>
          </router-link>
        </li>
        <li>
          <router-link v-if="!username"
                       to="/sign">
            <button class="flex">Sign
            </button>
          </router-link>
          <router-link v-else
                       to="/myProject">
            <button class="flex">My Project
            </button>
          </router-link>
        </li>
        <li class="flex gap-3 absolute top-4">
          <button class="text-2xl text-slate-500 flex items-center">
            <i class="icon icon-github"></i>
          </button>
          <button class="text-2xl text-slate-500 flex items-center">
            <i class="icon icon-instargram"></i>
          </button>
        </li>
      </ul>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import {VueFinalModal} from 'vue-final-modal'
import {useAuthStore} from "~/stores/auth.store"
import {storeToRefs} from "pinia"
import {directive as vClickAway} from "vue3-click-away"

const authStore = useAuthStore()

const {username} = storeToRefs(authStore)
</script>

<style scoped>

</style>