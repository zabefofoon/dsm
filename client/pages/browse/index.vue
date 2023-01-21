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
              <li v-if="username"
                  class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
                  @click="copy(project.id)">
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
        <li v-if="username"
            class="py-1 px-2 hover:bg-slate-500 hover:text-white"
            @click="copy(isShowContextmenu.id, $event)">
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
import projectApi from "~/api/project/projectApi"
import {useMyProjectsStore} from "~/stores/myProjects"
import {useAuthStore} from "~/stores/auth"


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
const toggleContextmenu = ({clientX, clientY}: MouseEvent, project?: Partial<ProjectType>) => {
  isShowContextmenu.value = {
    show: !!project?.id,
    x: clientX,
    y: clientY,
    id: project?.id
  }
}
const authStore = useAuthStore()
const {username} = storeToRefs(authStore)
const myProjectStore = useMyProjectsStore()

const navigationStore = useNavigationStore()
navigationStore.showBackButton(false)

const publicProjectStore = usePublicProjectsStore()
const {isLastPage, publicProjects} = storeToRefs(publicProjectStore)

const copy = async (projectId: string, $event?: MouseEvent) => {
  if ($event) toggleContextmenu($event)
  await projectApi.copyProject(projectId)
  await myProjectStore.refreshMyProjects()
  alert(`Copied the project. Check your project list.`)
}

onMounted(() => {
  publicProjectStore.refreshPublicProjects()
})

</script>

<style scoped lang="scss">

</style>