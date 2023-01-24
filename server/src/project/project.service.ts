import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ProjectDto} from "./dto/project.dto"
import {InjectRepository} from "@nestjs/typeorm"
import {ProjectEntity} from "./entity/project.entity"
import {Like, Repository} from "typeorm"
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

  async getProject(projectId: string): Promise<ProjectEntity> {
    return await this.projectRepository.findOneBy({id: projectId})
  }

  async createProject({name, isPrivate, username}: Partial<ProjectDto>): Promise<ProjectEntity> {
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
    project.modified = new Date()
    await this.projectRepository.update({id}, project)
    return project
  }

  async deleteProjects(ids: string[]): Promise<void> {
    ids.forEach((id) => this.deleteProjectDetail(id))
    await this.projectRepository.delete(ids)
  }

  async getProjects(options: IPaginationOptions, onlyPublic = false, username?: string): Promise<Pagination<ProjectEntity>> {
    const queryBuilder = this.projectRepository.createQueryBuilder('c')
    queryBuilder.orderBy('c.modified', 'DESC'); // Or whatever you need to do
    onlyPublic
        ? queryBuilder.where('c.isPrivate = :isPrivate', {isPrivate: false})
        : queryBuilder.where('c.username = :username', {username})


    return paginate<ProjectEntity>(queryBuilder, options)
  }

  async searchProjects(keyword: string,
                       options: IPaginationOptions,
                       onlyPublic = false,
                       username?: string) {

    const where = onlyPublic
        ? [
          {name: Like(`%${keyword}%`), isPrivate: false},
          {username: Like(`%${keyword}%`), isPrivate: false},
        ]
        : [{name: Like(`%${keyword}%`), username},]

    return paginate<ProjectEntity>(
        this.projectRepository,
        options,
        {
          where,
          order: {
            modified: "DESC",
            id: "DESC",
          },
        })
  }

  async copyProject(id: string, username: string): Promise<void> {
    const project = await this.getProject(id)
    const name = `[Copy]${project.name}`
    const isPrivate = true
    const created = await this.createProject({name, isPrivate, username})
    const projectDetail = await this.getProjectDetail(id)
    await this.createProjectDetail(created.id, projectDetail?.data)
  }

  async getProjectDetail(projectId: string): Promise<ProjectDetailEntity> {
    return this.projectDetailRepository.findOneBy({projectId})
  }

  async createProjectDetail(projectId: string, data?: string): Promise<ProjectDetailEntity> {
    const projectDetail = await this.getProjectDetail(projectId)
    if (projectDetail) return projectDetail
    else {
      const project = await this.getProject(projectId)
      if (!project) throw new HttpException({
        message: 'Bad request.'
      }, HttpStatus.BAD_REQUEST)

      const projectDetail = this.projectDetailRepository.create({
        name: project.name,
        isPrivate: project.isPrivate,
        modified: project.modified,
        username: project.username,
        projectId,
        data
      })
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
