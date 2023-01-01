<template>
  <div class="project relative">
    <div class="button-area absolute top-1 left-2 z-10 opacity-0">
      <button class="text-xl text-slate-500"
              @click="toggleMenu()">
        <i class="icon icon-overflow"></i>
      </button>
    </div>
    <div v-if="isShowMenu" class="absolute top-8 left-3 z-10">
      <ul class="bg-white border shadow-sm  text-sm w-40"
          v-click-away="() => toggleMenu()">
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y">
          <button>config</button>
        </li>
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y">
          <button>delete</button>
        </li>
      </ul>
    </div>
    <NuxtLink :to="`/${project.id}`">
      <div class="card border shadow-md w-40">
        <div class="aspect-square flex items-center justify-center relative">
          <div class="w-fit h-fit text-8xl text-slate-500">
            <i class="icon icon-file"></i>
          </div>
        </div>
        <div class="flex flex-col gap-1 p-2 border border-x-0">
          <input class="text-sm" :value="project.name"/>
          <p class="text-xs">{{ project.modified }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue'
import {Project} from "../../model/Project"
import {directive as vClickAway} from "vue3-click-away"

defineProps({
  project: Object as PropType<Project>
})

const isShowMenu = ref(false)
const toggleMenu = (value?: boolean) => {
  isShowMenu.value = value !== undefined ? value : !isShowMenu.value
}

</script>

<style scoped lang="scss">
.project {
  &:hover {
    .button-area {
      opacity: 1;
    }

    .card {
      box-shadow: 0 0 1px rgba(#1B98E0, 1);
    }
  }
}
</style>