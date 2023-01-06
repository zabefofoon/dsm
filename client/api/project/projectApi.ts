import {apiClient} from "~/api/config"

export default {
  getAllProjects: () => apiClient.get('/projects'),
  getProject: (id: string) => apiClient.get(`/projects/${id}`),
  createProject:() => apiClient.post(`/projects`),
  updateProject: (id: string) => apiClient.put(`/projects/${id}`),
  deleteProjects: (ids: string[]) => apiClient.delete(`/projects/${ids}`),
}