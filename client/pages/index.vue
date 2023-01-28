<template>
  <div class="min-h-full">
    <teleport v-if="mounted"
              to="#search">
      <Search placeholder="My Projects"
              :keyword="searchKeyword"
              @change-input="search($event.target.value)"
              @empty-input="emptySearchKeyword"/>
    </teleport>
    <div class="grid grid-cols-2 p-4 md:flex flex-wrap gap-x-2 gap-y-2 md:gap-4">
      <template v-if="myProjects">
        <button class="self-center justify-self-center w-full md:w-40 aspect-square
          border border-dashed flex flex-col items-center justify-center"
                @click="createProject">
          <span class="w-fit h-fit text-3xl text-slate-500">
            <i class="icon icon-add"></i>
          </span>
          <span class="text-slate-500 text-sm">New Project</span>
        </button>
        <TransitionGroup :name="transitionName">
          <div v-for="project in myProjects"
               :key="project.id"
               class="w-full md:w-fit"
               @contextmenu.prevent="toggleContextmenu($event, project)">
            <ProjectComponent ref="projectRef"
                              :project="project"
                              hide-username
                              @copy="copy(project.id)"
                              @delete="deleteProjects(project.id)"
                              @change-name="updateProject(project.id, {name: $event})"
                              @change-is-private="updateProject(project.id, {isPrivate: $event})"/>
          </div>
        </TransitionGroup>
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
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
            @click="copy(isShowContextmenu.id);toggleContextmenu($event)">
          <button>copy</button>
        </li>
        <li v-if="showingProjectInContextMenu?.isPrivate"
            class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
            @click="updateProject(isShowContextmenu.id, {isPrivate: false});toggleContextmenu($event)">
          <button>public</button>
        </li>
        <li v-else
            class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
            @click="updateProject(isShowContextmenu.id, {isPrivate: true});toggleContextmenu($event)">
          <button>private</button>
        </li>
        <li class="py-1 px-2 hover:bg-slate-500 hover:text-white border divide-y cursor-pointer"
            @click="renameProject(isShowContextmenu.id)">
          <button>rename</button>
        </li>
        <li class="py-1 px-2 border divide-y hover:bg-slate-500 hover:text-white">
          <button class="w-full text-left"
                  @click="deleteProjects(isShowContextmenu.id, $event)">delete
          </button>
        </li>
      </ul>
      <button v-if="!isLastPage"
              class="border w-full py-2"
              @click="getNextPage">Show More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ProjectType} from "../../server/model/ProjectType"
import {computed, definePageMeta, onMounted, ref, useRouter} from "#imports"
import {default as ProjectComponent} from "../components/Project.vue"
import {directive as vClickAway} from "vue3-click-away"
import {useMyProjectsStore} from "~/stores/myProjects.store"
import {storeToRefs} from "pinia"
import {useAuthStore} from "~/stores/auth.store"
import Search from "~/components/Search.vue"
import projectApi from "~/api/project/project.api"

const router = useRouter()

const authStore = useAuthStore()

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
const showingProjectInContextMenu = computed(() => myProjectStore.findProjectById(isShowContextmenu.value.id || ''))
const toggleContextmenu = ({clientX, clientY}: MouseEvent, project?: ProjectType) => {
  if (!clientX && !clientY && !project)
    isShowContextmenu.value.show = !isShowContextmenu.value.show
  else
    isShowContextmenu.value = {
      show: !!project?.id,
      x: clientX,
      y: clientY,
      id: project?.id
    }
}

const myProjectStore = useMyProjectsStore()
const {isLastPage, myProjects, searchKeyword} = storeToRefs(myProjectStore)
const mounted = ref(false)
const setMounted = (value: boolean) => {
  mounted.value = value
}
onMounted(async () => {
  setMounted(true)
  if (!authStore.username) {
    alert('Only authorized users can use service.')
    return router.push('sign')
  }
  myProjectStore.getMyProjects(1)
})

const deleteProjects = async (id: string, $event?: MouseEvent) => {
  if ($event) toggleContextmenu($event)
  if (!confirm('Are you sure you want to delete?')) return
  setTransitionName('v')
  await myProjectStore.deleteProjects([id])
}

const createProject = async () => {
  setTransitionName('v')
  const created = await myProjectStore.createProject({
    isPrivate: false,
    name: 'New Project'
  })
  renameProject(created.id)
}

const updateProject = (id: string, field: { [key in keyof ProjectType]: unknown }) => {
  const project = myProjectStore.findProjectById(id)
  const data = <ProjectType>{...project, ...field}
  myProjectStore.updateProject(id, data)
}

const projectRef = ref<(typeof ProjectComponent)[]>()
const renameProject = (id: string) => {
  projectRef.value
      ?.find((component) => component.id === id)
      ?.nameInput.focus()

  isShowContextmenu.value.show = false
}

const transitionName = ref('none')
const setTransitionName = (value: string) => {
  transitionName.value = value
}
const getNextPage = () => {
  setTransitionName('none')
  myProjectStore.getNextPage()
}

const search = (keyword: string) => {
  myProjectStore.setSearchKeyword(keyword)
  myProjectStore.searchMyProjects(keyword)
}

const emptySearchKeyword = () => {
  myProjectStore.setSearchKeyword('')
  myProjectStore.getMyProjects(1)
}

const copy = async (projectId: string) => {
  setTransitionName('v')
  await projectApi.copyProject(projectId)
  await myProjectStore.refreshMyProjects()
}
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {

  @media (min-width: 768px) {
    transition: opacity 300ms ease, width 300ms ease, transform 300ms ease;
    width: 10rem;
    transform: translateY(0);
  }
}

.v-enter-from,
.v-leave-to {

  @media (min-width: 768px) {
    opacity: 0;
    width: 0;
    transform: translateY(-10%);
  }

}
</style>