import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import {typeORMConfig} from "../config/typeorm.config"
import {ProjectController} from './project/project.controller';
import {ProjectService} from './project/project.service';
import {ProjectModule} from './project/project.module';
import {AuthController} from './auth/auth.controller';
import {AuthModule} from './auth/auth.module';
import {AuthService} from "./auth/auth.service"
import {ConfigModule} from "@nestjs/config"
import {JwtModule} from "@nestjs/jwt"

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ProjectModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '../.env'
    }),
    JwtModule],
  controllers: [ProjectController, AuthController],
  providers: [ProjectService, AuthService],
})
export class AppModule {
}
