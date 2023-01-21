<template>
  <div class="h-full">
    <div class="p-4 flex flex-wrap gap-4">
      <template v-if="publicProjects">
        <div v-for="project in publicProjects"
             :key="project.id"
             @contextmenu.prevent="toggleContextmenu($event, project)">
          <ProjectComponent :project="project"
                            public>
            <template #menus>
              <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer">
                <button>copy</button>
              </li>
            </template>
          </ProjectComponent>
        </div>
      </template>
      <template v-else>
        <ProjectSkeletor v-for="index in 3"
                         :key="index"
                         width="160px"
                         height="230px"/>
      </template>

      <ul v-if="isShowContextmenu.show"
          class="fixed bg-white border w-48 z-10 shadow-md text-sm"
          :style="{top: `${isShowContextmenu.y}px`, left: `${isShowContextmenu.x}px`}"
          v-click-away="($event) => toggleContextmenu($event)">
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white">
          <button class="w-full text-left">copy</button>
        </li>
      </ul>
      <button v-if="!isLastPage"
              class="border w-full py-2"
              @click="publicProjectStore.getNextPage()">Show More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ProjectType} from "../../../server/model/ProjectType"
import {definePageMeta, onMounted, ref} from "#imports"
import {default as ProjectComponent} from "../../components/Project.vue"
import {directive as vClickAway} from "vue3-click-away"
import {useNavigationStore} from "~/stores/navigation"
import {storeToRefs} from "pinia"
import {usePublicProjectsStore} from "~/stores/publicProjects"


definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

type ContextMenuData = {
  show: boolean
  x: number
  y: number
  id?: string
}

const isShowContextmenu = ref<ContextMenuData>({
  show: false,
  x: 0,
  y: 0
})
const toggleContextmenu = ({clientX, clientY}: MouseEvent, project?: ProjectType) => {
  isShowContextmenu.value = {
    show: !!project?.id,
    x: clientX,
    y: clientY,
    id: project?.id
  }
}

const navigationStore = useNavigationStore()
navigationStore.showBackButton(false)

const publicProjectStore = usePublicProjectsStore()
const {isLastPage, publicProjects} = storeToRefs(publicProjectStore)
onMounted(() => {
  publicProjectStore.getPublicProjects(1)
})

</script>

<style scoped lang="scss">

</style>