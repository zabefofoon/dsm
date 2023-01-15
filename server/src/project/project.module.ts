import {Module} from '@nestjs/common';
import {ProjectController} from "./project.controller"
import {ProjectService} from "./project.service"
import {TypeOrmModule} from "@nestjs/typeorm"
import {ProjectEntity} from "./entity/project.entity"
import {ProjectDetailEntity} from "./entity/projectDetail.entity"

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ProjectDetailEntity])],
  exports: [TypeOrmModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {
}
