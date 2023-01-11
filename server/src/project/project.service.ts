import {Injectable} from '@nestjs/common';
import {ProjectDto} from "./dto/project.dto"
import {InjectRepository} from "@nestjs/typeorm"
import {ProjectEntity} from "./entity/project.entity"
import {Repository} from "typeorm"

@Injectable()
export class ProjectService {

  constructor(
      @InjectRepository(ProjectEntity)
      private projectRepository: Repository<ProjectEntity>
  ) {
  }

  getAllProjects(): string {
    return 'all projects'
  }

  getProject(id: string): string {
    return `id: ${id}`
  }

  async createProject(projectDto: ProjectDto): Promise<ProjectEntity> {
    const project = this.projectRepository.create({
      name: projectDto.name,
      isPrivate: projectDto.isPrivate,
      modified: new Date()
    })
    await this.projectRepository.save(project)
    return project
  }

  updateProject(id: string, project: ProjectDto): string {
    return `modified id: ${id}, ${project.modified}`
  }

  deleteProjects(ids: string[]): string {
    return `delete id: ${ids}`
  }
}
