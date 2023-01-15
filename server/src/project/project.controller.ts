import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ProjectService} from "./project.service"
import {strToArr} from "../../util/util"
import {ProjectDto} from "./dto/project.dto"
import {Request} from "express"
import {AuthGuard} from "../auth/auth.guard"

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Get()
  getAllProjects(@Req() req: Request): string {
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
                @Body() project: ProjectDto,
                @Req() req: Request) {
    return this.projectService.updateProject(id, project)
  }

  @Delete('/:ids')
  deleteProjects(@Param('ids') ids: string) {
    return this.projectService.deleteProjects(strToArr(ids))
  }
}