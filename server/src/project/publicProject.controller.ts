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

@Controller('projects')
export class PublicProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Get('/public')
  getAllProjects(@Req() req: Request,
                 @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
                 @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 10,): Promise<Pagination<ProjectEntity>> {
    return this.projectService.paginate({page, limit}, true)
  }


  @Get('/public/:id')
  getProjectDetail(@Param('id') id: string): Promise<ProjectDetailEntity> {
    return this.projectService.getProjectDetail(id)
  }
}