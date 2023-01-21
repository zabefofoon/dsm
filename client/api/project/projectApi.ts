import {apiClient} from "~/api/config"
import {ProjectType} from "../../../server/model/ProjectType"
import {ProjectDetailType} from "../../../server/model/ProjectDetailType"
import {Pagination} from "../../../server/model/Pagination"
import {AxiosResponse} from "axios"

export default {
  getAllProjects: async (page: number, limit?: number): Promise<AxiosResponse<Pagination<ProjectType>>> => await apiClient.get('/projects', {
    params: {page, limit}
  }),

  createProject: ({name, isPrivate, username}: Partial<ProjectType>): Promise<AxiosResponse<void>> => apiClient
      .post(`/projects`, {name, isPrivate, username}),

  updateProject: (id: string, {name, isPrivate}: Partial<ProjectType>): Promise<AxiosResponse<void>> => apiClient
      .put(`/projects/${id}`, {name, isPrivate}),

  deleteProjects: (ids: string[]): Promise<AxiosResponse<void>> => apiClient.delete(`/projects/${ids}`),

  createProjectDetail: (id: string): Promise<AxiosResponse<ProjectDetailType>> => apiClient.post(`/projects/detail/${id}`),

  updateProjectDetail: (id: string, data: string): Promise<AxiosResponse<void>> => apiClient
      .put(`/projects/detail/${id}`, {data}),

  getAllPublicProjects: async (page: number, limit?: number): Promise<AxiosResponse<Pagination<ProjectType>>> => await apiClient.get('/projects/public', {
    params: {page, limit}
  }),

  getPublicProjectDetail: async (id: string): Promise<AxiosResponse<ProjectDetailType>> => await apiClient
      .get(`/projects/public/${id}`),
}