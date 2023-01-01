import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProjectService} from "./project.service"
import {strToArr} from "../../util/util"
import {Project} from "./dto/Project"

@Controller('projects')
export class ProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Get()
  getAllProjects(): string {
    return this.projectService.getAllProjects()
  }

  @Get('/:id')
  getProject(@Param('id') id: string): string {
    return this.projectService.getProject(id)
  }

  @Post()
  createProject(@Body('project')project: Project) {
    return this.projectService.createProject()
  }

  @Put('/:id')
  updateProject(@Param('id') id: string) {
    return this.projectService.updateProject(id)
  }

  @Delete('/:ids')
  deleteProjects(@Param('ids') ids: string) {
    return this.projectService.deleteProjects(strToArr(ids))
  }
}