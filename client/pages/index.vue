<template>
  <div class="h-full">
    <div class="p-4 flex flex-wrap gap-4">
      <div v-for="project in projects"
           :key="project.id"
           @contextmenu.prevent="toggleContextmenu($event, project)">
        <ProjectComponent :project="project"
                          @config="updateProject()"
                          @delete="deleteProjects()"/>
      </div>
      <ul v-if="isShowContextmenu.show"
          class="fixed bg-white border w-48 z-10 shadow-md text-sm"
          :style="{top: `${isShowContextmenu.y}px`, left: `${isShowContextmenu.x}px`}"
          v-click-away="($event) => toggleContextmenu($event)">
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white">
          <button class="w-full text-left"
                  @click="updateProject()">config
          </button>
        </li>
        <li class="py-1 px-2 border divide-y hover:bg-slate-500 hover:text-white">
          <button class="w-full text-left"
                  @click="deleteProjects()">delete
          </button>
        </li>
      </ul>
      <button class="self-center justify-self-center w-40 aspect-square
          border border-dashed flex flex-col items-center justify-center"
              @click="createProject">
        <span class="w-fit h-fit text-3xl text-slate-500">
          <i class="icon icon-add"></i>
        </span>
        <span class="text-slate-500 text-sm">New Project</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ProjectType} from "../../server/model/ProjectType"
import {definePageMeta, ref, useAsyncData} from "#imports"
import {default as ProjectComponent} from "../components/Project.vue"
import {directive as vClickAway} from "vue3-click-away"
import {useNavigationStore} from "~/stores/navigation"
import projectApi from "~/api/project/projectApi"
import {config} from "~/config/config"

definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

const projects = ref<ProjectType[]>(Array(15).fill({
  id: '1',
  name: 'project1',
  modified: '2022-12-28',
  created: '2022-12-28'
}))

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

const {data} = useAsyncData(() => $fetch(`${config.apiUrl}/projects`))
console.log(data.value)

const createProject = async () => {
  const response = await projectApi.createProject()
  console.log(response)
}

const updateProject = async () => {
  const response = await projectApi.updateProject('id')
  console.log(response)
}

const deleteProjects = async () => {
  const response = await projectApi.deleteProjects(['id'])
  console.log(response)
}
</script>

<style scoped lang="scss">

</style>