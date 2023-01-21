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
        <slot name="menus">
          <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
              @click="select('config')">
            <button>config</button>
          </li>
          <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
              @click="select('delete')">
            <button>delete</button>
          </li>
        </slot>
      </ul>
    </div>
    <NuxtLink :to="public ? `/browse/${project.id}` :`/${project.id}`">
      <div class="relative card border shadow-md w-40">
        <div v-if="project.isPrivate"
             class="absolute top-0 right-0 p-2">
          <i class="icon icon-lock text-slate-400"></i>
        </div>
        <div class="aspect-square flex items-center justify-center relative">
          <div class="w-fit h-fit text-8xl text-slate-500">
            <i class="icon icon-file"></i>
          </div>
        </div>
        <div class="flex flex-col gap-1 p-2 border border-x-0">
          <p class="text-xs text-slate-500">{{ formatDate(project.modified) }}</p>
          <input class="text-sm text-slate-800"
                 :value="project.name"/>
          <p v-if="!hideUsername" class="text-xs text-slate-500">{{ project.username }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref} from 'vue'
import {ProjectType} from "../../server/model/ProjectType"
import {directive as vClickAway} from "vue3-click-away"
import util from "../util/util"

defineProps({
  project: Object as PropType<ProjectType>,
  public: Boolean,
  hideUsername: Boolean
})

const isShowMenu = ref(false)
const toggleMenu = (value?: boolean) => {
  isShowMenu.value = value !== undefined ? value : !isShowMenu.value
}

const emit = defineEmits(['config', 'delete'])

const select = (type: 'config' | 'delete') => {
  toggleMenu()
  emit(type)
}

const formatDate = util.formatDate

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