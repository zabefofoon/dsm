import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import {ProjectService} from "./project.service"
import {strToArr} from "../../util/util"
import {ProjectDto} from "./dto/project.dto"
import {Request} from "express"
import {AuthGuard} from "../auth/auth.guard"
import {Pagination} from "nestjs-typeorm-paginate"
import {ProjectEntity} from "./entity/project.entity"
import {JwtService} from "@nestjs/jwt"
import {ProjectDetailEntity} from "./entity/projectDetail.entity"

@Controller('/api/projects')
@UseGuards(AuthGuard)
export class ProjectController {

  constructor(private projectService: ProjectService,
              private jwtService: JwtService) {
  }

  @Get()
  getAllProjects(@Req() req: Request,
                 @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
                 @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 10,): Promise<Pagination<ProjectEntity>> {
    const accessToken = req.cookies['Authentication']
    const decodedAccessToken = this.jwtService.decode(accessToken)
    const username = decodedAccessToken['name']
    return this.projectService.getProjects({page, limit}, false, username)
  }

  @Get('/search')
  searchProjects(@Req() req: Request,
                 @Query('keyword', new DefaultValuePipe('')) keyword: string,
                 @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
                 @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 10,): Promise<Pagination<ProjectEntity>> {
    const accessToken = req.cookies['Authentication']
    const decodedAccessToken = this.jwtService.decode(accessToken)
    const username = decodedAccessToken['name']
    return this.projectService.searchProjects(keyword || '', {page, limit}, false, username)
  }

  @Post()
  createProject(@Body() project: ProjectDto,
                @Req() req: Request) {
    const accessToken = req.cookies['Authentication']
    const decodedAccessToken = this.jwtService.decode(accessToken)
    project.username = decodedAccessToken['name']
    return this.projectService.createProject(project)
  }

  @Put('/:id')
  updateProject(@Param('id') id: string,
                @Body() project: ProjectDto,
                @Req() req: Request) {
    return this.projectService.updateProject(id, project)
  }

  @Delete('/:ids')
  deleteProjects(@Param('ids') ids: string): Promise<void> {
    return this.projectService.deleteProjects(strToArr(ids))
  }

  @Post('/:id/copy')
  copyProject(@Param('id',) id: string,
              @Req() req: Request) {
    const accessToken = req.cookies['Authentication']
    const decodedAccessToken = this.jwtService.decode(accessToken)
    const username = decodedAccessToken['name']
    return this.projectService.copyProject(id, username)
  }

  @Get('/detail/:id')
  getProjectDetail(@Param('id') id: string): Promise<ProjectDetailEntity> {
    return this.projectService.getProjectDetail(id)
  }

  @Post('/detail/:id')
  createProjectDetail(@Param('id') id: string): Promise<ProjectDetailEntity> {
    return this.projectService.createProjectDetail(id)
  }


  @Put('/detail/:id')
  updateProjectDetail(@Param('id') id: string,
                      @Body() data: { data: string }): Promise<void> {
    return this.projectService.updateProjectDetail(id, data.data)
  }

  @Delete('/detail/:id')
  async deleteProjectDetail(@Param('id') id: string): Promise<void> {
    await this.projectService.deleteProjectDetail(id)
  }
}