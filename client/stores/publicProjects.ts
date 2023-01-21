import {computed, defineStore, ref} from "#imports"
import {PaginationMeta} from "~/../server/model/Pagination"
import {ProjectType} from "~/../server/model/ProjectType"
import projectApi from "~/api/project/projectApi"

export const usePublicProjectsStore = defineStore('publicProjects', () => {
  const publicProjects = ref<ProjectType[]>()

  const meta = ref<PaginationMeta>()

  const isLastPage = computed(() => ((meta.value?.totalPages || 0) - (meta.value?.currentPage || 0)) < 1)

  const getPublicProjects = async (page: number, limit?: number) => {
    if ((meta.value?.currentPage || 0) >= page) return
    const res = await projectApi.getAllPublicProjects(page, limit)
    meta.value = res.data.meta
    publicProjects.value = [...publicProjects.value || [], ...res.data.items]
  }

  const getNextPage = async () => {
    if (!isLastPage.value) await getPublicProjects((meta.value?.currentPage || 0) + 1)
  }

  const refreshPublicProjects = async () => {
    const res = await projectApi.getAllPublicProjects(1)
    meta.value = res.data.meta
    publicProjects.value = res.data.items
  }

  return {
    publicProjects,
    meta,
    isLastPage,
    getPublicProjects,
    getNextPage,
    refreshPublicProjects
  }
})