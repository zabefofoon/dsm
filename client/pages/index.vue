<template>
  <div class="h-full">
    <div class="p-4 flex flex-wrap gap-4">
      <button class="self-center justify-self-center w-40 aspect-square
          border border-dashed flex flex-col items-center justify-center"
              @click="showModalConfigProject">
        <span class="w-fit h-fit text-3xl text-slate-500">
          <i class="icon icon-add"></i>
        </span>
        <span class="text-slate-500 text-sm">New Project</span>
      </button>
      <div v-for="project in myProjects"
           :key="project.id"
           @contextmenu.prevent="toggleContextmenu($event, project)">
        <ProjectComponent :project="project"
                          @config="showModalConfigProject2(project.id)"
                          @delete="deleteProjects(project.id)"/>
      </div>
      <ul v-if="isShowContextmenu.show"
          class="fixed bg-white border w-48 z-10 shadow-md text-sm"
          :style="{top: `${isShowContextmenu.y}px`, left: `${isShowContextmenu.x}px`}"
          v-click-away="($event) => toggleContextmenu($event)">
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white">
          <button class="w-full text-left"
                  @click="showModalConfigProject2(isShowContextmenu.id, $event)">config
          </button>
        </li>
        <li class="py-1 px-2 border divide-y hover:bg-slate-500 hover:text-white">
          <button class="w-full text-left"
                  @click="deleteProjects(isShowContextmenu.id, $event)">delete
          </button>
        </li>
      </ul>
      <button v-if="!isLastPage"
              class="border w-full py-2"
              @click="myProjectStore.getNextPage()">Show More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ProjectType} from "../../server/model/ProjectType"
import {definePageMeta, onMounted, ref} from "#imports"
import {default as ProjectComponent} from "../components/Project.vue"
import {directive as vClickAway} from "vue3-click-away"
import {useNavigationStore} from "~/stores/navigation"
import {$vfm} from 'vue-final-modal'
import ModalAddProject from "../components/ModalAddProject.vue"
import {useMyProjectsStore} from "~/stores/myProjects"
import {storeToRefs} from "pinia"


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

const myProjectStore = useMyProjectsStore()
const {isLastPage, myProjects} = storeToRefs(myProjectStore)
onMounted(() => {
  myProjectStore.getMyProjects(1)
})

const createProject = async (data: Partial<ProjectType>) => {
  myProjectStore.createProject(data)
}

const updateProject = async (id: string, data: Partial<ProjectType>) => {
  await myProjectStore.updateProject(id, data)
}

const deleteProjects = async (id: string, $event: MouseEvent) => {
  toggleContextmenu($event)
  await myProjectStore.deleteProjects([id])
}

const showModalConfigProject2 = async (id: string, $event: MouseEvent): Promise<void> => {
  toggleContextmenu($event)
  await $vfm.show({
    component: ModalAddProject,
    bind: {
      project: myProjectStore.findProjectById(id)
    },
    on: {
      create: (data: Partial<ProjectType>, close: () => void) => {
        updateProject(id, data)
        close()
      },
      cancel: (close: () => void) => close()
    }
  })
}

const showModalConfigProject = async (): Promise<void> => {
  await $vfm.show({
    component: ModalAddProject,
    on: {
      create: (data: Partial<ProjectType>, close: () => void) => {
        createProject(data)
        close()
      },
      cancel: (close: () => void) => close()
    }
  })
}
</script>

<style scoped lang="scss">

</style>