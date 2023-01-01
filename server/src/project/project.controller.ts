import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProjectService} from "./project.service"
import {strToArr} from "../../util/util"
import {ProjectDto} from "./dto/project.dto"

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
  createProject(@Body() project: ProjectDto) {
    return this.projectService.createProject(project)
  }

  @Put('/:id')
  updateProject(@Param('id') id: string,
                @Body() project: ProjectDto) {
    return this.projectService.updateProject(id, project)
  }

  @Delete('/:ids')
  deleteProjects(@Param('ids') ids: string) {
    return this.projectService.deleteProjects(strToArr(ids))
  }
}