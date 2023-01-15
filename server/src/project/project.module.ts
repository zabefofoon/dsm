import {Module} from '@nestjs/common';
import {ProjectController} from "./project.controller"
import {ProjectService} from "./project.service"
import {TypeOrmModule} from "@nestjs/typeorm"
import {ProjectEntity} from "./entity/project.entity"
import {ProjectDetailEntity} from "./entity/projectDetail.entity"
import {PublicProjectController} from "./publicProject.controller"

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ProjectDetailEntity])],
  exports: [TypeOrmModule],
  controllers: [ProjectController, PublicProjectController],
  providers: [ProjectService]
})
export class ProjectModule {
}
