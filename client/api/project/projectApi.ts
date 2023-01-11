import {apiClient} from "~/api/config"
import {ProjectType} from "../../../server/model/ProjectType"

export default {
  getAllProjects: () => apiClient.get('/projects'),

  getProject: (id: string) => apiClient.get(`/projects/${id}`),

  createProject: ({name, isPrivate}: Partial<ProjectType>) => apiClient
      .post(`/projects`, {name, isPrivate}),

  updateProject: (id: string) => apiClient.put(`/projects/${id}`),

  deleteProjects: (ids: string[]) => apiClient.delete(`/projects/${ids}`),
}