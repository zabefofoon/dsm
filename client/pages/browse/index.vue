<template>
  <div class="min-h-full">
    <teleport v-if="mounted"
              to="#search">
      <Search placeholder="Browse"
              :keyword="searchKeyword"
              @change-input="search($event.target.value)"
              @empty-input="emptySearchKeyword"/>
    </teleport>
    <div class="grid grid-cols-2 p-4 md:flex flex-wrap gap-x-2 gap-y-2 md:gap-4">
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
import {default as ProjectComponent} from "../../components/editor/Project.vue"
import {directive as vClickAway} from "vue3-click-away"
import {storeToRefs} from "pinia"
import {usePublicProjectsStore} from "~/stores/publicProjects.store"
import projectApi from "~/api/project/project.api"
import {useMyProjectsStore} from "~/stores/myProjects.store"
import {useAuthStore} from "~/stores/auth.store"
import Search from "~/components/editor/Search.vue"
import ProjectSkeletor from "~/components/editor/ProjectSkeletor.vue"

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

const publicProjectStore = usePublicProjectsStore()
const {isLastPage, publicProjects, searchKeyword} = storeToRefs(publicProjectStore)

const copy = async (projectId: string, $event?: MouseEvent) => {
  if ($event) toggleContextmenu($event)
  await projectApi.copyProject(projectId)
  await myProjectStore.refreshMyProjects()
  alert(`Copied the project. Check your project list.`)
}

const search = (keyword: string) => {
  publicProjectStore.setSearchKeyword(keyword)
  publicProjectStore.searchProjects(keyword)
}

const emptySearchKeyword = () => {
  publicProjectStore.setSearchKeyword('')
  publicProjectStore.getPublicProjects(1)
}

const mounted = ref(false)
const setMounted = (value: boolean) => {
  mounted.value = value
}
onMounted(() => {
  setMounted(true)
  publicProjectStore.refreshPublicProjects()
})

</script>

<style scoped lang="scss">

</style>