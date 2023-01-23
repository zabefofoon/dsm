import {computed, defineStore, ref} from "#imports"
import {PaginationMeta} from "~/../server/model/Pagination"
import {ProjectType} from "~/../server/model/ProjectType"
import projectApi from "~/api/project/projectApi"

export const useMyProjectsStore = defineStore('myProjects', () => {
  const myProjects = ref<ProjectType[]>()

  const meta = ref<PaginationMeta>()

  const isLastPage = computed(() => ((meta.value?.totalPages || 0) - (meta.value?.currentPage || 0)) < 1)

  const clear = () => {
    myProjects.value = []
    meta.value = undefined
  }

  const getMyProjects = async (page: number, limit?: number) => {
    if ((meta.value?.currentPage || 0) >= page) return
    const res = await projectApi.getAllProjects(page, limit)
    meta.value = res.data.meta
    myProjects.value = [...myProjects.value || [], ...res.data.items]
  }

  const getNextPage = async () => {
    if (!isLastPage.value) await getMyProjects((meta.value?.currentPage || 0) + 1)
  }

  const createProject = async (data: Partial<ProjectType>): Promise<ProjectType> => {
    const response = await projectApi.createProject(data)
    if (!myProjects.value) myProjects.value = []
    myProjects.value.unshift(response.data)
    return response.data
  }

  const updateProject = async (id: string, data: Partial<ProjectType>) => {
    await projectApi.updateProject(id, data)
    const project = findProjectById(id)
    if (project) {
      project.name = data.name || 'New Project'
      project.isPrivate = data.isPrivate || false
    }
  }

  const deleteProjects = async (ids: string[]) => {
    await projectApi.deleteProjects(ids)
    ids.forEach((id) => {
      myProjects.value = myProjects.value?.filter((project) => project.id !== id)
    })
  }

  const findProjectById = (id: string) => myProjects.value?.find((project) => project.id === id)

  const refreshMyProjects = async () => {
    const res = await projectApi.getAllProjects(1)
    meta.value = res.data.meta
    myProjects.value = res.data.items
  }

  return {
    myProjects,
    meta,
    isLastPage,
    getMyProjects,
    getNextPage,
    createProject,
    updateProject,
    deleteProjects,
    findProjectById,
    clear,
    refreshMyProjects
  }
})