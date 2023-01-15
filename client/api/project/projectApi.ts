import {apiClient} from "~/api/config"
import {ProjectType} from "../../../server/model/ProjectType"
import {Pagination} from "../../../server/model/Pagination"
import {AxiosResponse} from "axios"

export default {
  getAllProjects: async (page: number, limit?: number): Promise<AxiosResponse<Pagination<ProjectType>>> => await apiClient.get('/projects', {
    params: {page, limit}
  }),

  createProject: ({name, isPrivate, username}: Partial<ProjectType>) => apiClient
      .post(`/projects`, {name, isPrivate, username}),

  updateProject: (id: string, {name, isPrivate}: Partial<ProjectType>) => apiClient
      .put(`/projects/${id}`, {name, isPrivate}),

  deleteProjects: (ids: string[]) => apiClient.delete(`/projects/${ids}`),

  createProjectDetail: (id: string) => apiClient.post(`/projects/detail/${id}`),

  updateProjectDetail: (id: string, data: string) => apiClient
      .put(`/projects/detail/${id}`, {data})
}