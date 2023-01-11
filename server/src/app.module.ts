import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import {typeORMConfig} from "../config/typeorm.config"
import {ProjectController} from './project/project.controller';
import {ProjectService} from './project/project.service';
import {ProjectModule} from './project/project.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProjectModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class AppModule {
}
