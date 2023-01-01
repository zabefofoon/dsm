import {Injectable} from '@nestjs/common';
import {ProjectDto} from "./dto/project.dto"

@Injectable()
export class ProjectService {
  getAllProjects(): string {
    return 'all projects'
  }

  getProject(id: string): string {
    return `id: ${id}`
  }

  createProject(project: ProjectDto): string {
    return `created: ${project.created}`
  }

  updateProject(id: string, project: ProjectDto): string {
    return `modified id: ${id}, ${project.modified}`
  }

  deleteProjects(ids: string[]): string {
    return `delete id: ${ids}`
  }
}
