import {Injectable} from '@nestjs/common';
import {ProjectDto} from "./dto/project.dto"
import {InjectRepository} from "@nestjs/typeorm"
import {ProjectEntity} from "./entity/project.entity"
import {Repository} from "typeorm"
import {IPaginationOptions, paginate, Pagination,} from 'nestjs-typeorm-paginate';
import {ProjectDetailEntity} from "./entity/projectDetail.entity"

@Injectable()
export class ProjectService {

  constructor(
      @InjectRepository(ProjectEntity)
      private projectRepository: Repository<ProjectEntity>,
      @InjectRepository(ProjectDetailEntity)
      private projectDetailRepository: Repository<ProjectDetailEntity>
  ) {
  }

  getAllProjects(): string {
    return 'all projects'
  }

  async createProject({name, isPrivate, username}: ProjectDto): Promise<ProjectEntity> {
    const project = this.projectRepository.create({
      name,
      isPrivate,
      username,
      modified: new Date()
    })
    await this.projectRepository.save(project)
    return project
  }

  async updateProject(id: string, project: ProjectDto): Promise<ProjectDto> {
    await this.projectRepository.update({id}, project)
    return project
  }

  async deleteProjects(ids: string[]): Promise<void> {
    ids.forEach((id) => this.deleteProjectDetail(id))
    await this.projectRepository.delete(ids)
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<ProjectEntity>> {
    const queryBuilder = this.projectRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.modified', 'DESC'); // Or whatever you need to do
    return paginate<ProjectEntity>(queryBuilder, options);
  }

  async getProjectDetail(projectId: string): Promise<ProjectDetailEntity> {
    return this.projectDetailRepository.findOneBy({projectId})
  }

  async createProjectDetail(projectId: string): Promise<ProjectDetailEntity> {
    const projectDetail = await this.getProjectDetail(projectId)
    if (projectDetail) return projectDetail
    else {
      const projectDetail = this.projectDetailRepository.create({projectId})
      await this.projectDetailRepository.save(projectDetail)
      return projectDetail
    }
  }

  async updateProjectDetail(projectId: string, data: string): Promise<void> {
    await this.projectDetailRepository.update({projectId}, {data})
  }

  async deleteProjectDetail(projectId: string): Promise<void> {
    await this.projectDetailRepository.delete({projectId})
  }
}
