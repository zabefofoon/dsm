import {Injectable} from '@nestjs/common';

@Injectable()
export class ProjectService {
  getAllProjects(): string {
    return 'all projects'
  }

  getProject(id: string): string {
    return `id: ${id}`
  }

  createProject(): string {
    return 'create'
  }

  updateProject(id: string): string {
    return `update id: ${id}`
  }

  deleteProjects(ids: string[]): string {
    return `delete id: ${ids}`
  }
}
